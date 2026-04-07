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
                    cameraHint: '从入口镜头切入场景，作为首次浏览的主视角。',
                    archiveRefs: ['story', 'gallery', 'models']
                },
                {
                    id: 'government-site',
                    name: '省苏维埃政府旧址',
                    type: '建筑热点',
                    position: { x: 0.55, y: 0.46, z: 0.18 },
                    cameraHint: '聚焦核心建筑立面，联动建筑档案与历史事件。',
                    archiveRefs: ['timeline', 'drawings']
                },
                {
                    id: 'meeting-room',
                    name: '会议室复原点',
                    type: '室内讲解点',
                    position: { x: 0.61, y: 0.52, z: 0.16 },
                    cameraHint: '切入室内讲解镜头，展示革命会议场景。',
                    archiveRefs: ['story', 'gallery']
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