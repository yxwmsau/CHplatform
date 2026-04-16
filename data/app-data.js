(function() {
    const scenes = {
        zhoulaozui: {
            id: 'zhoulaozui',
            slug: 'zhoulaozui',
            name: '周老嘴湘鄂西革命根据地纪念馆',
            shortName: '周老嘴革命旧址群',
            subtitle: '湘鄂西革命根据地记忆中枢',
            city: '湖北省监利市',
            town: '周老嘴镇',
            province: '湖北省',
            displayCity: '荆州',
            regionCode: '鄂',
            period: '红军长征时期',
            category: '重要机构驻地旧址',
            protectionLevel: '国家级重点文物保护单位',
            builtYear: '1978年',
            builtYearNote: '在湘鄂西省苏维埃政府旧址基础上改建',
            address: '湖北省监利市周老嘴镇老正街中段',
            coordinates: [29.99, 112.92],
            coverImage: 'images/湘鄂西大门.jpg',
            archiveCardImage: 'images/zhoulaozui.jpg',
            summary: '湘鄂西革命根据地中心，包含湘鄂西省委、省苏维埃政府旧址等，是红色历史街区数字化展示的核心点位。',
            shortStory: '纪念馆依托湘鄂西省苏维埃政府旧址等革命遗址群建立，集中展示了湘鄂西革命根据地的创建与发展历程。馆内珍藏大量革命文物、历史照片和文献资料，复原了贺龙、周逸群等领导人的办公场景，是开展爱国主义教育的重要基地。',
            longStoryTitle: '湘鄂西革命根据地的记忆中枢',
            longStory: '周老嘴湘鄂西革命根据地纪念馆坐落于老正街核心区，由湘鄂西省苏维埃政府旧址等革命遗址群构成。馆内基本陈列《星火燎原——湘鄂西革命根据地史》通过200余件革命文物、500余张历史照片，系统展示了1927年至1934年间湘鄂西根据地的创建、巩固与转移历程。贺龙、周逸群、段德昌等老一辈革命家曾在此运筹帷幄，指挥洪湖赤卫队与敌军展开殊死斗争。纪念馆还复原了当年会议室、机要室和领导人居室，让参观者身临其境感受革命岁月的艰辛与壮烈。',
            readMoreHint: '更多红色故事正在录入中……',
            gallery: [
                {
                    id: 'gate',
                    title: '纪念馆正门',
                    imageUrl: 'images/湘鄂西3.jpg',
                    caption: '纪念馆正门与街区界面实景'
                },
                {
                    id: 'street',
                    title: '周老嘴街区',
                    imageUrl: 'images/湘鄂西.jpg',
                    caption: '老正街沿线的街区风貌与历史肌理'
                }
            ],
            immersive: {
                heroImage: 'images/湘鄂西大门.jpg',
                heroAlt: '周老嘴沉浸式场景预览',
                intro: '以周老嘴纪念馆入口空间为第一视角，串联纪念馆前场、核心旧址立面和室内复原讲解点，形成第一版可交互沉浸式浏览场景。',
                sceneLink: 'scene.html?sceneId=zhoulaozui',
                viewer: {
                    mode: 'image',
                    provider: 'prototype',
                    source: 'images/湘鄂西大门.jpg',
                    fallbackImage: 'images/湘鄂西大门.jpg',
                    alt: '周老嘴沉浸式场景预览',
                    supportsPanZoom: true,
                    supportsHotspots: true,
                    futureAdapters: ['iframe', 'threejs', 'supersplat'],
                    statusText: '当前为第一阶段原型查看器，后续可切换为真实 WebGL / iframe / Supersplat 场景加载器。'
                },
                cameraPresets: {
                    default: {
                        zoom: 1,
                        offsetX: 0,
                        offsetY: 0,
                        label: '入口总览',
                        hint: '从入口镜头切入场景，建立周老嘴纪念馆整体空间认知。'
                    },
                    'gate-square': {
                        zoom: 1,
                        offsetX: 0,
                        offsetY: 0,
                        label: '入口导览',
                        hint: '从入口镜头切入场景，作为首次浏览的主视角。'
                    },
                    'government-site': {
                        zoom: 1.28,
                        offsetX: -70,
                        offsetY: 28,
                        label: '旧址立面',
                        hint: '镜头拉近至核心建筑立面，便于联动图纸与建筑档案。'
                    },
                    'meeting-room': {
                        zoom: 1.42,
                        offsetX: -120,
                        offsetY: 12,
                        label: '室内讲解',
                        hint: '镜头进一步推近，用于承载室内讲解与人物故事叙述。'
                    }
                },
                guideStops: [
                    {
                        id: 'entry-stop',
                        hotspotId: 'gate-square',
                        title: '入口导览',
                        summary: '从纪念馆前场切入，建立场景方位感和街区整体认知。'
                    },
                    {
                        id: 'facade-stop',
                        hotspotId: 'government-site',
                        title: '旧址立面',
                        summary: '聚焦核心建筑外立面，联动建筑档案、图纸和平面关系。'
                    },
                    {
                        id: 'interior-stop',
                        hotspotId: 'meeting-room',
                        title: '室内讲解',
                        summary: '切入会议室复原点，展示人物活动与革命叙事。'
                    }
                ]
            },
            models: [
                {
                    id: 'panorama',
                    title: '全景三维模型',
                    description: '基于无人机倾斜摄影生成，可360°旋转缩放，精准呈现纪念馆整体格局与周边环境。',
                    previewImage: 'images/全景图.png',
                    actionLabel: '点击查看',
                    actionHint: '全景三维模型加载中……(演示模式)'
                },
                {
                    id: 'gaussian-splat',
                    title: '高斯泼溅动态模型',
                    description: '由手机多视角影像生成，动态还原砖木结构与光影质感，建筑细节清晰可见。',
                    previewImage: 'images/湘鄂西高斯.jpg',
                    actionLabel: '点击查看',
                    actionHint: '高斯泼溅模型加载中……(演示模式)'
                }
            ],
            drawings: [
                {
                    id: 'plan',
                    title: '平面图',
                    thumbnail: 'images/湘鄂西平面图.png',
                    previewUrl: 'images/湘鄂西平面图.png',
                    downloadUrl: 'images/湘鄂西平面图.png',
                    downloadName: '纪念馆_平面图.png'
                },
                {
                    id: 'elevation',
                    title: '立面图',
                    thumbnail: 'images/湘鄂西立面图.png',
                    previewUrl: 'images/湘鄂西立面图.png',
                    downloadUrl: 'images/湘鄂西立面图.png',
                    downloadName: '纪念馆_立面图.png'
                },
                {
                    id: 'section',
                    title: '剖面图',
                    thumbnail: 'images/湘鄂西剖面图.png',
                    previewUrl: 'images/湘鄂西剖面图.png',
                    downloadUrl: 'images/湘鄂西剖面图.png',
                    downloadName: '纪念馆_剖面图.png'
                }
            ],
            hotspots: [
                {
                    id: 'gate-square',
                    name: '纪念馆前场',
                    type: '入口节点',
                    position: { x: 0.48, y: 0.58, z: 0.12 },
                    title: '纪念馆前场入口',
                    description: '这里是用户进入周老嘴场景后的第一观察点，适合展示整体空间关系、导览说明与纪念馆总体介绍。',
                    cameraHint: '从入口镜头切入场景，作为首次浏览的主视角。',
                    archiveRefs: ['story', 'gallery', 'models'],
                    relatedGalleryIds: ['gate'],
                    relatedDrawingIds: [],
                    relatedTimelineIds: [1, 3]
                },
                {
                    id: 'government-site',
                    name: '省苏维埃政府旧址',
                    type: '建筑热点',
                    position: { x: 0.55, y: 0.46, z: 0.18 },
                    title: '省苏维埃政府旧址',
                    description: '场景中的核心建筑热点，用于挂接建筑基础档案、平立剖图纸和关键历史事件。',
                    cameraHint: '聚焦核心建筑立面，联动建筑档案与历史事件。',
                    archiveRefs: ['timeline', 'drawings'],
                    relatedGalleryIds: ['street'],
                    relatedDrawingIds: ['plan', 'elevation', 'section'],
                    relatedTimelineIds: [1, 3, 5]
                },
                {
                    id: 'meeting-room',
                    name: '会议室复原点',
                    type: '室内讲解点',
                    position: { x: 0.61, y: 0.52, z: 0.16 },
                    title: '会议室复原点',
                    description: '适合承载人物讲解、场景复原和革命故事叙述，是后续自动导览的重要节点。',
                    cameraHint: '切入室内讲解镜头，展示革命会议场景。',
                    archiveRefs: ['story', 'gallery'],
                    relatedGalleryIds: ['gate'],
                    relatedDrawingIds: [],
                    relatedTimelineIds: [1]
                }
            ],
            timeline: [
                {
                    id: 1,
                    name: '湘鄂西省苏维埃政府成立',
                    year: 1930,
                    lat: 29.99,
                    lng: 112.92,
                    location: '周老嘴',
                    description: '湘鄂西省苏维埃政府正式成立，标志着以周老嘴为中心的湘鄂西革命根据地进入全盛时期。贺龙任总指挥，周逸群任政委。',
                    figures: '贺龙、周逸群、段德昌',
                    buildings: '湘鄂西省苏维埃政府旧址、红二军团指挥部旧址',
                    major: true
                },
                {
                    id: 2,
                    name: '洪湖赤卫队建立',
                    year: 1928,
                    lat: 29.85,
                    lng: 113.45,
                    location: '洪湖',
                    description: '在贺龙领导下，洪湖地区组建赤卫队，开展游击战争，为湘鄂西根据地奠定基础。',
                    figures: '贺龙、周逸群',
                    buildings: '洪湖赤卫队成立旧址',
                    major: false
                },
                {
                    id: 3,
                    name: '中共中央湘鄂西分局成立',
                    year: 1931,
                    lat: 30.02,
                    lng: 112.88,
                    location: '周老嘴',
                    description: '中共中央湘鄂西分局在周老嘴成立，统一领导湘鄂西地区党政军工作。',
                    figures: '夏曦、贺龙、关向应',
                    buildings: '湘鄂西分局旧址',
                    major: true
                },
                {
                    id: 4,
                    name: '监利县苏维埃政府成立',
                    year: 1929,
                    lat: 29.95,
                    lng: 112.95,
                    location: '监利',
                    description: '监利县苏维埃政府成立，成为湘鄂西根据地最早建立的县级红色政权之一。',
                    figures: '崔琪、娄敏修',
                    buildings: '监利县苏维埃旧址',
                    major: false
                },
                {
                    id: 5,
                    name: '新沟嘴大捷',
                    year: 1932,
                    lat: 30.10,
                    lng: 112.80,
                    location: '新沟嘴',
                    description: '红三军在贺龙指挥下，于新沟嘴歼灭国民党军一个旅，取得重大胜利。',
                    figures: '贺龙、段德昌',
                    buildings: '新沟嘴战斗遗址',
                    major: false
                },
                {
                    id: 6,
                    name: '红军长征过境',
                    year: 1935,
                    lat: 29.80,
                    lng: 113.20,
                    location: '湘鄂边',
                    description: '红二、六军团从湘鄂边出发开始长征，途经监利、周老嘴一带。',
                    figures: '贺龙、任弼时、关向应',
                    buildings: '长征出发地旧址',
                    major: true
                },
                {
                    id: 7,
                    name: '抗日战争时期游击据点',
                    year: 1942,
                    lat: 29.98,
                    lng: 112.85,
                    location: '周老嘴周边',
                    description: '新四军第五师在周老嘴周边建立抗日游击据点，坚持敌后抗战。',
                    figures: '李先念、陈少敏',
                    buildings: '抗日游击指挥部旧址',
                    major: false
                },
                {
                    id: 8,
                    name: '解放监利县城',
                    year: 1949,
                    lat: 29.93,
                    lng: 112.90,
                    location: '监利',
                    description: '中国人民解放军攻克监利县城，湘鄂西地区全境解放。',
                    figures: '解放军第四野战军',
                    buildings: '监利解放纪念地',
                    major: true
                }
            ]
        },
        jiangzuoyifeng: {
            id: 'jiangzuoyifeng',
            slug: 'jiangzuoyifeng',
            name: '江左遗风省委组织部旧址',
            shortName: '江左遗风旧址',
            subtitle: '3D Tiles 接入测试场景',
            city: '湖北省监利市',
            town: '周老嘴镇',
            province: '湖北省',
            displayCity: '荆州',
            regionCode: '鄂',
            period: '资料待补充',
            category: '重要机构驻地旧址',
            protectionLevel: '资料待补充',
            builtYear: '资料待补充',
            builtYearNote: '当前先用于真实三维场景接入测试。',
            address: '江左遗风（6省委组织部旧址）',
            coordinates: [29.99, 112.92],
            coverImage: 'images/全景图.png',
            archiveCardImage: 'images/全景图.png',
            summary: '该场景已存在完整三维导出结果，包含 b3dm、pnts、osgb、fbx、ply 等多套格式，当前优先用于验证 Web 端真实 3D Tiles 浏览链路。',
            shortStory: '目前先以真实三维浏览测试为主，历史档案与图纸信息后续再按旧址资料逐步补齐。',
            longStoryTitle: '真实三维场景接入测试',
            longStory: '江左遗风旧址目录下已导出完整的三维结果树，其中 model-b3dm 包含 tileset.json 入口文件，适合作为当前平台接入 Cesium 3D Tiles 的首个实验样本。现阶段先验证模型加载、镜头切换、导览节点与档案面板联动，后续再补充更完整的史实档案。',
            readMoreHint: '该点位的史实档案信息正在整理中。',
            gallery: [
                {
                    id: 'jiangzuo-model',
                    title: '三维场景接入测试',
                    imageUrl: 'images/全景图.png',
                    caption: '当前使用真实 3D Tiles 结果进行 Web 端加载测试。'
                }
            ],
            immersive: {
                heroImage: 'images/全景图.png',
                heroAlt: '江左遗风三维场景加载预览',
                intro: '该点位当前切换为首视角沉浸式浏览测试，用户进入后不再是绕模型看，而是站在场景内部环顾与驻足切换。',
                sceneLink: 'scene.html?sceneId=jiangzuoyifeng',
                archiveLink: 'scene.html?sceneId=jiangzuoyifeng',
                defaultAssetMode: 'gsplat',
                viewer: {
                    mode: 'cesium-tiles',
                    provider: 'cesium',
                    tilesetUrl: '../高斯vr成果/江左遗风（6省委组织部旧址）/新建项目-20260227/result/3D/model-b3dm/tileset.json',
                    origin: {
                        longitude: 112.92,
                        latitude: 29.99,
                        height: 32,
                        heading: 0,
                        pitch: 0,
                        roll: 0
                    },
                    initialRange: 220,
                    moveStep: 1.8,
                    maximumScreenSpaceError: 1.5,
                    dynamicScreenSpaceError: false,
                    foveatedScreenSpaceError: false,
                    skipLevelOfDetail: false,
                    preferLeaves: true,
                    loadSiblings: true,
                    cullRequestsWhileMoving: false,
                    immediatelyLoadDesiredLevelOfDetail: true,
                    progressiveResolutionHeightFraction: 0.15,
                    resolutionScale: 1.75,
                    msaaSamples: 4,
                    supportsPanZoom: false,
                    supportsHotspots: false,
                    futureAdapters: ['3d-tiles', 'pnts', 'gltf'],
                    statusText: '已切换为首视角沉浸式查看器；左键拖动可环顾四周，滚轮或上下按钮可前后移动。当前已启用高质量分片加载。'
                },
                viewerVariants: {
                    gsplat: {
                        switchLabel: '高斯泼溅',
                        mode: 'iframe',
                        provider: 'supersplat viewer',
                        source: 'supersplat/index.html?settings=./jiangzuoyifeng-settings.json&content=../../%E9%AB%98%E6%96%AFvr%E6%88%90%E6%9E%9C/%E6%B1%9F%E5%B7%A6%E9%81%97%E9%A3%8E%EF%BC%886%E7%9C%81%E5%A7%94%E7%BB%84%E7%BB%87%E9%83%A8%E6%97%A7%E5%9D%80%EF%BC%89/%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE-20260227/result/3D/model-gs-ply/ue/gs_full.ply&poster=../images/%E5%85%A8%E6%99%AF%E5%9B%BE.png&aa&fullload&hpr=1&camera=fly&immersive=1&hideorbit=1&maxpitch=80&tx=-4.440023899078369&ty=0.000000130553615917961&tz=-2.010570764541626&qx=-0.001203945170660559&qy=-0.1395621318751207&qz=0.9796321109683854&qw=0.14436720203052467',
                        supportsPanZoom: false,
                        supportsHotspots: false,
                        futureAdapters: ['supersplat'],
                        statusText: '当前为高斯泼溅自由浏览路线；保留直接拖拽转头，并恢复场景内自由移动。若加载较慢，请等待高质量 splat 完成排序与补载。'
                    },
                    mesh: {
                        switchLabel: '网格模型',
                        provider: 'cesium mesh',
                        tilesetUrl: '../高斯vr成果/江左遗风（6省委组织部旧址）/新建项目-20260227/result/3D/model-b3dm/tileset.json',
                        maximumScreenSpaceError: 1.5,
                        dynamicScreenSpaceError: false,
                        foveatedScreenSpaceError: false,
                        skipLevelOfDetail: false,
                        preferLeaves: true,
                        loadSiblings: true,
                        cullRequestsWhileMoving: false,
                        immediatelyLoadDesiredLevelOfDetail: true,
                        progressiveResolutionHeightFraction: 0.15,
                        resolutionScale: 1.75,
                        msaaSamples: 4,
                        statusText: '当前为网格模型路线，适合看建筑外轮廓和体块，但细节上限受导出质量影响。'
                    },
                    pointcloud: {
                        switchLabel: '点云实验',
                        provider: 'cesium point cloud',
                        tilesetUrl: '../高斯vr成果/江左遗风（6省委组织部旧址）/新建项目-20260227/result/3D/point-pnts/tileset.json',
                        maximumScreenSpaceError: 1,
                        dynamicScreenSpaceError: false,
                        foveatedScreenSpaceError: false,
                        skipLevelOfDetail: false,
                        preferLeaves: true,
                        loadSiblings: true,
                        cullRequestsWhileMoving: false,
                        immediatelyLoadDesiredLevelOfDetail: true,
                        progressiveResolutionHeightFraction: 0.1,
                        resolutionScale: 2,
                        msaaSamples: 4,
                        pointSize: 3,
                        pointCloudShading: {
                            attenuation: true,
                            geometricErrorScale: 0.2,
                            maximumAttenuation: 5,
                            eyeDomeLighting: true,
                            eyeDomeLightingStrength: 1,
                            eyeDomeLightingRadius: 1.2
                        },
                        statusText: '当前为点云实验路线。该模式更适合验证空间采集完整度，不适合作为近距离沉浸式观看的最终方案。'
                    }
                },
                cameraPresets: {
                    default: {
                        label: '前场中段',
                        hint: '默认落在前场中段的实拍机位，先保证进入时视线稳定落在主体建筑正前方。',
                        gsplatView: {
                            position: [-4.87613, 2.580352, -3.429979],
                            target: [-4.912998, 1.113, 2.387711],
                            yawLimit: 12,
                            pitchLimit: 8
                        },
                        view: {
                            mode: 'immersive',
                            east: -3,
                            north: -3,
                            up: 2.2,
                            heading: 2,
                            pitch: -3,
                            roll: 0
                        }
                    },
                    'courtyard-overview': {
                        label: '前场中段',
                        hint: '使用前场中段的实拍机位建立第一眼方位，不再把默认点扔到偏侧位置。',
                        gsplatView: {
                            position: [-4.87613, 2.580352, -3.429979],
                            target: [-4.912998, 1.113, 2.387711],
                            yawLimit: 12,
                            pitchLimit: 8
                        },
                        view: {
                            mode: 'immersive',
                            east: -3,
                            north: -3,
                            up: 2.2,
                            heading: 2,
                            pitch: -3,
                            roll: 0
                        }
                    },
                    'facade-focus': {
                        label: '前场西段',
                        hint: '退到前场西段实拍机位，从同一条采集路径的左侧位置观察主体立面。',
                        gsplatView: {
                            position: [-5.934017, 3.415136, -5.693762],
                            target: [-5.677007, 1.752145, 0.06544],
                            yawLimit: 12,
                            pitchLimit: 8
                        },
                        view: {
                            mode: 'immersive',
                            east: -4.2,
                            north: -5.7,
                            up: 2.05,
                            heading: 6,
                            pitch: -2.5,
                            roll: 0
                        }
                    },
                    'roof-structure': {
                        label: '前场东段',
                        hint: '切到前场东段实拍机位，从同一路径的右侧位置继续看向主体建筑。',
                        gsplatView: {
                            position: [-0.498055, 0.386401, -1.532282],
                            target: [-1.268471, -0.695647, 4.31884],
                            yawLimit: 12,
                            pitchLimit: 8
                        },
                        view: {
                            mode: 'immersive',
                            east: 1.65,
                            north: -1.1,
                            up: 1.95,
                            heading: -6,
                            pitch: -2.5,
                            roll: 0
                        }
                    }
                },
                guideStops: [
                    {
                        id: 'jiangzuo-stop-1',
                        hotspotId: 'courtyard-overview',
                        title: '前场中段',
                        summary: '默认落在主体建筑正前方附近的实拍机位，先把第一眼视图拉回到正常入口感。'
                    },
                    {
                        id: 'jiangzuo-stop-2',
                        hotspotId: 'facade-focus',
                        title: '前场西段',
                        summary: '沿同一条实拍路径向西侧挪一步，仍然保持朝向主体建筑，不再跨到错误区域。'
                    },
                    {
                        id: 'jiangzuo-stop-3',
                        hotspotId: 'roof-structure',
                        title: '前场东段',
                        summary: '沿同一路径向东侧移动，形成左右两个补充视角，但仍停留在同一个清晰前场带。'
                    }
                ]
            },
            models: [
                {
                    id: 'tiles-demo',
                    title: 'Cesium 3D Tiles 实景模型',
                    description: '直接加载现有 tileset.json 与 b3dm 分块，验证浏览器内真实三维浏览能力。',
                    previewImage: 'images/全景图.png',
                    actionLabel: '进入场景',
                    actionHint: '已接入 3D Tiles 测试链路。'
                }
            ],
            drawings: [],
            hotspots: [
                {
                    id: 'courtyard-overview',
                    name: '前场中段',
                    type: '导览节点',
                    position: { x: 0.4, y: 0.45, z: 0.1 },
                    title: '前场中段',
                    description: '把默认首视角放回主体建筑正前方附近，先让用户以正常的到场视角进入场景。',
                    cameraHint: '从中段正视建筑，先建立入口和主体的空间关系。',
                    archiveRefs: ['story'],
                    relatedGalleryIds: ['jiangzuo-model'],
                    relatedDrawingIds: [],
                    relatedTimelineIds: [1]
                },
                {
                    id: 'facade-focus',
                    name: '前场西段',
                    type: '导览节点',
                    position: { x: 0.55, y: 0.5, z: 0.1 },
                    title: '前场西段',
                    description: '第二个驻足点位于同一条实拍路径的西侧，作为中段视角的左侧补充。',
                    cameraHint: '从左侧前场看向主体立面，观察墙面、门窗和前场过渡。',
                    archiveRefs: ['gallery'],
                    relatedGalleryIds: ['jiangzuo-model'],
                    relatedDrawingIds: [],
                    relatedTimelineIds: [2]
                },
                {
                    id: 'roof-structure',
                    name: '前场东段',
                    type: '导览节点',
                    position: { x: 0.62, y: 0.35, z: 0.1 },
                    title: '前场东段',
                    description: '第三个驻足点位于同一路径的东侧，和前场西段形成成对的横向补充观察。',
                    cameraHint: '从右侧前场继续看向主体建筑，补充另一侧的立面关系。',
                    archiveRefs: ['timeline'],
                    relatedGalleryIds: ['jiangzuo-model'],
                    relatedDrawingIds: [],
                    relatedTimelineIds: [3]
                }
            ],
            timeline: [
                {
                    id: 1,
                    name: '三维导出结果整理',
                    year: 2026,
                    lat: 29.99,
                    lng: 112.92,
                    location: '江左遗风旧址',
                    description: '完成面向 Web 接入测试所需的模型结果梳理，确认 b3dm、pnts、osgb、fbx、ply 等多套导出可用。',
                    figures: '项目团队',
                    buildings: '江左遗风旧址',
                    major: true
                },
                {
                    id: 2,
                    name: '3D Tiles 首次接入平台',
                    year: 2026,
                    lat: 29.99,
                    lng: 112.92,
                    location: '平台代码',
                    description: '将 tileset.json 作为真实场景入口接入 scene.html，用于验证浏览、镜头和面板联动能力。',
                    figures: '项目团队',
                    buildings: '数字平台',
                    major: true
                },
                {
                    id: 3,
                    name: '后续补录史实档案',
                    year: 2026,
                    lat: 29.99,
                    lng: 112.92,
                    location: '江左遗风旧址',
                    description: '待确认该点位更完整的旧址历史资料后，再补齐人物、事件、图纸和照片联动内容。',
                    figures: '项目团队',
                    buildings: '江左遗风旧址',
                    major: false
                }
            ]
        }
    };

    const featuredSceneId = 'zhoulaozui';

    const heritageSites = [
        {
            id: 'zhoulaozui',
            name: '周老嘴老正街红色历史街区',
            province: scenes.zhoulaozui.province,
            city: scenes.zhoulaozui.displayCity,
            desc: scenes.zhoulaozui.summary,
            link: 'detail.html',
            coordinates: scenes.zhoulaozui.coordinates
        },
        {
            id: 'yidahui',
            name: '中共一大会址纪念馆',
            province: '上海市',
            city: '上海',
            desc: '中国共产党第一次全国代表大会会址，全国重点文物保护单位，典型的上海石库门建筑。',
            link: '#',
            coordinates: [31.2304, 121.4737]
        },
        {
            id: 'yanan',
            name: '延安革命纪念地',
            province: '陕西省',
            city: '延安',
            desc: '包含凤凰山、杨家岭、枣园等革命旧址，中共中央在陕北十三年的所在地。',
            link: '#',
            coordinates: [36.5853, 109.4897]
        },
        {
            id: 'jinggangshan',
            name: '井冈山革命遗址',
            province: '江西省',
            city: '吉安',
            desc: '中国第一个农村革命根据地，被称为“中国革命的摇篮”，含八角楼、黄洋界等。',
            link: '#',
            coordinates: [26.57, 114.17]
        },
        {
            id: 'zunyi',
            name: '遵义会议会址',
            province: '贵州省',
            city: '遵义',
            desc: '遵义会议召开地，确立了毛泽东在党中央的领导地位，国家级重点文保单位。',
            link: '#',
            coordinates: [27.73, 106.93]
        },
        {
            id: 'xibaipo',
            name: '西柏坡中共中央旧址',
            province: '河北省',
            city: '石家庄',
            desc: '解放战争后期中国共产党中央所在地，指挥了三大战役，召开七届二中全会。',
            link: '#',
            coordinates: [38.36, 114.02]
        }
    ];

    const archiveBuildings = [
        {
            id: 1,
            sceneId: 'zhoulaozui',
            name: scenes.zhoulaozui.shortName,
            region: scenes.zhoulaozui.regionCode,
            period: scenes.zhoulaozui.period,
            category: scenes.zhoulaozui.category,
            description: scenes.zhoulaozui.summary,
            imageUrl: scenes.zhoulaozui.archiveCardImage,
            link: 'detail.html'
        },
        { id: 2, sceneId: 'yidahui', name: '中共一大会址', region: '沪', period: '建党和大革命时期', category: '重要机构驻地旧址', description: '中国共产党第一次全国代表大会会址，全国重点文物保护单位，石库门建筑。', imageUrl: 'images/yidahuizhi.jpg', link: '#' },
        { id: 3, sceneId: 'yanan', name: '延安革命纪念地', region: '陕', period: '抗日战争时期', category: '革命事件发生地', description: '包含凤凰山、杨家岭、枣园等革命旧址，中共中央所在地。', imageUrl: 'images/yanangeming.jpg', link: '#' },
        { id: 4, sceneId: 'jinggangshan', name: '井冈山革命遗址', region: '赣', period: '红军长征时期', category: '革命事件发生地', description: '中国第一个农村革命根据地，“中国革命的摇篮”。', imageUrl: 'images/jinggangshan.jpg', link: '#' },
        { id: 5, sceneId: 'zunyi', name: '遵义会议会址', region: '贵', period: '红军长征时期', category: '革命事件发生地', description: '确立了毛泽东在党中央的领导地位，国家级重点文保单位。', imageUrl: 'images/zunyihuiyi.jpg', link: '#' },
        { id: 6, sceneId: 'xibaipo', name: '西柏坡中共中央旧址', region: '冀', period: '解放战争时期', category: '重要机构驻地旧址', description: '指挥三大战役，召开七届二中全会。', imageUrl: 'images/xibaipo.jpg', link: '#' },
        { id: 7, sceneId: 'xinjiang', name: '八路军驻新疆办事处', region: '新', period: '抗日战争时期', category: '重要机构驻地旧址', description: '国家级文物保护单位，抗战时期中国共产党在新疆领导抗日救亡运动的重要机构。', imageUrl: 'images/xinjiang.jpg', link: '#' },
        { id: 8, sceneId: 'shaoshan', name: '毛泽东故居', region: '湘', period: '建党和大革命时期', category: '红色名人故居集中区', description: '位于湖南韶山，全国重点文物保护单位，伟人诞生地。', imageUrl: 'images/maozedong.jpg', link: '#' },
        { id: 9, sceneId: 'jinggangshan-museum', name: '井冈山革命博物馆', region: '赣', period: '社会主义革命和建设时期', category: '红色文化类', description: '陈列井冈山斗争历史，国家一级博物馆。', imageUrl: 'images/jinggangshanbowuguan.jpg', link: '#' },
        { id: 10, sceneId: 'pingxingguan', name: '平型关战役遗址', region: '晋', period: '抗日战争时期', category: '战斗遗址类', description: '八路军首场大捷所在地，国家级文物保护单位。', imageUrl: 'images/pingxingguan.jpg', link: '#' },
        { id: 11, sceneId: 'renminyingxiong', name: '人民英雄纪念碑', region: '京', period: '社会主义革命和建设时期', category: '纪念设施类', description: '位于天安门广场，纪念近代以来为民族独立献身的英烈。', imageUrl: 'images/renminyingxiong.jpg', link: '#' },
        { id: 12, sceneId: 'meiyuan', name: '梅园新村纪念馆', region: '苏', period: '解放战争时期', category: '革命旧址类', description: '中共代表团谈判旧址，国共南京谈判地。', imageUrl: 'images/meiyuanxincun.jpg', link: '#' }
    ];

    window.XHCJ_DATA = {
        featuredSceneId: featuredSceneId,
        scenes: scenes,
        heritageSites: heritageSites,
        archiveBuildings: archiveBuildings,
        getScene: function(sceneId) {
            return scenes[sceneId] || null;
        },
        getFeaturedScene: function() {
            return scenes[featuredSceneId] || null;
        },
        getTimelineByScene: function(sceneId) {
            const scene = scenes[sceneId];
            return scene ? scene.timeline : [];
        },
        getArchiveBuildings: function() {
            return archiveBuildings.slice();
        },
        getHeritageSites: function() {
            return heritageSites.slice();
        }
    };
})();