(function() {
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function createSceneRuntime(config) {
        const scene = config.scene;
        const elements = config.elements;
        const immersive = scene.immersive || {};
        const viewerConfig = immersive.viewer || {};
        const presets = immersive.cameraPresets || {};

        const state = {
            activeHotspotId: scene.hotspots[0] ? scene.hotspots[0].id : null,
            activeDrawerTarget: null,
            drawerOpen: false,
            pendingIframeView: null,
            zoom: 1,
            offsetX: 0,
            offsetY: 0,
            dragging: false,
            dragStartX: 0,
            dragStartY: 0,
            startOffsetX: 0,
            startOffsetY: 0,
            cesiumViewer: null,
            cesiumTileset: null,
            cesiumReady: false,
            cesiumRange: 120,
            pendingCesiumPresetId: null,
            cesiumLookDragging: false,
            cesiumLastPointerX: 0,
            cesiumLastPointerY: 0
        };

        function isCesiumMode() {
            return viewerConfig.mode === 'cesium-tiles';
        }

        function findHotspot(hotspotId) {
            return scene.hotspots.find(function(item) {
                return item.id === hotspotId;
            }) || null;
        }

        function findGuideStop(hotspotId) {
            return (immersive.guideStops || []).find(function(item) {
                return item.hotspotId === hotspotId;
            }) || null;
        }

        function getPreset(hotspotId) {
            return presets[hotspotId] || presets.default || {
                zoom: 1,
                offsetX: 0,
                offsetY: 0,
                label: '默认视角',
                hint: viewerConfig.statusText || '当前为预览模式。'
            };
        }

        function getIframeViewPreset(hotspotId) {
            const preset = getPreset(hotspotId);
            return preset.gsplatView || null;
        }

        function applyTransform() {
            if (isCesiumMode()) {
                return;
            }
            if (elements.sceneImage) {
                elements.sceneImage.style.transform = 'translate(calc(-50% + ' + state.offsetX + 'px), calc(-50% + ' + state.offsetY + 'px)) scale(' + state.zoom + ')';
            }
        }

        function setStatus(message) {
            elements.viewerStatus.textContent = message;
        }

        function applyIframeView(viewPreset) {
            if (!elements.viewerEmbed || !viewPreset) {
                return;
            }

            state.pendingIframeView = viewPreset;
            const iframeWindow = elements.viewerEmbed.contentWindow;
            if (!iframeWindow) {
                return;
            }

            if (typeof iframeWindow.setSceneView === 'function') {
                iframeWindow.setSceneView(viewPreset);
                return;
            }

            iframeWindow.postMessage({
                type: 'scene:set-view',
                payload: viewPreset
            }, '*');
        }

        function setToolButtonVisibility(hidden) {
            [
                elements.rotateLeftBtn,
                elements.rotateRightBtn,
                elements.zoomInBtn,
                elements.zoomOutBtn,
                elements.zoomResetBtn
            ].forEach(function(button) {
                if (button) {
                    button.hidden = hidden;
                }
            });
        }

        function isImmersiveCesiumPreset(preset) {
            const view = preset && preset.view;
            return Boolean(view && view.mode === 'immersive');
        }

        function updateInteractionTip() {
            if (!elements.sceneTipText) {
                return;
            }

            if (viewerConfig.mode === 'iframe') {
                elements.sceneTipText.textContent = '当前为自由沉浸浏览。保留现在这种鼠标左键直接拖拽转头的交互，同时恢复在场景内前后左右移动。';
                setToolButtonVisibility(true);
                return;
            }

            if (isCesiumMode()) {
                elements.sceneTipText.textContent = '沉浸模式下按住鼠标左键可环顾四周，滚轮或上下按钮可前进后退，上方左右按钮可快速转向。';
                setToolButtonVisibility(false);
                if (elements.zoomInBtn) {
                    elements.zoomInBtn.title = '向前移动';
                }
                if (elements.zoomOutBtn) {
                    elements.zoomOutBtn.title = '向后移动';
                }
                return;
            }

            elements.sceneTipText.textContent = '图片模式下支持拖拽与缩放，点击热点查看建筑、故事、图纸和历史事件。';
            setToolButtonVisibility(false);
            if (elements.rotateLeftBtn) {
                elements.rotateLeftBtn.hidden = true;
            }
            if (elements.rotateRightBtn) {
                elements.rotateRightBtn.hidden = true;
            }
            if (elements.zoomInBtn) {
                elements.zoomInBtn.title = '放大';
            }
            if (elements.zoomOutBtn) {
                elements.zoomOutBtn.title = '缩小';
            }
        }

        function destroyCesiumViewer() {
            if (state.cesiumViewer && !state.cesiumViewer.isDestroyed()) {
                state.cesiumViewer.destroy();
            }
            state.cesiumViewer = null;
            state.cesiumTileset = null;
            state.cesiumReady = false;
        }

        function getCesiumPlacement() {
            const placement = viewerConfig.origin || {};
            const coordinates = scene.coordinates || [];
            const latitude = typeof placement.latitude === 'number' ? placement.latitude : coordinates[0];
            const longitude = typeof placement.longitude === 'number' ? placement.longitude : coordinates[1];
            const height = typeof placement.height === 'number' ? placement.height : 0;
            const heading = typeof placement.heading === 'number' ? placement.heading : 0;
            const pitch = typeof placement.pitch === 'number' ? placement.pitch : 0;
            const roll = typeof placement.roll === 'number' ? placement.roll : 0;

            if (typeof latitude !== 'number' || typeof longitude !== 'number') {
                return null;
            }

            return {
                latitude: latitude,
                longitude: longitude,
                height: height,
                heading: heading,
                pitch: pitch,
                roll: roll
            };
        }

        function buildCesiumModelMatrix(Cesium) {
            const placement = getCesiumPlacement();
            if (!placement) {
                return null;
            }

            const position = Cesium.Cartesian3.fromDegrees(
                placement.longitude,
                placement.latitude,
                placement.height
            );
            const transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            const rotation = Cesium.Matrix3.fromHeadingPitchRoll(
                new Cesium.HeadingPitchRoll(
                    Cesium.Math.toRadians(placement.heading),
                    Cesium.Math.toRadians(placement.pitch),
                    Cesium.Math.toRadians(placement.roll)
                )
            );
            const rotationMatrix4 = Cesium.Matrix4.fromRotationTranslation(rotation);

            return Cesium.Matrix4.multiply(transform, rotationMatrix4, new Cesium.Matrix4());
        }

        function getTilesetQualityOption(name, fallback) {
            if (Object.prototype.hasOwnProperty.call(viewerConfig, name)) {
                return viewerConfig[name];
            }
            return fallback;
        }

        function getCesiumLocalDestination(Cesium, view) {
            const placement = getCesiumPlacement();
            if (!placement) {
                return null;
            }

            const origin = Cesium.Cartesian3.fromDegrees(
                placement.longitude,
                placement.latitude,
                placement.height
            );
            const east = typeof view.east === 'number' ? view.east : 0;
            const north = typeof view.north === 'number' ? view.north : 0;
            const up = typeof view.up === 'number' ? view.up : 1.7;
            const localOffset = new Cesium.Cartesian3(east, north, up);

            return Cesium.Matrix4.multiplyByPoint(
                Cesium.Transforms.eastNorthUpToFixedFrame(origin),
                localOffset,
                new Cesium.Cartesian3()
            );
        }

        function moveCesiumForward(step) {
            if (!isCesiumMode() || !state.cesiumViewer || !state.cesiumReady) {
                return;
            }

            state.cesiumViewer.camera.moveForward(step);
            state.cesiumViewer.scene.requestRender();
        }

        function bindCesiumLookControls(viewer, Cesium) {
            const canvas = viewer.scene.canvas;
            const controller = viewer.scene.screenSpaceCameraController;

            controller.enableRotate = false;
            controller.enableTranslate = false;
            controller.enableTilt = false;
            controller.enableLook = false;

            canvas.addEventListener('pointerdown', function(event) {
                if (!isCesiumMode() || event.button !== 0) {
                    return;
                }

                state.cesiumLookDragging = true;
                state.cesiumLastPointerX = event.clientX;
                state.cesiumLastPointerY = event.clientY;
                if (canvas.setPointerCapture) {
                    canvas.setPointerCapture(event.pointerId);
                }
                event.preventDefault();
            });

            window.addEventListener('pointermove', function(event) {
                if (!state.cesiumLookDragging || !isCesiumMode() || !state.cesiumViewer) {
                    return;
                }

                const deltaX = event.clientX - state.cesiumLastPointerX;
                const deltaY = event.clientY - state.cesiumLastPointerY;
                state.cesiumLastPointerX = event.clientX;
                state.cesiumLastPointerY = event.clientY;

                state.cesiumViewer.camera.lookRight(deltaX * 0.0045);
                state.cesiumViewer.camera.lookUp(-deltaY * 0.0035);
                state.cesiumViewer.scene.requestRender();
            });

            window.addEventListener('pointerup', function() {
                state.cesiumLookDragging = false;
            });

            canvas.addEventListener('wheel', function(event) {
                if (!isCesiumMode()) {
                    return;
                }

                event.preventDefault();
                const moveStep = viewerConfig.moveStep || 1.6;
                if (event.deltaY < 0) {
                    moveCesiumForward(moveStep);
                } else {
                    moveCesiumForward(-moveStep);
                }
            }, { passive: false });
        }

        async function initCesiumTilesViewer() {
            if (!elements.viewerCesium || !window.Cesium || !viewerConfig.tilesetUrl) {
                setStatus('未检测到 Cesium 或 tileset.json 配置，已回退为说明状态。');
                return;
            }

            if (window.location.protocol === 'file:') {
                setStatus('当前通过 file:// 打开页面，浏览器通常会拦截 3D Tiles 文件读取。请改用本地 HTTP 服务访问此页面。');
            } else {
                setStatus('正在加载 3D Tiles 场景...');
            }

            destroyCesiumViewer();

            const Cesium = window.Cesium;
            const viewer = new Cesium.Viewer(elements.viewerCesium, {
                animation: false,
                baseLayerPicker: false,
                fullscreenButton: false,
                geocoder: false,
                homeButton: false,
                infoBox: false,
                navigationHelpButton: false,
                sceneModePicker: false,
                selectionIndicator: false,
                timeline: false,
                shouldAnimate: false,
                baseLayer: false
            });

            viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, getTilesetQualityOption('resolutionScale', 1.5));

            viewer.scene.globe.show = false;
            viewer.scene.skyBox.show = false;
            viewer.scene.sun.show = false;
            viewer.scene.moon.show = false;
            viewer.scene.fxaa = true;
            viewer.scene.postProcessStages.fxaa.enabled = true;
            if (typeof viewer.scene.msaaSamples === 'number') {
                viewer.scene.msaaSamples = getTilesetQualityOption('msaaSamples', 4);
            }
            viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0f1720');
            bindCesiumLookControls(viewer, Cesium);

            state.cesiumViewer = viewer;

            try {
                const tileset = await Cesium.Cesium3DTileset.fromUrl(viewerConfig.tilesetUrl, {
                    maximumScreenSpaceError: getTilesetQualityOption('maximumScreenSpaceError', 2),
                    dynamicScreenSpaceError: getTilesetQualityOption('dynamicScreenSpaceError', false),
                    foveatedScreenSpaceError: getTilesetQualityOption('foveatedScreenSpaceError', false),
                    skipLevelOfDetail: getTilesetQualityOption('skipLevelOfDetail', false),
                    preferLeaves: getTilesetQualityOption('preferLeaves', true),
                    loadSiblings: getTilesetQualityOption('loadSiblings', true),
                    cullRequestsWhileMoving: getTilesetQualityOption('cullRequestsWhileMoving', false),
                    immediatelyLoadDesiredLevelOfDetail: getTilesetQualityOption('immediatelyLoadDesiredLevelOfDetail', true),
                    progressiveResolutionHeightFraction: getTilesetQualityOption('progressiveResolutionHeightFraction', 0.2)
                });

                tileset.maximumScreenSpaceError = getTilesetQualityOption('maximumScreenSpaceError', 2);
                tileset.dynamicScreenSpaceError = getTilesetQualityOption('dynamicScreenSpaceError', false);
                tileset.foveatedScreenSpaceError = getTilesetQualityOption('foveatedScreenSpaceError', false);
                tileset.skipLevelOfDetail = getTilesetQualityOption('skipLevelOfDetail', false);
                tileset.preferLeaves = getTilesetQualityOption('preferLeaves', true);
                tileset.loadSiblings = getTilesetQualityOption('loadSiblings', true);
                tileset.immediatelyLoadDesiredLevelOfDetail = getTilesetQualityOption('immediatelyLoadDesiredLevelOfDetail', true);
                tileset.progressiveResolutionHeightFraction = getTilesetQualityOption('progressiveResolutionHeightFraction', 0.2);

                if (viewerConfig.pointCloudShading && Cesium.PointCloudShading) {
                    tileset.pointCloudShading = new Cesium.PointCloudShading(viewerConfig.pointCloudShading);
                }

                if (viewerConfig.pointSize && Cesium.Cesium3DTileStyle) {
                    tileset.style = new Cesium.Cesium3DTileStyle({
                        pointSize: String(viewerConfig.pointSize)
                    });
                }

                tileset.tileLoad.addEventListener(function() {
                    if (!tileset.tilesLoaded) {
                        setStatus('高精度分片正在补充加载，请稍等片刻再观察细节。');
                    }
                });

                tileset.allTilesLoaded.addEventListener(function() {
                    setStatus(viewerConfig.statusText || '高精度分片已完成加载，可继续近距离观察。');
                });

                const modelMatrix = buildCesiumModelMatrix(Cesium);
                if (modelMatrix) {
                    tileset.modelMatrix = modelMatrix;
                }

                viewer.scene.primitives.add(tileset);
                state.cesiumTileset = tileset;
                await viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-28), viewerConfig.initialRange || 180));
                viewer.scene.requestRender();
                state.cesiumReady = true;
                state.cesiumRange = tileset.boundingSphere ? Math.max(tileset.boundingSphere.radius * 2.4, 60) : 120;
                setStatus(viewerConfig.statusText || 'Cesium 3D Tiles 场景已加载，可直接旋转、缩放、平移观察。');

                if (state.pendingCesiumPresetId) {
                    focusCesiumCamera(state.pendingCesiumPresetId);
                    state.pendingCesiumPresetId = null;
                }
            } catch (error) {
                const message = error && error.message ? error.message : '未知错误';
                setStatus('3D Tiles 加载失败：' + message);
            }
        }

        function focusCesiumCamera(hotspotId) {
            const preset = getPreset(hotspotId);
            if (!state.cesiumViewer || !state.cesiumTileset || !state.cesiumReady || !window.Cesium) {
                state.pendingCesiumPresetId = hotspotId;
                return;
            }

            const Cesium = window.Cesium;
            const view = preset.view || {};

            if (isImmersiveCesiumPreset(preset)) {
                const destination = getCesiumLocalDestination(Cesium, view);
                if (!destination) {
                    return;
                }

                state.cesiumViewer.camera.flyTo({
                    destination: destination,
                    duration: 1.2,
                    orientation: {
                        heading: Cesium.Math.toRadians(view.heading || 0),
                        pitch: Cesium.Math.toRadians(view.pitch || 0),
                        roll: Cesium.Math.toRadians(view.roll || 0)
                    }
                });
                return;
            }

            const heading = Cesium.Math.toRadians(view.heading || 0);
            const pitch = Cesium.Math.toRadians(view.pitch || -24);
            const range = view.range || state.cesiumRange;

            state.cesiumViewer.flyTo(state.cesiumTileset, {
                duration: 1.2,
                offset: new Cesium.HeadingPitchRange(heading, pitch, range)
            });
        }

        function rotateCesiumBy(deltaDegrees) {
            if (!isCesiumMode() || !state.cesiumViewer || !state.cesiumTileset || !state.cesiumReady || !window.Cesium) {
                return;
            }

            const Cesium = window.Cesium;
            state.cesiumViewer.camera.lookRight(Cesium.Math.toRadians(deltaDegrees));
            state.cesiumViewer.scene.requestRender();
        }

        function setViewerMedia() {
            const mode = viewerConfig.mode || 'image';
            elements.viewerMode.textContent = mode.toUpperCase();
            setStatus(viewerConfig.statusText || '当前查看器未配置状态说明。');

            if (elements.viewerCesium) {
                elements.viewerCesium.hidden = true;
            }

            if (mode === 'cesium-tiles' && viewerConfig.tilesetUrl) {
                elements.sceneImage.hidden = true;
                elements.viewerEmbed.hidden = true;
                elements.viewerEmbed.removeAttribute('src');
                elements.viewerCesium.hidden = false;
                updateInteractionTip();
                initCesiumTilesViewer();
                return;
            }

            destroyCesiumViewer();

            if (mode === 'iframe' && viewerConfig.source) {
                elements.sceneImage.hidden = true;
                elements.viewerEmbed.hidden = false;
                elements.viewerEmbed.src = viewerConfig.source;
                elements.viewerEmbed.onload = function() {
                    if (state.pendingIframeView) {
                        applyIframeView(state.pendingIframeView);
                    } else if (state.activeHotspotId) {
                        applyIframeView(getIframeViewPreset(state.activeHotspotId));
                    }
                };
                updateInteractionTip();
                return;
            }

            elements.viewerEmbed.hidden = true;
            elements.viewerEmbed.removeAttribute('src');
            elements.sceneImage.hidden = false;
            elements.sceneImage.src = viewerConfig.source || viewerConfig.fallbackImage || immersive.heroImage || scene.coverImage;
            elements.sceneImage.alt = viewerConfig.alt || immersive.heroAlt || (scene.name + '场景预览');
            updateInteractionTip();
        }

        function setCameraByPreset(hotspotId) {
            const preset = getPreset(hotspotId);
            if (viewerConfig.mode === 'iframe') {
                elements.cameraLabel.textContent = '当前模式：自由沉浸浏览';
                elements.cameraHint.textContent = viewerConfig.statusText || '当前为高斯泼溅自由浏览模式。';
                return;
            }
            if (isCesiumMode()) {
                elements.cameraLabel.textContent = '当前镜头：' + (preset.label || '默认视角');
                elements.cameraHint.textContent = preset.hint || viewerConfig.statusText || '当前为三维场景模式。';
                focusCesiumCamera(hotspotId);
                return;
            }
            state.zoom = clamp(preset.zoom || 1, 1, 2.2);
            state.offsetX = preset.offsetX || 0;
            state.offsetY = preset.offsetY || 0;
            applyTransform();
            elements.cameraLabel.textContent = '当前镜头：' + (preset.label || '默认视角');
            elements.cameraHint.textContent = preset.hint || viewerConfig.statusText || '当前为预览模式。';
        }

        function renderPanels(hotspot) {
            const galleryItems = (hotspot.relatedGalleryIds || []).map(function(id) {
                return scene.gallery.find(function(item) { return item.id === id; });
            }).filter(Boolean);

            const drawingItems = (hotspot.relatedDrawingIds || []).map(function(id) {
                return scene.drawings.find(function(item) { return item.id === id; });
            }).filter(Boolean);

            const timelineItems = (hotspot.relatedTimelineIds || []).map(function(id) {
                return scene.timeline.find(function(item) { return item.id === id; });
            }).filter(Boolean);

            elements.panelTitle.textContent = hotspot.title || hotspot.name;
            elements.panelMeta.textContent = scene.name + ' · ' + hotspot.type;
            elements.panelDescription.textContent = hotspot.description || scene.summary;

            elements.storyPanel.innerHTML = [
                '<div class="timeline-item">',
                '<strong>' + (hotspot.title || hotspot.name) + '</strong>',
                '<span>' + (hotspot.description || scene.shortStory) + '</span>',
                '</div>',
                '<div class="timeline-item">',
                '<strong>镜头说明</strong>',
                '<span>' + (hotspot.cameraHint || '当前热点尚未配置镜头说明。') + '</span>',
                '</div>',
                '<div class="timeline-item">',
                '<strong>关联故事</strong>',
                '<span>' + scene.shortStory + '</span>',
                '</div>'
            ].join('');

            elements.galleryPanel.innerHTML = galleryItems.length ? galleryItems.map(function(item) {
                return [
                    '<div class="media-item">',
                    '<strong>' + item.title + '</strong>',
                    '<span>' + item.caption + '</span>',
                    '<img src="' + item.imageUrl + '" alt="' + item.caption + '">',
                    '</div>'
                ].join('');
            }).join('') : '<div class="empty-state">该热点暂未绑定照片资源。</div>';

            elements.drawingsPanel.innerHTML = drawingItems.length ? drawingItems.map(function(item) {
                return [
                    '<div class="drawing-item-small">',
                    '<strong>' + item.title + '</strong>',
                    '<span>点击后可在详情页中查看完整图纸资源，当前场景页先联动展示资源索引。</span>',
                    '</div>'
                ].join('');
            }).join('') : '<div class="empty-state">该热点暂未绑定图纸资源。</div>';

            elements.timelinePanel.innerHTML = timelineItems.length ? timelineItems.map(function(item) {
                return [
                    '<div class="timeline-item">',
                    '<strong>' + item.year + '年 · ' + item.name + '</strong>',
                    '<span>' + item.description + '</span>',
                    '</div>'
                ].join('');
            }).join('') : '<div class="empty-state">该热点暂未绑定历史事件。</div>';

            const guideStop = findGuideStop(hotspot.id);
            if (!guideStop) {
                setCameraByPreset(hotspot.id);
            }
        }

        function activateRelatedPanel(panelName) {
            elements.relatedTabs.querySelectorAll('.related-tab').forEach(function(item) {
                item.classList.toggle('active', item.getAttribute('data-panel') === panelName);
            });
            elements.relatedPanels.forEach(function(item) {
                item.classList.toggle('active', item.id === 'panel-' + panelName);
            });
        }

        function updateDrawerHeader(target) {
            if (!elements.drawerTitleText || !elements.drawerSubtitleText || !elements.drawerEyebrow) {
                return;
            }

            const titles = {
                scene: {
                    eyebrow: '<i class="fas fa-cube"></i> 场景总览',
                    title: scene.name,
                    subtitle: '默认只看场景，需要资料时再调出信息层，避免视线长期被面板打断。'
                },
                guide: {
                    eyebrow: '<i class="fas fa-route"></i> 驻足节点',
                    title: '推荐浏览路径',
                    subtitle: '先从底部轨道切换视角，再按节点说明逐段观察建筑空间。'
                },
                story: {
                    eyebrow: '<i class="fas fa-scroll"></i> 故事线',
                    title: '热点故事',
                    subtitle: '结合当前驻足点查看背景、镜头说明和叙事信息。'
                },
                gallery: {
                    eyebrow: '<i class="fas fa-images"></i> 图像档案',
                    title: '现场照片',
                    subtitle: '对照真实图像与当前三维场景，确认立面与细部信息。'
                },
                drawings: {
                    eyebrow: '<i class="fas fa-drafting-compass"></i> 图纸线索',
                    title: '图纸与测绘',
                    subtitle: '在沉浸观看时只保留索引，完整图纸继续通过详情页展开。'
                },
                timeline: {
                    eyebrow: '<i class="fas fa-clock"></i> 历史事件',
                    title: '事件时间轴',
                    subtitle: '将当前位置与具体时间片关联，建立空间和史事的对应关系。'
                }
            };

            const current = titles[target] || titles.scene;
            elements.drawerEyebrow.innerHTML = current.eyebrow;
            elements.drawerTitleText.textContent = current.title;
            elements.drawerSubtitleText.textContent = current.subtitle;
        }

        function setDrawerSection(section) {
            Object.keys(elements.drawerSections || {}).forEach(function(key) {
                elements.drawerSections[key].classList.toggle('active', key === section);
            });
        }

        function syncDrawerButtons() {
            if (!elements.drawerButtons) {
                return;
            }

            elements.drawerButtons.forEach(function(button) {
                button.classList.toggle(
                    'active',
                    state.drawerOpen && button.getAttribute('data-drawer-target') === state.activeDrawerTarget
                );
            });
        }

        function closeDrawer() {
            state.drawerOpen = false;
            state.activeDrawerTarget = null;
            if (elements.immersiveDrawer) {
                elements.immersiveDrawer.classList.remove('open');
            }
            syncDrawerButtons();
        }

        function openDrawer(target) {
            if (!elements.immersiveDrawer) {
                return;
            }

            let section = target;
            if (['story', 'gallery', 'drawings', 'timeline'].indexOf(target) !== -1) {
                section = 'related';
                activateRelatedPanel(target);
            }

            updateDrawerHeader(target);
            setDrawerSection(section);
            state.drawerOpen = true;
            state.activeDrawerTarget = target;
            elements.immersiveDrawer.classList.add('open');
            syncDrawerButtons();
        }

        function toggleDrawer(target) {
            if (state.drawerOpen && state.activeDrawerTarget === target) {
                closeDrawer();
                return;
            }
            openDrawer(target);
        }

        function renderHotspots() {
            if (viewerConfig.supportsHotspots === false) {
                elements.sceneHotspots.innerHTML = '';
                elements.sceneHotspots.hidden = true;
                return;
            }

            elements.sceneHotspots.hidden = false;
            elements.sceneHotspots.innerHTML = scene.hotspots.map(function(hotspot) {
                return '<button class="hotspot-btn' + (hotspot.id === state.activeHotspotId ? ' active' : '') + '" type="button" data-hotspot-id="' + hotspot.id + '" style="left:' + (hotspot.position.x * 100) + '%; top:' + (hotspot.position.y * 100) + '%;"><span class="hotspot-label">' + hotspot.name + '</span></button>';
            }).join('');

            elements.sceneHotspots.querySelectorAll('[data-hotspot-id]').forEach(function(button) {
                button.addEventListener('click', function() {
                    activateHotspot(this.getAttribute('data-hotspot-id'));
                });
            });
        }

        function renderGuideStops() {
            const guideStops = immersive.guideStops || [];
            elements.guideList.innerHTML = guideStops.map(function(stop, index) {
                return [
                    '<button class="guide-item' + (stop.hotspotId === state.activeHotspotId ? ' active' : '') + '" type="button" data-hotspot-id="' + stop.hotspotId + '">',
                    '<span class="guide-index">' + (index + 1) + '</span>',
                    '<div><h3>' + stop.title + '</h3><p>' + stop.summary + '</p></div>',
                    '</button>'
                ].join('');
            }).join('');

            elements.guideList.querySelectorAll('[data-hotspot-id]').forEach(function(button) {
                button.addEventListener('click', function() {
                    activateHotspot(this.getAttribute('data-hotspot-id'));
                });
            });

            if (!elements.immersiveStops) {
                return;
            }

            if (viewerConfig.mode === 'iframe') {
                elements.immersiveStops.hidden = true;
                elements.immersiveStops.innerHTML = '';
                return;
            }

            if (!guideStops.length) {
                elements.immersiveStops.hidden = true;
                elements.immersiveStops.innerHTML = '';
                return;
            }

            elements.immersiveStops.hidden = false;
            elements.immersiveStops.innerHTML = guideStops.map(function(stop, index) {
                return [
                    '<button class="stop-pill' + (stop.hotspotId === state.activeHotspotId ? ' active' : '') + '" type="button" data-hotspot-id="' + stop.hotspotId + '">',
                    '<span class="stop-pill-index">' + (index + 1) + '</span>',
                    '<span class="stop-pill-copy"><strong>' + stop.title + '</strong><span>' + stop.summary + '</span></span>',
                    '</button>'
                ].join('');
            }).join('');

            elements.immersiveStops.querySelectorAll('[data-hotspot-id]').forEach(function(button) {
                button.addEventListener('click', function() {
                    activateHotspot(this.getAttribute('data-hotspot-id'));
                });
            });
        }

        function activateHotspot(hotspotId) {
            const hotspot = findHotspot(hotspotId);
            if (!hotspot) {
                return;
            }
            state.activeHotspotId = hotspotId;
            renderHotspots();
            renderGuideStops();
            renderPanels(hotspot);
            setCameraByPreset(hotspot.id);
        }

        function resetView() {
            const preset = getPreset('default');
            if (isCesiumMode()) {
                elements.cameraLabel.textContent = '当前镜头：' + (preset.label || '默认视角');
                elements.cameraHint.textContent = preset.hint || viewerConfig.statusText || '当前为三维场景模式。';
                focusCesiumCamera('default');
                return;
            }
            state.zoom = clamp(preset.zoom || 1, 1, 2.2);
            state.offsetX = preset.offsetX || 0;
            state.offsetY = preset.offsetY || 0;
            applyTransform();
            elements.cameraLabel.textContent = '当前镜头：' + (preset.label || '默认视角');
            elements.cameraHint.textContent = preset.hint || viewerConfig.statusText || '当前为预览模式。';
        }

        function bindInteractions() {
            if (elements.rotateLeftBtn) {
                elements.rotateLeftBtn.addEventListener('click', function() {
                    rotateCesiumBy(-18);
                });
            }

            if (elements.rotateRightBtn) {
                elements.rotateRightBtn.addEventListener('click', function() {
                    rotateCesiumBy(18);
                });
            }

            elements.zoomInBtn.addEventListener('click', function() {
                if (isCesiumMode() && state.cesiumViewer) {
                    moveCesiumForward(viewerConfig.moveStep || 1.6);
                    return;
                }
                state.zoom = clamp(state.zoom + 0.12, 1, 2.2);
                applyTransform();
            });

            elements.zoomOutBtn.addEventListener('click', function() {
                if (isCesiumMode() && state.cesiumViewer) {
                    moveCesiumForward(-(viewerConfig.moveStep || 1.6));
                    return;
                }
                state.zoom = clamp(state.zoom - 0.12, 1, 2.2);
                applyTransform();
            });

            elements.zoomResetBtn.addEventListener('click', function() {
                resetView();
                activateHotspot(scene.hotspots[0] ? scene.hotspots[0].id : state.activeHotspotId);
            });

            elements.viewerStage.addEventListener('pointerdown', function(event) {
                if (!viewerConfig.supportsPanZoom || viewerConfig.mode === 'iframe') {
                    return;
                }
                state.dragging = true;
                state.dragStartX = event.clientX;
                state.dragStartY = event.clientY;
                state.startOffsetX = state.offsetX;
                state.startOffsetY = state.offsetY;
                elements.viewerStage.classList.add('is-dragging');
            });

            window.addEventListener('pointermove', function(event) {
                if (!state.dragging) {
                    return;
                }
                state.offsetX = state.startOffsetX + (event.clientX - state.dragStartX);
                state.offsetY = state.startOffsetY + (event.clientY - state.dragStartY);
                applyTransform();
            });

            window.addEventListener('pointerup', function() {
                state.dragging = false;
                elements.viewerStage.classList.remove('is-dragging');
            });

            elements.relatedTabs.querySelectorAll('[data-panel]').forEach(function(button) {
                button.addEventListener('click', function() {
                    const panelName = this.getAttribute('data-panel');
                    activateRelatedPanel(panelName);
                    openDrawer(panelName);
                });
            });

            if (elements.drawerButtons) {
                elements.drawerButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        toggleDrawer(this.getAttribute('data-drawer-target'));
                    });
                });
            }

            if (elements.drawerCloseBtn) {
                elements.drawerCloseBtn.addEventListener('click', closeDrawer);
            }

            window.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && state.drawerOpen) {
                    closeDrawer();
                }
            });
        }

        function mount() {
            elements.sceneTitle.textContent = scene.name;
            elements.sceneIntro.textContent = immersive.intro || scene.summary;
            elements.archiveLink.href = immersive.archiveLink || 'detail.html';
            elements.statHotspots.textContent = scene.hotspots.length + ' 个';
            elements.statDrawings.textContent = scene.drawings.length + ' 张';
            elements.statTimeline.textContent = scene.timeline.length + ' 条';
            elements.viewerProvider.textContent = (viewerConfig.provider || 'prototype').toUpperCase();
            setViewerMedia();
            renderHotspots();
            renderGuideStops();
            resetView();
            activateHotspot(state.activeHotspotId || (scene.hotspots[0] && scene.hotspots[0].id));
            applyTransform();
            bindInteractions();
            setDrawerSection('scene');
            closeDrawer();
        }

        return {
            mount: mount,
            activateHotspot: activateHotspot,
            resetView: resetView
        };
    }

    window.XHCJSceneRuntime = {
        create: createSceneRuntime
    };
})();