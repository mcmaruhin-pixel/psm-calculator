/**
 * ПСМ Промстрой Механизация – калькулятор металлоконструкций, земляных и бетонных работ.
 * Полный код с учётом откосов, сетки квадратов, дренажной траншеи, классов бетона В, ленточного фундамента и расчёта по весу.
 */
(function() {
    // ==================== РАСКРЫВАЮЩИЕСЯ СЕКЦИИ ====================
    const sectionButtons = document.querySelectorAll('.section-collapse-btn');
    const sectionContents = document.querySelectorAll('.section-collapse-content');

    function toggleSection(btn) {
        const targetId = btn.getAttribute('data-section') + 'Section';
        const content = document.getElementById(targetId);
        if (!content) return;
        const isOpen = content.classList.contains('open');
        sectionContents.forEach(c => c.classList.remove('open'));
        sectionButtons.forEach(b => b.classList.remove('active'));
        if (!isOpen) {
            content.classList.add('open');
            btn.classList.add('active');
        }
    }
    sectionButtons.forEach(btn => btn.addEventListener('click', () => toggleSection(btn)));

    // ==================== МЕТАЛЛОКОНСТРУКЦИИ ====================
    const tabs = {
        plate: document.getElementById('tabPlate'),
        pipe: document.getElementById('tabPipe'),
        squarePipe: document.getElementById('tabSquarePipe'),
        angle: document.getElementById('tabAngle'),
        channel: document.getElementById('tabChannel'),
        beam: document.getElementById('tabBeam'),
        rebar: document.getElementById('tabRebar'),
        square: document.getElementById('tabSquare'),
        strip: document.getElementById('tabStrip'),
        round: document.getElementById('tabRound'),
        polygon: document.getElementById('tabPolygon'),
        rifle: document.getElementById('tabRifle'),
        mesh: document.getElementById('tabMesh'),
        rebarFrame: document.getElementById('tabRebarFrame'),
        rail: document.getElementById('tabRail'),
        piles: document.getElementById('tabPiles'),
        cprofile: document.getElementById('tabCProfile'),
        zet: document.getElementById('tabZet'),
        tavr: document.getElementById('tabTavr'),
        fut: document.getElementById('tabFut'),
        pvl: document.getElementById('tabPvl'),
        weight: document.getElementById('tabWeight')
    };
    const sections = {
        plate: document.getElementById('plateSection'),
        pipe: document.getElementById('pipeSection'),
        squarePipe: document.getElementById('squarePipeSection'),
        angle: document.getElementById('angleSection'),
        channel: document.getElementById('channelSection'),
        beam: document.getElementById('beamSection'),
        rebar: document.getElementById('rebarSection'),
        square: document.getElementById('squareSection'),
        strip: document.getElementById('stripSection'),
        round: document.getElementById('roundSection'),
        polygon: document.getElementById('polygonSection'),
        rifle: document.getElementById('rifleSection'),
        mesh: document.getElementById('meshSection'),
        rebarFrame: document.getElementById('rebarFrameSection'),
        rail: document.getElementById('railSection'),
        piles: document.getElementById('pilesSection'),
        cprofile: document.getElementById('cprofileSection'),
        zet: document.getElementById('zetSection'),
        tavr: document.getElementById('tavrSection'),
        fut: document.getElementById('futSection'),
        pvl: document.getElementById('pvlSection'),
        weight: document.getElementById('weightSection')
    };

    // ---------- DOM элементы металлов ----------
    const plate = {
        length: document.getElementById('plateLength'), width: document.getElementById('plateWidth'),
        thickness: document.getElementById('plateThickness'), material: document.getElementById('plateMaterial'),
        btn: document.getElementById('plateCalculate'), area: document.getElementById('plateArea'),
        diag: document.getElementById('plateDiag'), weight: document.getElementById('plateWeight'),
        section: document.getElementById('plateSectionArea'), totalVol: document.getElementById('plateTotalVolume'),
        vol1: document.getElementById('plateVol1'), vol2: document.getElementById('plateVol2'), vol3: document.getElementById('plateVol3')
    };
    const pipe = {
        length: document.getElementById('pipeLength'), thickness: document.getElementById('pipeThickness'),
        dimension: document.getElementById('pipeDimension'), material: document.getElementById('pipeMaterial'),
        radios: document.getElementsByName('pipeMode'), label: document.getElementById('pipeDimLabel'),
        btn: document.getElementById('pipeCalculate'), weight: document.getElementById('pipeWeight'),
        outerDia: document.getElementById('pipeOuterDia'), innerDia: document.getElementById('pipeInnerDia'),
        outerCirc: document.getElementById('pipeOuterCirc'), innerCirc: document.getElementById('pipeInnerCirc'),
        outerArea: document.getElementById('pipeOuterArea'), innerArea: document.getElementById('pipeInnerArea'),
        section: document.getElementById('pipeSectionArea')
    };
    const sqPipe = {
        mode: document.getElementById('sqPipeMode'),
        manualInputs: document.getElementById('sqPipeManualInputs'),
        gostInputs: document.getElementById('sqPipeGostInputs'),
        length: document.getElementById('sqPipeLength'),
        sideA: document.getElementById('sqPipeSideA'),
        sideB: document.getElementById('sqPipeSideB'),
        thickness: document.getElementById('sqPipeThickness'),
        gostLength: document.getElementById('sqPipeGostLength'),
        gostProfile: document.getElementById('sqPipeGostProfile'),
        material: document.getElementById('sqPipeMaterial'),
        btn: document.getElementById('sqPipeCalculate'),
        weight: document.getElementById('sqPipeWeight'),
        diag: document.getElementById('sqPipeDiag'),
        outerArea: document.getElementById('sqPipeOuterArea'),
        innerArea: document.getElementById('sqPipeInnerArea'),
        section: document.getElementById('sqPipeSectionArea')
    };
    const angle = {
        length: document.getElementById('angleLength'), type: document.getElementById('angleType'),
        profile: document.getElementById('angleProfile'), material: document.getElementById('angleMaterial'),
        btn: document.getElementById('angleCalculate'), weight: document.getElementById('angleWeight'),
        section: document.getElementById('angleSectionArea'), surface: document.getElementById('angleSurface')
    };
    const channel = {
        length: document.getElementById('channelLength'),
        type: document.getElementById('channelType'),
        profile: document.getElementById('channelProfile'),
        material: document.getElementById('channelMaterial'),
        btn: document.getElementById('channelCalculate'),
        weight: document.getElementById('channelWeight'),
        section: document.getElementById('channelSectionArea'),
        surface: document.getElementById('channelSurface')
    };
    const beam = {
        length: document.getElementById('beamLength'),
        type: document.getElementById('beamType'),
        profile: document.getElementById('beamProfile'),
        material: document.getElementById('beamMaterial'),
        btn: document.getElementById('beamCalculate'),
        weight: document.getElementById('beamWeight'),
        section: document.getElementById('beamSectionArea'),
        surface: document.getElementById('beamSurface')
    };
    const rebar = {
        length: document.getElementById('rebarLength'), profile: document.getElementById('rebarProfile'),
        material: document.getElementById('rebarMaterial'), btn: document.getElementById('rebarCalculate'),
        weight: document.getElementById('rebarWeight'), section: document.getElementById('rebarSectionArea'),
        surface: document.getElementById('rebarSurface')
    };
    const square = {
        length: document.getElementById('squareLength'), side: document.getElementById('squareSide'),
        material: document.getElementById('squareMaterial'), btn: document.getElementById('squareCalculate'),
        weight: document.getElementById('squareWeight'), section: document.getElementById('squareSectionArea'),
        surface: document.getElementById('squareSurface')
    };
    const strip = {
        length: document.getElementById('stripLength'), width: document.getElementById('stripWidth'),
        thickness: document.getElementById('stripThickness'), material: document.getElementById('stripMaterial'),
        btn: document.getElementById('stripCalculate'), weight: document.getElementById('stripWeight'),
        section: document.getElementById('stripSectionArea'), surface: document.getElementById('stripSurface')
    };
    const round = {
        length: document.getElementById('roundLength'), diameter: document.getElementById('roundDiameter'),
        material: document.getElementById('roundMaterial'), btn: document.getElementById('roundCalculate'),
        weight: document.getElementById('roundWeight'), section: document.getElementById('roundSectionArea'),
        surface: document.getElementById('roundSurface')
    };
    const polygon = {
        length: document.getElementById('polygonLength'),
        type: document.getElementById('polygonType'),
        size: document.getElementById('polygonSize'),
        material: document.getElementById('polygonMaterial'),
        btn: document.getElementById('polygonCalculate'),
        weight: document.getElementById('polygonWeight'),
        section: document.getElementById('polygonSectionArea'),
        surface: document.getElementById('polygonSurface')
    };
    const rifle = {
        type: document.getElementById('rifleType'),
        thickness: document.getElementById('rifleThickness'),
        width: document.getElementById('rifleWidth'),
        length: document.getElementById('rifleLength'),
        material: document.getElementById('rifleMaterial'),
        btn: document.getElementById('rifleCalculate'),
        area: document.getElementById('rifleArea'),
        weight: document.getElementById('rifleWeight')
    };
    const mesh = {
        diameter: document.getElementById('meshDiameter'),
        step: document.getElementById('meshStep'),
        width: document.getElementById('meshWidth'),
        length: document.getElementById('meshLength'),
        material: document.getElementById('meshMaterial'),
        btn: document.getElementById('meshCalculate'),
        weight: document.getElementById('meshWeight'),
        section: document.getElementById('meshSectionArea'),
        area: document.getElementById('meshArea')
    };
    const rf = {
        type: document.getElementById('rfType'),
        rectInputs: document.getElementById('rfRectInputs'),
        roundInputs: document.getElementById('rfRoundInputs'),
        length: document.getElementById('rfLength'),
        width: document.getElementById('rfWidth'),
        height: document.getElementById('rfHeight'),
        diameter: document.getElementById('rfDiameter'),
        longCount: document.getElementById('rfLongCount'),
        longDia: document.getElementById('rfLongDia'),
        transStep: document.getElementById('rfTransStep'),
        transDia: document.getElementById('rfTransDia'),
        lapLength: document.getElementById('rfLapLength'),
        material: document.getElementById('rfMaterial'),
        btn: document.getElementById('rfCalculate'),
        longWeight: document.getElementById('rfLongWeight'),
        transWeight: document.getElementById('rfTransWeight'),
        totalWeight: document.getElementById('rfTotalWeight'),
        totalLength: document.getElementById('rfTotalLength'),
        surface: document.getElementById('rfSurface')
    };
    const rail = {
        length: document.getElementById('railLength'),
        profile: document.getElementById('railProfile'),
        material: document.getElementById('railMaterial'),
        btn: document.getElementById('railCalculate'),
        weight: document.getElementById('railWeight'),
        section: document.getElementById('railSectionArea'),
        surface: document.getElementById('railSurface')
    };
    const piles = {
        length: document.getElementById('pilesLength'),
        profile: document.getElementById('pilesProfile'),
        material: document.getElementById('pilesMaterial'),
        btn: document.getElementById('pilesCalculate'),
        weight: document.getElementById('pilesWeight'),
        section: document.getElementById('pilesSectionArea'),
        surface: document.getElementById('pilesSurface')
    };
    const cprofile = {
        length: document.getElementById('cprofileLength'),
        profile: document.getElementById('cprofileProfile'),
        material: document.getElementById('cprofileMaterial'),
        btn: document.getElementById('cprofileCalculate'),
        weight: document.getElementById('cprofileWeight'),
        section: document.getElementById('cprofileSectionArea'),
        surface: document.getElementById('cprofileSurface')
    };
    const zet = {
        length: document.getElementById('zetLength'),
        profile: document.getElementById('zetProfile'),
        material: document.getElementById('zetMaterial'),
        btn: document.getElementById('zetCalculate'),
        weight: document.getElementById('zetWeight'),
        section: document.getElementById('zetSectionArea'),
        surface: document.getElementById('zetSurface')
    };
    const tavr = {
        length: document.getElementById('tavrLength'),
        profile: document.getElementById('tavrProfile'),
        material: document.getElementById('tavrMaterial'),
        btn: document.getElementById('tavrCalculate'),
        weight: document.getElementById('tavrWeight'),
        section: document.getElementById('tavrSectionArea'),
        surface: document.getElementById('tavrSurface')
    };
    const fut = {
        length: document.getElementById('futLength'),
        profile: document.getElementById('futProfile'),
        material: document.getElementById('futMaterial'),
        btn: document.getElementById('futCalculate'),
        weight: document.getElementById('futWeight'),
        section: document.getElementById('futSectionArea'),
        surface: document.getElementById('futSurface')
    };
    const pvl = {
        thickness: document.getElementById('pvlThickness'),
        pitch: document.getElementById('pvlPitch'),
        width: document.getElementById('pvlWidth'),
        length: document.getElementById('pvlLength'),
        material: document.getElementById('pvlMaterial'),
        btn: document.getElementById('pvlCalculate'),
        area: document.getElementById('pvlArea'),
        weight: document.getElementById('pvlWeight')
    };

    // ---------- БАЗЫ ДАННЫХ ----------
    const angleData = {
        equal: [
            { name:"20x20x3", b:20, t:3, A:1.13, S:0.077 }, { name:"20x20x4", b:20, t:4, A:1.46, S:0.076 },
            { name:"25x25x3", b:25, t:3, A:1.43, S:0.097 }, { name:"25x25x4", b:25, t:4, A:1.86, S:0.096 },
            { name:"30x30x3", b:30, t:3, A:1.74, S:0.117 }, { name:"30x30x4", b:30, t:4, A:2.27, S:0.116 },
            { name:"35x35x3", b:35, t:3, A:2.04, S:0.137 }, { name:"35x35x4", b:35, t:4, A:2.67, S:0.136 },
            { name:"40x40x3", b:40, t:3, A:2.35, S:0.157 }, { name:"40x40x4", b:40, t:4, A:3.08, S:0.156 },
            { name:"45x45x4", b:45, t:4, A:3.48, S:0.176 }, { name:"45x45x5", b:45, t:5, A:4.29, S:0.175 },
            { name:"50x50x4", b:50, t:4, A:3.89, S:0.196 }, { name:"50x50x5", b:50, t:5, A:4.80, S:0.195 },
            { name:"63x63x5", b:63, t:5, A:6.13, S:0.247 }, { name:"63x63x6", b:63, t:6, A:7.28, S:0.246 },
            { name:"70x70x6", b:70, t:6, A:8.15, S:0.274 }, { name:"75x75x6", b:75, t:6, A:8.78, S:0.294 },
            { name:"80x80x6", b:80, t:6, A:9.38, S:0.314 }, { name:"80x80x8", b:80, t:8, A:12.3, S:0.312 },
            { name:"90x90x7", b:90, t:7, A:12.3, S:0.354 }, { name:"90x90x8", b:90, t:8, A:13.9, S:0.352 },
            { name:"100x100x8", b:100, t:8, A:15.6, S:0.392 }, { name:"100x100x10", b:100, t:10, A:19.2, S:0.390 },
            { name:"125x125x10", b:125, t:10, A:24.3, S:0.491 }, { name:"125x125x12", b:125, t:12, A:28.9, S:0.489 },
            { name:"160x160x12", b:160, t:12, A:37.4, S:0.630 }, { name:"160x160x16", b:160, t:16, A:49.1, S:0.627 },
            { name:"200x200x16", b:200, t:16, A:62.0, S:0.788 }, { name:"200x200x20", b:200, t:20, A:76.5, S:0.785 },
            { name:"250x250x20", b:250, t:20, A:96.6, S:0.986 }, { name:"250x250x25", b:250, t:25, A:119.0, S:0.983 }
        ],
        unequal: [
            { name:"25x16x3", B:25, b:16, t:3, A:1.16, S:0.078 }, { name:"30x20x3", B:30, b:20, t:3, A:1.43, S:0.095 },
            { name:"32x20x3", B:32, b:20, t:3, A:1.49, S:0.099 }, { name:"40x25x4", B:40, b:25, t:4, A:2.47, S:0.123 },
            { name:"45x28x4", B:45, b:28, t:4, A:2.80, S:0.139 }, { name:"50x32x4", B:50, b:32, t:4, A:3.17, S:0.156 },
            { name:"56x36x5", B:56, b:36, t:5, A:4.41, S:0.175 }, { name:"63x40x5", B:63, b:40, t:5, A:4.98, S:0.198 },
            { name:"63x40x6", B:63, b:40, t:6, A:5.90, S:0.196 }, { name:"70x45x5", B:70, b:45, t:5, A:5.59, S:0.221 },
            { name:"75x50x6", B:75, b:50, t:6, A:7.25, S:0.240 }, { name:"80x50x6", B:80, b:50, t:6, A:7.55, S:0.252 },
            { name:"90x56x6", B:90, b:56, t:6, A:8.54, S:0.284 }, { name:"100x63x6", B:100, b:63, t:6, A:9.59, S:0.316 },
            { name:"100x63x8", B:100, b:63, t:8, A:12.6, S:0.314 }, { name:"125x80x8", B:125, b:80, t:8, A:16.0, S:0.398 },
            { name:"125x80x10", B:125, b:80, t:10, A:19.7, S:0.396 }, { name:"160x100x10", B:160, b:100, t:10, A:25.3, S:0.507 },
            { name:"160x100x12", B:160, b:100, t:12, A:30.0, S:0.505 }, { name:"200x125x12", B:200, b:125, t:12, A:37.9, S:0.637 },
            { name:"200x125x16", B:200, b:125, t:16, A:49.8, S:0.634 }
        ]
    };

    const beamData = {
        gost8239: [
            { name:"10", h:100, b:55, A:12.0, S:0.330, Ix:198, Wx:39.7 },
            { name:"12", h:120, b:64, A:14.7, S:0.392, Ix:350, Wx:58.4 },
            { name:"14", h:140, b:73, A:17.4, S:0.455, Ix:572, Wx:81.7 },
            { name:"16", h:160, b:81, A:20.2, S:0.511, Ix:873, Wx:109 },
            { name:"18", h:180, b:90, A:23.4, S:0.575, Ix:1290, Wx:143 },
            { name:"20", h:200, b:100, A:26.8, S:0.642, Ix:1840, Wx:184 },
            { name:"22", h:220, b:110, A:30.6, S:0.709, Ix:2550, Wx:232 },
            { name:"24", h:240, b:115, A:34.8, S:0.752, Ix:3460, Wx:289 },
            { name:"27", h:270, b:125, A:40.2, S:0.827, Ix:5010, Wx:371 },
            { name:"30", h:300, b:135, A:46.5, S:0.902, Ix:7080, Wx:472 },
            { name:"33", h:330, b:140, A:53.8, S:0.963, Ix:9840, Wx:597 },
            { name:"36", h:360, b:145, A:61.9, S:1.023, Ix:13380, Wx:743 },
            { name:"40", h:400, b:155, A:72.6, S:1.106, Ix:19062, Wx:953 },
            { name:"45", h:450, b:160, A:84.7, S:1.207, Ix:27696, Wx:1231 },
            { name:"50", h:500, b:170, A:100.0, S:1.330, Ix:39727, Wx:1589 },
            { name:"55", h:550, b:180, A:118.0, S:1.452, Ix:55962, Wx:2035 },
            { name:"60", h:600, b:190, A:138.0, S:1.575, Ix:76806, Wx:2560 }
        ],
        gost26020Sh: [
            { name:"20Ш1", h:200, b:150, A:38.4, S:0.700, Ix:2660, Wx:266 },
            { name:"25Ш1", h:250, b:175, A:48.7, S:0.850, Ix:5160, Wx:413 },
            { name:"30Ш1", h:300, b:200, A:60.1, S:1.000, Ix:9100, Wx:607 },
            { name:"35Ш1", h:350, b:250, A:79.7, S:1.200, Ix:16200, Wx:926 },
            { name:"40Ш1", h:400, b:300, A:103.0, S:1.400, Ix:29200, Wx:1460 }
        ],
        gost26020K: [
            { name:"20К1", h:200, b:200, A:52.0, S:0.800, Ix:3820, Wx:382 },
            { name:"25К1", h:250, b:250, A:79.7, S:1.000, Ix:8170, Wx:654 },
            { name:"30К1", h:300, b:300, A:114.0, S:1.200, Ix:17200, Wx:1147 },
            { name:"35К1", h:350, b:350, A:156.0, S:1.400, Ix:34300, Wx:1960 },
            { name:"40К1", h:400, b:400, A:205.0, S:1.600, Ix:64000, Wx:3200 }
        ]
    };

    const channelData = {
        gost8240: [
            { name:"5П", h:50, b:32, A:6.16, S:0.169, Ix:22.8, Wx:9.1 },
            { name:"6.5П", h:65, b:36, A:7.51, S:0.206, Ix:48.6, Wx:15 },
            { name:"8П", h:80, b:40, A:8.98, S:0.245, Ix:89.4, Wx:22.4 },
            { name:"10П", h:100, b:46, A:10.9, S:0.296, Ix:174, Wx:34.8 },
            { name:"12П", h:120, b:52, A:13.3, S:0.348, Ix:304, Wx:50.6 },
            { name:"14П", h:140, b:58, A:15.6, S:0.399, Ix:491, Wx:70.2 },
            { name:"16П", h:160, b:64, A:18.1, S:0.451, Ix:747, Wx:93.4 },
            { name:"18П", h:180, b:70, A:20.7, S:0.502, Ix:1090, Wx:121 },
            { name:"20П", h:200, b:76, A:23.4, S:0.554, Ix:1520, Wx:152 },
            { name:"22П", h:220, b:82, A:26.7, S:0.605, Ix:2110, Wx:192 },
            { name:"24П", h:240, b:90, A:30.6, S:0.672, Ix:2900, Wx:242 },
            { name:"27П", h:270, b:95, A:35.2, S:0.739, Ix:4160, Wx:308 },
            { name:"30П", h:300, b:100, A:40.5, S:0.806, Ix:5810, Wx:387 },
            { name:"33П", h:330, b:105, A:46.5, S:0.874, Ix:7980, Wx:484 },
            { name:"36П", h:360, b:110, A:53.4, S:0.941, Ix:10820, Wx:601 },
            { name:"40П", h:400, b:115, A:61.5, S:1.015, Ix:15220, Wx:761 }
        ],
        gost8240P: [
            { name:"10П", h:100, b:46, A:10.9, S:0.296, Ix:174, Wx:34.8 },
            { name:"12П", h:120, b:52, A:13.3, S:0.348, Ix:304, Wx:50.6 },
            { name:"14П", h:140, b:58, A:15.6, S:0.399, Ix:491, Wx:70.2 },
            { name:"16П", h:160, b:64, A:18.1, S:0.451, Ix:747, Wx:93.4 }
        ],
        gost8281: [
            { name:"40х32х2", h:40, b:32, s:2, A:1.44, S:0.144, Ix:3.84, Wx:1.92 },
            { name:"40х32х2.5", h:40, b:32, s:2.5, A:1.78, S:0.143, Ix:4.68, Wx:2.34 },
            { name:"50х40х2.5", h:50, b:40, s:2.5, A:2.22, S:0.180, Ix:9.12, Wx:3.65 },
            { name:"60х50х3", h:60, b:50, s:3, A:3.27, S:0.220, Ix:19.4, Wx:6.47 },
            { name:"80х40х3", h:80, b:40, s:3, A:3.63, S:0.240, Ix:31.2, Wx:7.8 },
            { name:"80х50х4", h:80, b:50, s:4, A:5.24, S:0.260, Ix:41.6, Wx:10.4 },
            { name:"100х50х4", h:100, b:50, s:4, A:6.04, S:0.300, Ix:76.8, Wx:15.4 },
            { name:"100х60х4", h:100, b:60, s:4, A:6.68, S:0.320, Ix:86.4, Wx:17.3 },
            { name:"120х60х5", h:120, b:60, s:5, A:9.04, S:0.360, Ix:172, Wx:28.7 },
            { name:"140х70х5", h:140, b:70, s:5, A:10.79, S:0.420, Ix:282, Wx:40.3 },
            { name:"160х80х5", h:160, b:80, s:5, A:12.54, S:0.480, Ix:428, Wx:53.5 },
            { name:"180х90х6", h:180, b:90, s:6, A:16.68, S:0.540, Ix:718, Wx:79.8 },
            { name:"200х100х6", h:200, b:100, s:6, A:18.88, S:0.600, Ix:1010, Wx:101 },
            { name:"250х125х6", h:250, b:125, s:6, A:23.88, S:0.750, Ix:1990, Wx:159 },
            { name:"300х150х6", h:300, b:150, s:6, A:29.88, S:0.900, Ix:3580, Wx:239 }
        ],
        gost8278: [
            { name:"40х40х2",   h:40, b:40, s:2,   A:2.36, S:0.240, Ix:4.8, Wx:2.4 },
            { name:"40х40х2.5", h:40, b:40, s:2.5, A:2.87, S:0.239, Ix:5.75, Wx:2.87 },
            { name:"50х50х2.5", h:50, b:50, s:2.5, A:3.62, S:0.299, Ix:11.2, Wx:4.48 },
            { name:"50х50х3",   h:50, b:50, s:3,   A:4.29, S:0.298, Ix:13.0, Wx:5.2 },
            { name:"60х60х3",   h:60, b:60, s:3,   A:5.19, S:0.358, Ix:23.3, Wx:7.77 },
            { name:"60х60х4",   h:60, b:60, s:4,   A:6.68, S:0.356, Ix:29.2, Wx:9.73 },
            { name:"80х80х4",   h:80, b:80, s:4,   A:9.08, S:0.478, Ix:69.6, Wx:17.4 },
            { name:"80х80х5",   h:80, b:80, s:5,   A:11.18, S:0.476, Ix:83.4, Wx:20.8 },
            { name:"100х100х4", h:100, b:100, s:4, A:11.48, S:0.598, Ix:141, Wx:28.2 },
            { name:"100х100х5", h:100, b:100, s:5, A:14.18, S:0.596, Ix:170, Wx:34 },
            { name:"120х120х5", h:120, b:120, s:5, A:17.18, S:0.716, Ix:307, Wx:51.2 },
            { name:"140х140х5", h:140, b:140, s:5, A:20.18, S:0.836, Ix:493, Wx:70.4 },
            { name:"160х160х5", h:160, b:160, s:5, A:23.18, S:0.956, Ix:749, Wx:93.6 },
            { name:"180х180х5", h:180, b:180, s:5, A:26.18, S:1.076, Ix:1077, Wx:119.7 },
            { name:"200х200х6", h:200, b:200, s:6, A:35.44, S:1.194, Ix:1770, Wx:177 },
            { name:"250х250х6", h:250, b:250, s:6, A:44.44, S:1.494, Ix:3460, Wx:277 },
            { name:"300х300х6", h:300, b:300, s:6, A:53.44, S:1.794, Ix:6050, Wx:403 }
        ],
        gost8281slope: [
            { name:"50х40х2.5ук", h:50, b:40, s:2.5, A:2.30, S:0.181, Ix:9.5, Wx:3.8 },
            { name:"60х50х3ук", h:60, b:50, s:3, A:3.40, S:0.221, Ix:20.2, Wx:6.73 },
            { name:"80х50х4ук", h:80, b:50, s:4, A:5.40, S:0.261, Ix:43.0, Wx:10.8 },
            { name:"100х60х4ук", h:100, b:60, s:4, A:6.80, S:0.321, Ix:90.0, Wx:18.0 },
            { name:"120х70х5ук", h:120, b:70, s:5, A:9.50, S:0.381, Ix:182, Wx:30.3 },
            { name:"140х80х5ук", h:140, b:80, s:5, A:11.20, S:0.441, Ix:295, Wx:42.1 },
            { name:"160х90х6ук", h:160, b:90, s:6, A:14.00, S:0.501, Ix:460, Wx:57.5 },
            { name:"200х100х6ук", h:200, b:100, s:6, A:17.00, S:0.621, Ix:920, Wx:92.0 }
        ]
    };

    const sqPipeGostData = [
        { name:"15x15x1.2", A:0.65, h:15, b:15, s:1.2 },
        { name:"20x20x1.5", A:1.08, h:20, b:20, s:1.5 },
        { name:"25x25x1.5", A:1.38, h:25, b:25, s:1.5 },
        { name:"30x30x2",   A:2.17, h:30, b:30, s:2 },
        { name:"40x40x2",   A:2.96, h:40, b:40, s:2 },
        { name:"40x40x3",   A:4.29, h:40, b:40, s:3 },
        { name:"50x50x3",   A:5.45, h:50, b:50, s:3 },
        { name:"50x50x4",   A:7.05, h:50, b:50, s:4 },
        { name:"60x60x3",   A:6.65, h:60, b:60, s:3 },
        { name:"60x60x4",   A:8.65, h:60, b:60, s:4 },
        { name:"80x80x4",   A:11.85, h:80, b:80, s:4 },
        { name:"80x80x5",   A:14.55, h:80, b:80, s:5 },
        { name:"100x100x4", A:15.05, h:100, b:100, s:4 },
        { name:"100x100x5", A:18.55, h:100, b:100, s:5 },
        { name:"120x120x5", A:22.55, h:120, b:120, s:5 },
        { name:"120x120x6", A:26.65, h:120, b:120, s:6 },
        { name:"140x140x6", A:31.45, h:140, b:140, s:6 },
        { name:"150x150x6", A:33.85, h:150, b:150, s:6 },
        { name:"160x160x6", A:36.25, h:160, b:160, s:6 },
        { name:"180x180x6", A:41.05, h:180, b:180, s:6 },
        { name:"200x200x8", A:59.77, h:200, b:200, s:8 },
        { name:"250x250x8", A:75.77, h:250, b:250, s:8 },
        { name:"300x300x8", A:91.77, h:300, b:300, s:8 }
    ];

    const rebarDiameters = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,34,36,40];
    const rebarData = rebarDiameters.map(d => ({ d, A: parseFloat((Math.PI*d*d/4/100).toFixed(3)) }));

    // Масса погонного метра арматуры по ГОСТ 5781-82
    const rebarMassMap = {
        6: 0.222, 7: 0.302, 8: 0.395, 9: 0.499, 10: 0.617, 11: 0.746,
        12: 0.888, 13: 1.04, 14: 1.21, 15: 1.39, 16: 1.58, 17: 1.78,
        18: 2.00, 19: 2.23, 20: 2.47, 21: 2.72, 22: 2.98, 23: 3.26,
        24: 3.55, 25: 3.85, 26: 4.17, 27: 4.50, 28: 4.83, 30: 5.55,
        32: 6.31, 34: 7.13, 36: 7.99, 38: 8.91, 40: 9.87
    };
    const rebarDiaList = Object.keys(rebarMassMap).map(Number);

    const roundDiameters = rebarDiameters.slice();
    const roundData = roundDiameters.map(d => ({ d, A: parseFloat((Math.PI*d*d/4/100).toFixed(3)) }));

    const hexSizes = [8,10,12,14,17,19,22,24,27,30,32,36,41,46,50,55,60,65,70,75,80,90,100];
    const octSizes = [14,17,19,22,24,27,30,32,36,41,46,50,55,60,65,70,75,80,90,100,110,120];

    function getPolygonData(S, type) {
        let A, perimeter;
        if (type === 'hex') {
            A = (Math.sqrt(3) / 2) * S * S / 100;
            perimeter = 2 * Math.sqrt(3) * S / 1000;
        } else {
            A = 2 * (Math.sqrt(2) - 1) * S * S / 100;
            perimeter = 8 * S / (1 + Math.sqrt(2)) / 1000;
        }
        return { A, perimeter };
    }

    const rifleData = {
        romb: [
            { t: 2.5, m2: 21.5 }, { t: 3, m2: 25.1 }, { t: 4, m2: 33.6 }, { t: 5, m2: 41.8 },
            { t: 6, m2: 49.9 }, { t: 8, m2: 66.1 }, { t: 10, m2: 82.3 }, { t: 12, m2: 98.5 }
        ],
        chech: [
            { t: 2.5, m2: 20.5 }, { t: 3, m2: 24.1 }, { t: 4, m2: 32.6 }, { t: 5, m2: 40.8 },
            { t: 6, m2: 48.9 }, { t: 8, m2: 65.1 }, { t: 10, m2: 81.3 }, { t: 12, m2: 97.5 }
        ]
    };

    const meshDiameters = [3, 4, 5, 6, 8, 10, 12];
    const meshSteps = [50, 100, 150, 200, 250, 300];

    const railData = [
        { name:"КР70", A:67.3, S:0.470 },
        { name:"КР80", A:81.8, S:0.510 },
        { name:"КР100", A:113.4, S:0.590 },
        { name:"КР120", A:150.5, S:0.670 },
        { name:"КР140", A:186.3, S:0.740 }
    ];

    const pilesData = [
        { name:"Л4",   A:94.3,  S:0.671 },
        { name:"Л5",   A:113.0, S:0.750 },
        { name:"Л5У",  A:127.0, S:0.790 },
        { name:"Л7",   A:138.0, S:0.840 },
        { name:"Л7У",  A:152.0, S:0.880 }
    ];

    const cprofileData = [
        { name:"50х30х2",   h:50, b:30, s:2,   A:2.08, S:0.172 },
        { name:"60х30х2",   h:60, b:30, s:2,   A:2.28, S:0.192 },
        { name:"80х40х2.5", h:80, b:40, s:2.5, A:3.83, S:0.257 },
        { name:"100х50х3",  h:100, b:50, s:3, A:5.73, S:0.323 },
        { name:"120х50х3",  h:120, b:50, s:3, A:6.33, S:0.363 },
        { name:"140х60х4",  h:140, b:60, s:4, A:9.81, S:0.432 },
        { name:"160х70х4",  h:160, b:70, s:4, A:11.41, S:0.492 },
        { name:"180х80х5",  h:180, b:80, s:5, A:16.08, S:0.564 },
        { name:"200х80х5",  h:200, b:80, s:5, A:17.08, S:0.604 },
        { name:"250х100х6", h:250, b:100, s:6, A:25.54, S:0.762 },
        { name:"300х100х6", h:300, b:100, s:6, A:28.54, S:0.862 }
    ];

    const zetData = [
        { name:"Z100", h:100, b:50, s:3, A:5.73, S:0.300 },
        { name:"Z120", h:120, b:60, s:4, A:8.68, S:0.360 },
        { name:"Z140", h:140, b:70, s:5, A:12.54, S:0.420 },
        { name:"Z160", h:160, b:80, s:5, A:14.54, S:0.480 },
        { name:"Z180", h:180, b:90, s:6, A:19.68, S:0.540 },
        { name:"Z200", h:200, b:100, s:6, A:21.88, S:0.600 }
    ];

    const tavrData = [
        { name:"Т50х50х5", h:50, b:50, s:5, A:4.80, S:0.196 },
        { name:"Т75х75х7", h:75, b:75, s:7, A:10.10, S:0.294 },
        { name:"Т100х100х10", h:100, b:100, s:10, A:19.20, S:0.392 },
        { name:"Т125х125х12", h:125, b:125, s:12, A:28.90, S:0.490 }
    ];

    const futData = [
        { name:"Ф40х40х4", h:40, b:40, s:4, A:3.08, S:0.156 },
        { name:"Ф50х50х5", h:50, b:50, s:5, A:4.80, S:0.195 },
        { name:"Ф60х60х6", h:60, b:60, s:6, A:6.68, S:0.234 }
    ];

    const pvlThicknesses = [2, 3, 4, 5, 6];
    const pvlPitches = [10, 15, 20, 25, 30];
    const pvlAreaFactor = 0.7;

    // Данные для бетона
    const concreteMix = {
        'M100': { cement:210, sand:780, gravel:1250, water:175, ratio:'1:3.7:6.0', strength_kgf:100, desc:'М100 – 1:3.7:6.0, В/Ц 0.83. Для неответственных конструкций.' },
        'M150': { cement:230, sand:740, gravel:1260, water:175, ratio:'1:3.2:5.5', strength_kgf:150, desc:'М150 – 1:3.2:5.5, В/Ц 0.76. Стяжки, дорожки.' },
        'M200': { cement:280, sand:710, gravel:1240, water:180, ratio:'1:2.5:4.4', strength_kgf:200, desc:'М200 – 1:2.5:4.4, В/Ц 0.64. Универсальный бетон.' },
        'M250': { cement:330, sand:660, gravel:1230, water:180, ratio:'1:2.0:3.7', strength_kgf:250, desc:'М250 – 1:2.0:3.7, В/Ц 0.55. Повышенная прочность.' },
        'M300': { cement:380, sand:610, gravel:1220, water:190, ratio:'1:1.6:3.2', strength_kgf:300, desc:'М300 – 1:1.6:3.2, В/Ц 0.50. Ответственные конструкции.' },
        'M350': { cement:420, sand:580, gravel:1210, water:195, ratio:'1:1.4:2.9', strength_kgf:350, desc:'М350 – 1:1.4:2.9, В/Ц 0.46. Колонны, балки.' },
        'M400': { cement:480, sand:520, gravel:1200, water:200, ratio:'1:1.1:2.5', strength_kgf:400, desc:'М400 – 1:1.1:2.5, В/Ц 0.42. Мостовые конструкции.' },
        'M450': { cement:540, sand:480, gravel:1190, water:205, ratio:'1:0.9:2.2', strength_kgf:450, desc:'М450 – 1:0.9:2.2, В/Ц 0.38. Специальные сооружения.' },
        'M500': { cement:600, sand:450, gravel:1180, water:210, ratio:'1:0.8:2.0', strength_kgf:500, desc:'М500 – 1:0.8:2.0, В/Ц 0.35. Высокопрочный бетон.' },
        'B3.5':  { cement:160, sand:800, gravel:1300, water:160, ratio:'1:5.0:8.1', strength_mpa:3.5, strength_kgf:35, desc:'В3.5 – для неответственных конструкций, легкие фундаменты.' },
        'B5':   { cement:200, sand:780, gravel:1280, water:170, ratio:'1:3.9:6.4', strength_mpa:5, strength_kgf:50, desc:'В5 – стяжки, основания, малонагруженные элементы.' },
        'B7.5': { cement:230, sand:750, gravel:1260, water:175, ratio:'1:3.3:5.5', strength_mpa:7.5, strength_kgf:75, desc:'В7.5 – фундаменты, дорожные покрытия с нагрузкой.' },
        'B10':  { cement:260, sand:720, gravel:1240, water:180, ratio:'1:2.8:4.8', strength_mpa:10, strength_kgf:100, desc:'В10 – перекрытия, стены, колонны малой этажности.' },
        'B12.5':{ cement:290, sand:690, gravel:1220, water:185, ratio:'1:2.4:4.2', strength_mpa:12.5, strength_kgf:125, desc:'В12.5 – ответственные конструкции, ж/б балки.' },
        'B15':  { cement:320, sand:660, gravel:1200, water:190, ratio:'1:2.1:3.8', strength_mpa:15, strength_kgf:150, desc:'В15 – колонны, ригели, плиты перекрытий.' },
        'B20':  { cement:360, sand:630, gravel:1180, water:195, ratio:'1:1.8:3.3', strength_mpa:20, strength_kgf:200, desc:'В20 – монолитные конструкции, фундаменты высотных зданий.' },
        'B25':  { cement:400, sand:600, gravel:1160, water:200, ratio:'1:1.5:2.9', strength_mpa:25, strength_kgf:250, desc:'В25 – мостовые опоры, подпорные стены, резервуары.' },
        'B30':  { cement:440, sand:570, gravel:1140, water:205, ratio:'1:1.3:2.6', strength_mpa:30, strength_kgf:300, desc:'В30 – гидротехнические сооружения, массивные блоки.' },
        'B35':  { cement:480, sand:540, gravel:1120, water:210, ratio:'1:1.1:2.3', strength_mpa:35, strength_kgf:350, desc:'В35 – специальные конструкции, большие нагрузки.' },
        'B40':  { cement:520, sand:510, gravel:1100, water:215, ratio:'1:1.0:2.1', strength_mpa:40, strength_kgf:400, desc:'В40 – высотное строительство, мосты, атомные станции.' },
        'B45':  { cement:560, sand:480, gravel:1080, water:220, ratio:'1:0.9:1.9', strength_mpa:45, strength_kgf:450, desc:'В45 – уникальные сооружения, колонны небоскребов.' },
        'B50':  { cement:600, sand:450, gravel:1060, water:225, ratio:'1:0.8:1.8', strength_mpa:50, strength_kgf:500, desc:'В50 – высокопрочный бетон для специальных проектов.' },
        'B55':  { cement:640, sand:420, gravel:1040, water:230, ratio:'1:0.7:1.6', strength_mpa:55, strength_kgf:550, desc:'В55 – премиальный бетон для сверхвысоких нагрузок.' },
        'B60':  { cement:680, sand:390, gravel:1020, water:235, ratio:'1:0.6:1.5', strength_mpa:60, strength_kgf:600, desc:'В60 – максимальная прочность, специальные рецептуры.' }
    };

    // Данные для раствора (цементно-песчаного) с учётом марки цемента
    const mortarMix = {
        25: {
            400: { cement:160, sand:1400, water:110, ratio:'1:8.8', desc:'М25 на цементе М400 – для неответственных конструкций, кладка в сухих условиях.' },
            500: { cement:130, sand:1400, water:100, ratio:'1:10.8', desc:'М25 на цементе М500 – для неответственных конструкций, кладка в сухих условиях.' }
        },
        50: {
            400: { cement:200, sand:1350, water:130, ratio:'1:6.8', desc:'М50 на цементе М400 – кладка стен, штукатурка, стяжки в сухих помещениях.' },
            500: { cement:170, sand:1350, water:120, ratio:'1:7.9', desc:'М50 на цементе М500 – кладка стен, штукатурка, стяжки в сухих помещениях.' }
        },
        75: {
            400: { cement:250, sand:1300, water:160, ratio:'1:5.2', desc:'М75 на цементе М400 – кладка в нормальных условиях, штукатурка по бетону.' },
            500: { cement:220, sand:1300, water:150, ratio:'1:5.9', desc:'М75 на цементе М500 – кладка в нормальных условиях, штукатурка по бетону.' }
        },
        100: {
            400: { cement:300, sand:1250, water:190, ratio:'1:4.2', desc:'М100 на цементе М400 – армированная кладка, оштукатуривание цоколей.' },
            500: { cement:260, sand:1250, water:180, ratio:'1:4.8', desc:'М100 на цементе М500 – армированная кладка, оштукатуривание цоколей.' }
        },
        150: {
            400: { cement:400, sand:1150, water:240, ratio:'1:2.9', desc:'М150 на цементе М400 – кладка во влажных условиях, ответственные конструкции.' },
            500: { cement:340, sand:1150, water:220, ratio:'1:3.4', desc:'М150 на цементе М500 – кладка во влажных условиях, ответственные конструкции.' }
        },
        200: {
            400: { cement:500, sand:1050, water:290, ratio:'1:2.1', desc:'М200 на цементе М400 – высокопрочный раствор для гидротехнических и подземных конструкций.' },
            500: { cement:430, sand:1050, water:260, ratio:'1:2.4', desc:'М200 на цементе М500 – высокопрочный раствор для гидротехнических и подземных конструкций.' }
        }
    };

    // ---------- Заполнение селектов ----------
    function populateAngleProfiles() {
        const type = angle.type.value;
        angle.profile.innerHTML = '';
        angleData[type].forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            angle.profile.appendChild(opt);
        });
    }
    angle.type.addEventListener('change', populateAngleProfiles);
    populateAngleProfiles();

    function populateChannelProfiles() {
        const type = channel.type.value;
        const profiles = channelData[type];
        channel.profile.innerHTML = '';
        profiles.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            channel.profile.appendChild(opt);
        });
    }
    channel.type.addEventListener('change', populateChannelProfiles);
    populateChannelProfiles();

    function populateBeamProfiles() {
        const type = beam.type.value;
        let profiles;
        if (type === 'gost8239') profiles = beamData.gost8239;
        else if (type === 'gost26020Sh') profiles = beamData.gost26020Sh;
        else if (type === 'gost26020K') profiles = beamData.gost26020K;
        beam.profile.innerHTML = '';
        profiles.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            beam.profile.appendChild(opt);
        });
    }
    beam.type.addEventListener('change', populateBeamProfiles);
    populateBeamProfiles();

    (function populateRebar() {
        rebar.profile.innerHTML = '';
        rebarData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.d} мм (сеч. ${item.A} см²)`;
            rebar.profile.appendChild(opt);
        });
    })();

    (function populateRound() {
        round.diameter.innerHTML = '';
        roundData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.d} мм (сеч. ${item.A} см²)`;
            round.diameter.appendChild(opt);
        });
    })();

    function populatePolygonSize() {
        const type = polygon.type.value;
        const sizes = type === 'hex' ? hexSizes : octSizes;
        polygon.size.innerHTML = '';
        sizes.forEach(S => {
            const data = getPolygonData(S, type);
            const opt = document.createElement('option');
            opt.value = S;
            opt.textContent = `${S} мм (сеч. ${data.A.toFixed(2)} см²)`;
            polygon.size.appendChild(opt);
        });
    }
    polygon.type.addEventListener('change', populatePolygonSize);
    populatePolygonSize();

    function populateRifleThickness() {
        const type = rifle.type.value;
        const thicknesses = rifleData[type];
        rifle.thickness.innerHTML = '';
        thicknesses.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.t} мм (масса 1м² ≈ ${item.m2} кг)`;
            rifle.thickness.appendChild(opt);
        });
    }
    rifle.type.addEventListener('change', populateRifleThickness);
    populateRifleThickness();

    (function populateMesh() {
        mesh.diameter.innerHTML = '';
        meshDiameters.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = `${d} мм`;
            mesh.diameter.appendChild(opt);
        });
        mesh.step.innerHTML = '';
        meshSteps.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = `${s} мм`;
            mesh.step.appendChild(opt);
        });
    })();

    function populateSqPipeGost() {
        sqPipe.gostProfile.innerHTML = '';
        sqPipeGostData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            sqPipe.gostProfile.appendChild(opt);
        });
    }
    populateSqPipeGost();
    sqPipe.mode.addEventListener('change', () => {
        const isManual = sqPipe.mode.value === 'manual';
        sqPipe.manualInputs.style.display = isManual ? 'block' : 'none';
        sqPipe.gostInputs.style.display = isManual ? 'none' : 'block';
    });

    (function populateRail() {
        rail.profile.innerHTML = '';
        railData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            rail.profile.appendChild(opt);
        });
    })();

    (function populatePiles() {
        piles.profile.innerHTML = '';
        pilesData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            piles.profile.appendChild(opt);
        });
    })();

    (function populateCProfile() {
        cprofile.profile.innerHTML = '';
        cprofileData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            cprofile.profile.appendChild(opt);
        });
    })();

    (function populateZet() {
        zet.profile.innerHTML = '';
        zetData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            zet.profile.appendChild(opt);
        });
    })();

    (function populateTavr() {
        tavr.profile.innerHTML = '';
        tavrData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            tavr.profile.appendChild(opt);
        });
    })();

    (function populateFut() {
        fut.profile.innerHTML = '';
        futData.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (сеч. ${item.A} см²)`;
            fut.profile.appendChild(opt);
        });
    })();

    (function populatePvl() {
        pvl.thickness.innerHTML = '';
        pvlThicknesses.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = `${t} мм`;
            pvl.thickness.appendChild(opt);
        });
        pvl.pitch.innerHTML = '';
        pvlPitches.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = `${p} мм`;
            pvl.pitch.appendChild(opt);
        });
    })();

    // Заполнение для арматурного каркаса
    function populateRebarSelect(selectId) {
        const select = document.getElementById(selectId);
        select.innerHTML = '';
        rebarDiaList.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = `${d} мм (${rebarMassMap[d]} кг/м)`;
            select.appendChild(opt);
        });
    }
    populateRebarSelect('rfLongDia');
    populateRebarSelect('rfTransDia');
    populateRebarSelect('sfLongDia');
    populateRebarSelect('sfTransDia');

    // ---------- Утилиты ----------
    function formatNumber(value, dec = 4) { if (value === 0) return "0"; return parseFloat(value.toFixed(dec)).toString(); }
    function getDensity(select) { return parseFloat(select.value); }
    function getPipeMode() { for (const r of pipe.radios) if (r.checked) return r.value; return 'diameter'; }

    // ---------- Переключение вкладок ----------
    function switchTab(key) {
        Object.keys(tabs).forEach(k => {
            tabs[k].classList.remove('active');
            sections[k].classList.remove('active');
        });
        tabs[key].classList.add('active');
        sections[key].classList.add('active');
    }
    tabs.plate.addEventListener('click', () => switchTab('plate'));
    tabs.pipe.addEventListener('click', () => switchTab('pipe'));
    tabs.squarePipe.addEventListener('click', () => switchTab('squarePipe'));
    tabs.angle.addEventListener('click', () => switchTab('angle'));
    tabs.channel.addEventListener('click', () => switchTab('channel'));
    tabs.beam.addEventListener('click', () => switchTab('beam'));
    tabs.rebar.addEventListener('click', () => switchTab('rebar'));
    tabs.square.addEventListener('click', () => switchTab('square'));
    tabs.strip.addEventListener('click', () => switchTab('strip'));
    tabs.round.addEventListener('click', () => switchTab('round'));
    tabs.polygon.addEventListener('click', () => switchTab('polygon'));
    tabs.rifle.addEventListener('click', () => switchTab('rifle'));
    tabs.mesh.addEventListener('click', () => switchTab('mesh'));
    tabs.rebarFrame.addEventListener('click', () => switchTab('rebarFrame'));
    tabs.rail.addEventListener('click', () => switchTab('rail'));
    tabs.piles.addEventListener('click', () => switchTab('piles'));
    tabs.cprofile.addEventListener('click', () => switchTab('cprofile'));
    tabs.zet.addEventListener('click', () => switchTab('zet'));
    tabs.tavr.addEventListener('click', () => switchTab('tavr'));
    tabs.fut.addEventListener('click', () => switchTab('fut'));
    tabs.pvl.addEventListener('click', () => switchTab('pvl'));
    tabs.weight.addEventListener('click', () => switchTab('weight'));

    [...pipe.radios].forEach(r => r.addEventListener('change', () => {
        pipe.label.textContent = (r.value === 'diameter') ? '🔵 Внешний диаметр, мм' : '🔄 Внешняя окружность, мм';
    }));

    // ---------- Расчёты металлов ----------
    plate.btn.addEventListener('click', () => {
        const L = +plate.length.value, W = +plate.width.value, S = +plate.thickness.value, dens = getDensity(plate.material);
        if ([L, W, S, dens].some(v => isNaN(v) || v <= 0)) return;
        const Lm = L / 1000, Wm = W / 1000, Sm = S / 1000;
        const area = Lm * Wm, diag = Math.sqrt(L * L + W * W), vol = area * Sm, weight = vol * dens;
        const section = (S / 10) * (W / 10);
        plate.area.innerHTML = `${formatNumber(area, 6)} <small>м²</small>`;
        plate.diag.innerHTML = `${formatNumber(diag, 2)} <small>мм</small>`;
        plate.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        plate.section.innerHTML = `${formatNumber(section, 2)} <small>см²</small>`;
        plate.totalVol.textContent = formatNumber(vol, 6);
        const third = vol / 3;
        plate.vol1.textContent = formatNumber(third, 6);
        plate.vol2.textContent = formatNumber(third * 2, 6);
        plate.vol3.textContent = formatNumber(vol, 6);
        addHistory('Пластина', { вес: weight, площадь: area, сечение: section });
    });

    pipe.btn.addEventListener('click', () => {
        const L = +pipe.length.value, wall = +pipe.thickness.value, dimIn = +pipe.dimension.value, dens = getDensity(pipe.material);
        const mode = getPipeMode();
        if ([L, wall, dimIn, dens].some(v => isNaN(v) || v <= 0)) return;
        let outerD = (mode === 'diameter') ? dimIn : dimIn / Math.PI;
        const innerD = outerD - 2 * wall;
        if (innerD <= 0) { pipe.weight.innerHTML = '⚠️ <small>стенка > радиуса</small>'; return; }
        const Lm = L / 1000, outerDm = outerD / 1000, innerDm = innerD / 1000;
        const vol = (Math.PI / 4) * (outerDm * outerDm - innerDm * innerDm) * Lm;
        const weight = vol * dens;
        const outerC = Math.PI * outerD, innerC = Math.PI * innerD;
        const outSurf = Math.PI * outerDm * Lm, inSurf = Math.PI * innerDm * Lm;
        const section = (Math.PI / 4) * (outerD * outerD - innerD * innerD) / 100;
        pipe.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        pipe.outerDia.innerHTML = `${formatNumber(outerD, 2)} <small>мм</small>`;
        pipe.innerDia.innerHTML = `${formatNumber(innerD, 2)} <small>мм</small>`;
        pipe.outerCirc.innerHTML = `${formatNumber(outerC, 2)} <small>мм</small>`;
        pipe.innerCirc.innerHTML = `${formatNumber(innerC, 2)} <small>мм</small>`;
        pipe.outerArea.innerHTML = `${formatNumber(outSurf, 4)} <small>м²</small>`;
        pipe.innerArea.innerHTML = `${formatNumber(inSurf, 4)} <small>м²</small>`;
        pipe.section.innerHTML = `${formatNumber(section, 2)} <small>см²</small>`;
        addHistory('Труба', { вес: weight, внешний_диаметр: outerD, внутренний_диаметр: innerD });
    });

    sqPipe.btn.addEventListener('click', () => {
        const dens = getDensity(sqPipe.material);
        let A, B, wall, L;
        if (sqPipe.mode.value === 'manual') {
            L = +sqPipe.length.value;
            A = +sqPipe.sideA.value;
            B = +sqPipe.sideB.value;
            wall = +sqPipe.thickness.value;
        } else {
            L = +sqPipe.gostLength.value;
            const profile = sqPipeGostData[parseInt(sqPipe.gostProfile.value)];
            if (!profile) return;
            A = profile.h;
            B = profile.b;
            wall = profile.s;
        }
        if ([L, A, B, wall, dens].some(v => isNaN(v) || v <= 0)) return;
        const innerA = A - 2 * wall, innerB = B - 2 * wall;
        if (innerA <= 0 || innerB <= 0) {
            sqPipe.weight.innerHTML = '⚠️ <small>стенка слишком толстая</small>';
            return;
        }
        const Lm = L / 1000, Am = A / 1000, Bm = B / 1000, iAm = innerA / 1000, iBm = innerB / 1000;
        const areaMetal = Am * Bm - iAm * iBm;
        const weight = areaMetal * Lm * dens;
        const diag = Math.sqrt(A * A + B * B);
        const outSurf = 2 * (Am + Bm) * Lm, inSurf = 2 * (iAm + iBm) * Lm;
        const section = (A * B - innerA * innerB) / 100;
        sqPipe.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        sqPipe.diag.innerHTML = `${formatNumber(diag, 2)} <small>мм</small>`;
        sqPipe.outerArea.innerHTML = `${formatNumber(outSurf, 4)} <small>м²</small>`;
        sqPipe.innerArea.innerHTML = `${formatNumber(inSurf, 4)} <small>м²</small>`;
        sqPipe.section.innerHTML = `${formatNumber(section, 2)} <small>см²</small>`;
        addHistory('Профтруба', { вес: weight, сечение: section });
    });

    angle.btn.addEventListener('click', () => {
        const L = +angle.length.value, dens = getDensity(angle.material);
        const profile = angleData[angle.type.value][parseInt(angle.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        angle.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        angle.section.innerHTML = `${profile.A} <small>см²</small>`;
        angle.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Уголок', { вес: weight, сечение: profile.A });
    });

    channel.btn.addEventListener('click', () => {
        const L = +channel.length.value;
        const dens = getDensity(channel.material);
        const profiles = channelData[channel.type.value];
        const profile = profiles[parseInt(channel.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        channel.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        channel.section.innerHTML = `${profile.A} <small>см²</small>`;
        channel.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Швеллер', { вес: weight, сечение: profile.A });
    });

    beam.btn.addEventListener('click', () => {
        const L = +beam.length.value;
        const dens = getDensity(beam.material);
        const profiles = (beam.type.value === 'gost8239') ? beamData.gost8239 :
                         (beam.type.value === 'gost26020Sh') ? beamData.gost26020Sh :
                         beamData.gost26020K;
        const profile = profiles[parseInt(beam.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        beam.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        beam.section.innerHTML = `${profile.A} <small>см²</small>`;
        beam.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Двутавр', { вес: weight, сечение: profile.A });
    });

    rebar.btn.addEventListener('click', () => {
        const L = +rebar.length.value, dens = getDensity(rebar.material);
        const profile = rebarData[parseInt(rebar.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = Math.PI * (profile.d / 1000) * Lm;
        rebar.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        rebar.section.innerHTML = `${profile.A} <small>см²</small>`;
        rebar.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Арматура', { вес: weight, сечение: profile.A });
    });

    square.btn.addEventListener('click', () => {
        const L = +square.length.value;
        const a = +square.side.value;
        const dens = getDensity(square.material);
        if ([L, a, dens].some(v => isNaN(v) || v <= 0)) return;
        const Lm = L / 1000;
        const am = a / 1000;
        const areaM2 = am * am;
        const volume = areaM2 * Lm;
        const weight = volume * dens;
        const sectionCm2 = (a * a) / 100;
        const surface = 4 * am * Lm;
        square.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        square.section.innerHTML = `${formatNumber(sectionCm2, 2)} <small>см²</small>`;
        square.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Квадрат', { вес: weight, сечение: sectionCm2 });
    });

    strip.btn.addEventListener('click', () => {
        const L = +strip.length.value;
        const w = +strip.width.value;
        const t = +strip.thickness.value;
        const dens = getDensity(strip.material);
        if ([L, w, t, dens].some(v => isNaN(v) || v <= 0)) return;
        const Lm = L / 1000;
        const wm = w / 1000;
        const tm = t / 1000;
        const areaM2 = wm * tm;
        const volume = areaM2 * Lm;
        const weight = volume * dens;
        const sectionCm2 = (w * t) / 100;
        const perimeter = 2 * (wm + tm);
        const surface = perimeter * Lm;
        strip.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        strip.section.innerHTML = `${formatNumber(sectionCm2, 2)} <small>см²</small>`;
        strip.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Полоса', { вес: weight, сечение: sectionCm2 });
    });

    round.btn.addEventListener('click', () => {
        const L = +round.length.value;
        const profile = roundData[parseInt(round.diameter.value)];
        const dens = getDensity(round.material);
        if (isNaN(L) || L <= 0 || !profile || isNaN(dens)) return;
        const Lm = L / 1000;
        const dm = profile.d / 1000;
        const areaM2 = (Math.PI * dm * dm) / 4;
        const volume = areaM2 * Lm;
        const weight = volume * dens;
        const sectionCm2 = profile.A;
        const surface = Math.PI * dm * Lm;
        round.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        round.section.innerHTML = `${profile.A} <small>см²</small>`;
        round.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Круг', { вес: weight, сечение: sectionCm2 });
    });

    polygon.btn.addEventListener('click', () => {
        const L = +polygon.length.value;
        const S = +polygon.size.value;
        const type = polygon.type.value;
        const dens = getDensity(polygon.material);
        if ([L, S, dens].some(v => isNaN(v) || v <= 0)) return;
        const Lm = L / 1000;
        const data = getPolygonData(S, type);
        const areaM2 = data.A / 10000;
        const volume = areaM2 * Lm;
        const weight = volume * dens;
        const surface = data.perimeter * Lm;
        polygon.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        polygon.section.innerHTML = `${data.A.toFixed(2)} <small>см²</small>`;
        polygon.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Многогранник', { вес: weight, сечение: data.A });
    });

    rifle.btn.addEventListener('click', () => {
        const type = rifle.type.value;
        const thickIdx = parseInt(rifle.thickness.value);
        const width = +rifle.width.value;
        const length = +rifle.length.value;
        const dens = getDensity(rifle.material);
        if (isNaN(thickIdx) || isNaN(width) || isNaN(length) || width <= 0 || length <= 0) return;
        const thicknessItem = rifleData[type][thickIdx];
        if (!thicknessItem) return;
        const areaM2 = (width / 1000) * (length / 1000);
        const weightStd = thicknessItem.m2 * areaM2;
        const weight = weightStd * (dens / 7850);
        rifle.area.innerHTML = `${formatNumber(areaM2, 4)} <small>м²</small>`;
        rifle.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        addHistory('Лист рифлёный', { вес: weight, площадь: areaM2 });
    });

    mesh.btn.addEventListener('click', () => {
        const d = +mesh.diameter.value;
        const step = +mesh.step.value;
        const width = +mesh.width.value;
        const length = +mesh.length.value;
        const dens = getDensity(mesh.material);
        if ([d, step, width, length, dens].some(v => isNaN(v) || v <= 0)) return;
        if (step <= d) { mesh.weight.innerHTML = '⚠️ <small>шаг меньше диаметра</small>'; return; }
        const countWidth = Math.ceil((length / step) + 1);
        const countLength = Math.ceil((width / step) + 1);
        const totalLengthM = (countWidth * (width / 1000) + countLength * (length / 1000));
        const areaCm2 = (Math.PI * d * d) / 400;
        const volume = totalLengthM * (areaCm2 / 10000);
        const weight = volume * dens;
        const area = (width / 1000) * (length / 1000);
        const totalSection = (countWidth + countLength) * areaCm2;
        mesh.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        mesh.section.innerHTML = `${formatNumber(totalSection, 2)} <small>см²</small>`;
        mesh.area.innerHTML = `${formatNumber(area, 4)} <small>м²</small>`;
        addHistory('Сетка арматурная', { вес: weight, площадь: area });
    });

    // ---------- Арматурный каркас ----------
    rf.type.addEventListener('change', () => {
        if (rf.type.value === 'rect') {
            rf.rectInputs.style.display = 'block';
            rf.roundInputs.style.display = 'none';
        } else {
            rf.rectInputs.style.display = 'none';
            rf.roundInputs.style.display = 'block';
        }
    });

    rf.btn.addEventListener('click', () => {
        const type = rf.type.value;
        const L = +rf.length.value;
        const longCount = +rf.longCount.value;
        const longDia = +rf.longDia.value;
        const transStep = +rf.transStep.value;
        const transDia = +rf.transDia.value;
        const lapLength = +rf.lapLength.value;
        const dens = getDensity(rf.material);

        let width, height, diameter;
        if (type === 'rect') {
            width = +rf.width.value;
            height = +rf.height.value;
            if ([L, width, height, longCount, transStep].some(v => isNaN(v) || v <= 0)) return;
            diameter = null;
        } else {
            diameter = +rf.diameter.value;
            if ([L, diameter, longCount, transStep].some(v => isNaN(v) || v <= 0)) return;
            width = height = null;
        }

        const massLong = rebarMassMap[longDia] || 0;
        const massTrans = rebarMassMap[transDia] || 0;

        const longLengthPerBar = (L + lapLength) / 1000;
        const totalLongLength = longCount * longLengthPerBar;
        const longWeight = totalLongLength * massLong;

        let perimeter;
        if (type === 'rect') {
            perimeter = 2 * (width + height);
        } else {
            perimeter = Math.PI * diameter;
        }

        const transCount = Math.ceil(L / transStep) + 1;
        let transPerim;
        if (type === 'rect') {
            transPerim = perimeter + 2 * transDia;
        } else {
            transPerim = perimeter;
        }
        const transLengthPerItem = transPerim / 1000;
        const totalTransLength = transCount * transLengthPerItem;
        const transWeight = totalTransLength * massTrans;

        const totalWeight = longWeight + transWeight;
        const totalLength = totalLongLength + totalTransLength;

        const surfaceArea = (type === 'rect')
            ? 2 * (width + height) * L / 1e6
            : Math.PI * diameter * L / 1e6;

        rf.longWeight.innerHTML = `${formatNumber(longWeight, 2)} <small>кг</small>`;
        rf.transWeight.innerHTML = `${formatNumber(transWeight, 2)} <small>кг</small>`;
        rf.totalWeight.innerHTML = `${formatNumber(totalWeight, 2)} <small>кг</small>`;
        rf.totalLength.innerHTML = `${formatNumber(totalLength, 2)} <small>м</small>`;
        rf.surface.innerHTML = `${formatNumber(surfaceArea, 4)} <small>м²</small>`;

        addHistory('Арматурный каркас', { вес_общий: totalWeight, вес_продольный: longWeight, вес_поперечный: transWeight });
    });

    rail.btn.addEventListener('click', () => {
        const L = +rail.length.value;
        const dens = getDensity(rail.material);
        const profile = railData[parseInt(rail.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        rail.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        rail.section.innerHTML = `${profile.A} <small>см²</small>`;
        rail.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Рельс', { вес: weight, сечение: profile.A });
    });

    piles.btn.addEventListener('click', () => {
        const L = +piles.length.value;
        const dens = getDensity(piles.material);
        const profile = pilesData[parseInt(piles.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        piles.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        piles.section.innerHTML = `${profile.A} <small>см²</small>`;
        piles.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Шпунт', { вес: weight, сечение: profile.A });
    });

    cprofile.btn.addEventListener('click', () => {
        const L = +cprofile.length.value;
        const dens = getDensity(cprofile.material);
        const profile = cprofileData[parseInt(cprofile.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        cprofile.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        cprofile.section.innerHTML = `${profile.A} <small>см²</small>`;
        cprofile.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('С-образный', { вес: weight, сечение: profile.A });
    });

    zet.btn.addEventListener('click', () => {
        const L = +zet.length.value;
        const dens = getDensity(zet.material);
        const profile = zetData[parseInt(zet.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        zet.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        zet.section.innerHTML = `${profile.A} <small>см²</small>`;
        zet.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Зет', { вес: weight, сечение: profile.A });
    });

    tavr.btn.addEventListener('click', () => {
        const L = +tavr.length.value;
        const dens = getDensity(tavr.material);
        const profile = tavrData[parseInt(tavr.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        tavr.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        tavr.section.innerHTML = `${profile.A} <small>см²</small>`;
        tavr.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Тавр', { вес: weight, сечение: profile.A });
    });

    fut.btn.addEventListener('click', () => {
        const L = +fut.length.value;
        const dens = getDensity(fut.material);
        const profile = futData[parseInt(fut.profile.value)];
        if (isNaN(L) || L <= 0 || !profile) return;
        const Lm = L / 1000;
        const weight = (profile.A / 10000) * dens * Lm;
        const surface = profile.S * Lm;
        fut.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        fut.section.innerHTML = `${profile.A} <small>см²</small>`;
        fut.surface.innerHTML = `${formatNumber(surface, 4)} <small>м²</small>`;
        addHistory('Футеровка', { вес: weight, сечение: profile.A });
    });

    pvl.btn.addEventListener('click', () => {
        const t = +pvl.thickness.value;
        const pitch = +pvl.pitch.value;
        const width = +pvl.width.value;
        const length = +pvl.length.value;
        const dens = getDensity(pvl.material);
        if ([t, pitch, width, length, dens].some(v => isNaN(v) || v <= 0)) return;
        const areaM2 = (width / 1000) * (length / 1000);
        const volume = areaM2 * (t / 1000) * pvlAreaFactor;
        const weight = volume * dens;
        pvl.area.innerHTML = `${formatNumber(areaM2, 4)} <small>м²</small>`;
        pvl.weight.innerHTML = `${formatNumber(weight, 3)} <small>кг</small>`;
        addHistory('Лист ПВЛ', { вес: weight, площадь: areaM2 });
    });

    // ==================== РАСЧЁТ ПО ВЕСУ (новая вкладка) ====================
    const weightType = document.getElementById('weightType');
    const weightInput = document.getElementById('weightInput');
    const weightParams = document.getElementById('weightParams');
    const weightMaterial = document.getElementById('weightMaterial');
    const weightCalculate = document.getElementById('weightCalculate');
    const weightLength = document.getElementById('weightLength');
    const weightPerMeter = document.getElementById('weightPerMeter');

    // Функция для обновления полей параметров в зависимости от типа профиля
    function updateWeightParams() {
        const type = weightType.value;
        let html = '';
        switch (type) {
            case 'rebar':
                html += `<div class="input-group"><label>📐 Диаметр, мм</label><select id="wRebarDia">`;
                rebarDiaList.forEach(d => {
                    html += `<option value="${d}">${d} мм</option>`;
                });
                html += `</select></div>`;
                break;
            case 'angle':
                html += `<div class="input-group"><label>📐 Тип уголка</label><select id="wAngleType">
                    <option value="equal">Равнополочный</option>
                    <option value="unequal">Неравнополочный</option>
                </select></div>`;
                html += `<div class="input-group"><label>📏 Профиль</label><select id="wAngleProfile"></select></div>`;
                break;
            case 'channel':
                html += `<div class="input-group"><label>📐 Тип швеллера</label><select id="wChannelType">
                    <option value="gost8240">Обычный (ГОСТ 8240-97)</option>
                    <option value="gost8240P">С параллельными полками</option>
                    <option value="gost8281">Гнутый неравнополочный</option>
                    <option value="gost8278">Гнутый равнополочный</option>
                </select></div>`;
                html += `<div class="input-group"><label>📏 Профиль</label><select id="wChannelProfile"></select></div>`;
                break;
            case 'beam':
                html += `<div class="input-group"><label>📐 Тип двутавра</label><select id="wBeamType">
                    <option value="gost8239">Обычный (ГОСТ 8239-89)</option>
                    <option value="gost26020Sh">Широкополочный</option>
                    <option value="gost26020K">Колонный</option>
                </select></div>`;
                html += `<div class="input-group"><label>📏 Профиль</label><select id="wBeamProfile"></select></div>`;
                break;
            case 'pipe':
                html += `<div class="input-group"><label>📏 Длина, мм</label><input type="number" id="wPipeLength" placeholder="1000"></div>`;
                html += `<div class="input-group"><label>📐 Внешний диаметр, мм</label><input type="number" id="wPipeDia" placeholder="100"></div>`;
                html += `<div class="input-group"><label>🧱 Толщина стенки, мм</label><input type="number" id="wPipeWall" placeholder="5"></div>`;
                break;
            case 'squarePipe':
                html += `<div class="input-group"><label>📐 Сторона А, мм</label><input type="number" id="wSqPipeA" placeholder="100"></div>`;
                html += `<div class="input-group"><label>📐 Сторона Б, мм</label><input type="number" id="wSqPipeB" placeholder="50"></div>`;
                html += `<div class="input-group"><label>🧱 Толщина стенки, мм</label><input type="number" id="wSqPipeWall" placeholder="5"></div>`;
                break;
            case 'square':
                html += `<div class="input-group"><label>📐 Сторона, мм</label><input type="number" id="wSquareSide" placeholder="50"></div>`;
                break;
            case 'strip':
                html += `<div class="input-group"><label>📐 Ширина, мм</label><input type="number" id="wStripWidth" placeholder="50"></div>`;
                html += `<div class="input-group"><label>🧱 Толщина, мм</label><input type="number" id="wStripThick" placeholder="5"></div>`;
                break;
            case 'round':
                html += `<div class="input-group"><label>📐 Диаметр, мм</label><select id="wRoundDia"></select></div>`;
                break;
            case 'polygon':
                html += `<div class="input-group"><label>🔶 Тип</label><select id="wPolyType">
                    <option value="hex">Шестигранник</option>
                    <option value="oct">Восьмигранник</option>
                </select></div>`;
                html += `<div class="input-group"><label>📐 Размер под ключ, мм</label><select id="wPolySize"></select></div>`;
                break;
            case 'rail':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wRailProfile"></select></div>`;
                break;
            case 'piles':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wPilesProfile"></select></div>`;
                break;
            case 'cprofile':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wCProfile"></select></div>`;
                break;
            case 'zet':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wZetProfile"></select></div>`;
                break;
            case 'tavr':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wTavrProfile"></select></div>`;
                break;
            case 'fut':
                html += `<div class="input-group"><label>📐 Профиль</label><select id="wFutProfile"></select></div>`;
                break;
            case 'pvl':
                html += `<div class="input-group"><label>📐 Толщина, мм</label><select id="wPvlThick"></select></div>`;
                html += `<div class="input-group"><label>📏 Подача, мм</label><select id="wPvlPitch"></select></div>`;
                html += `<div class="input-group"><label>📐 Ширина, мм</label><input type="number" id="wPvlWidth" value="1000"></div>`;
                break;
            case 'rifle':
                html += `<div class="input-group"><label>📐 Тип рифления</label><select id="wRifleType">
                    <option value="romb">Ромбическое</option>
                    <option value="chech">Чечевичное</option>
                </select></div>`;
                html += `<div class="input-group"><label>🧱 Толщина, мм</label><select id="wRifleThick"></select></div>`;
                html += `<div class="input-group"><label>📐 Ширина, мм</label><input type="number" id="wRifleWidth" value="1000"></div>`;
                break;
            case 'plate':
                html += `<div class="input-group"><label>📐 Ширина, мм</label><input type="number" id="wPlateWidth" value="500"></div>`;
                html += `<div class="input-group"><label>🧱 Толщина, мм</label><input type="number" id="wPlateThick" value="10"></div>`;
                break;
        }
        weightParams.innerHTML = html;

        // Заполнение селектов для конкретных типов
        if (type === 'angle') {
            const angleType = document.getElementById('wAngleType');
            populateAngleProfilesForWeight(angleType.value);
            angleType.addEventListener('change', function() {
                populateAngleProfilesForWeight(this.value);
            });
        } else if (type === 'channel') {
            const channelType = document.getElementById('wChannelType');
            populateChannelProfilesForWeight(channelType.value);
            channelType.addEventListener('change', function() {
                populateChannelProfilesForWeight(this.value);
            });
        } else if (type === 'beam') {
            const beamType = document.getElementById('wBeamType');
            populateBeamProfilesForWeight(beamType.value);
            beamType.addEventListener('change', function() {
                populateBeamProfilesForWeight(this.value);
            });
        } else if (type === 'round') {
            const select = document.getElementById('wRoundDia');
            select.innerHTML = '';
            roundData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${item.d} мм`;
                select.appendChild(opt);
            });
        } else if (type === 'polygon') {
            const polyType = document.getElementById('wPolyType');
            populatePolygonSizesForWeight(polyType.value);
            polyType.addEventListener('change', function() {
                populatePolygonSizesForWeight(this.value);
            });
        } else if (type === 'rail') {
            const select = document.getElementById('wRailProfile');
            select.innerHTML = '';
            railData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'piles') {
            const select = document.getElementById('wPilesProfile');
            select.innerHTML = '';
            pilesData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'cprofile') {
            const select = document.getElementById('wCProfile');
            select.innerHTML = '';
            cprofileData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'zet') {
            const select = document.getElementById('wZetProfile');
            select.innerHTML = '';
            zetData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'tavr') {
            const select = document.getElementById('wTavrProfile');
            select.innerHTML = '';
            tavrData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'fut') {
            const select = document.getElementById('wFutProfile');
            select.innerHTML = '';
            futData.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = item.name;
                select.appendChild(opt);
            });
        } else if (type === 'pvl') {
            const thickSelect = document.getElementById('wPvlThick');
            thickSelect.innerHTML = '';
            pvlThicknesses.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t;
                opt.textContent = `${t} мм`;
                thickSelect.appendChild(opt);
            });
            const pitchSelect = document.getElementById('wPvlPitch');
            pitchSelect.innerHTML = '';
            pvlPitches.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                opt.textContent = `${p} мм`;
                pitchSelect.appendChild(opt);
            });
        } else if (type === 'rifle') {
            const typeSelect = document.getElementById('wRifleType');
            populateRifleThicknessForWeight(typeSelect.value);
            typeSelect.addEventListener('change', function() {
                populateRifleThicknessForWeight(this.value);
            });
        }
    }

    // Вспомогательные функции для заполнения селектов
    function populateAngleProfilesForWeight(type) {
        const select = document.getElementById('wAngleProfile');
        select.innerHTML = '';
        angleData[type].forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (A=${item.A} см²)`;
            select.appendChild(opt);
        });
    }

    function populateChannelProfilesForWeight(type) {
        const select = document.getElementById('wChannelProfile');
        select.innerHTML = '';
        channelData[type].forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (A=${item.A} см²)`;
            select.appendChild(opt);
        });
    }

    function populateBeamProfilesForWeight(type) {
        const select = document.getElementById('wBeamProfile');
        select.innerHTML = '';
        let profiles;
        if (type === 'gost8239') profiles = beamData.gost8239;
        else if (type === 'gost26020Sh') profiles = beamData.gost26020Sh;
        else profiles = beamData.gost26020K;
        profiles.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.name} (A=${item.A} см²)`;
            select.appendChild(opt);
        });
    }

    function populatePolygonSizesForWeight(type) {
        const select = document.getElementById('wPolySize');
        select.innerHTML = '';
        const sizes = type === 'hex' ? hexSizes : octSizes;
        sizes.forEach(S => {
            const data = getPolygonData(S, type);
            const opt = document.createElement('option');
            opt.value = S;
            opt.textContent = `${S} мм (A=${data.A.toFixed(2)} см²)`;
            select.appendChild(opt);
        });
    }

    function populateRifleThicknessForWeight(type) {
        const select = document.getElementById('wRifleThick');
        select.innerHTML = '';
        rifleData[type].forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${item.t} мм (${item.m2} кг/м²)`;
            select.appendChild(opt);
        });
    }

    // Первоначальное заполнение
    updateWeightParams();
    weightType.addEventListener('change', updateWeightParams);

    // Логика расчёта
    weightCalculate.addEventListener('click', () => {
        const type = weightType.value;
        const weight = parseFloat(weightInput.value);
        const dens = parseFloat(weightMaterial.value);
        if (isNaN(weight) || weight <= 0) {
            alert('Введите корректный вес.');
            return;
        }

        let areaCm2 = 0;
        let lengthM = 0;
        let weightPerMeterVal = 0;

        switch (type) {
            case 'rebar': {
                const dia = parseInt(document.getElementById('wRebarDia').value);
                const area = Math.PI * dia * dia / 4 / 100; // см²
                areaCm2 = area;
                weightPerMeterVal = (area / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'angle': {
                const idx = parseInt(document.getElementById('wAngleProfile').value);
                const profile = angleData[document.getElementById('wAngleType').value][idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'channel': {
                const idx = parseInt(document.getElementById('wChannelProfile').value);
                const profile = channelData[document.getElementById('wChannelType').value][idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'beam': {
                const idx = parseInt(document.getElementById('wBeamProfile').value);
                const typeVal = document.getElementById('wBeamType').value;
                let profiles;
                if (typeVal === 'gost8239') profiles = beamData.gost8239;
                else if (typeVal === 'gost26020Sh') profiles = beamData.gost26020Sh;
                else profiles = beamData.gost26020K;
                const profile = profiles[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'pipe': {
                const dia = parseFloat(document.getElementById('wPipeDia').value);
                const wall = parseFloat(document.getElementById('wPipeWall').value);
                const outerDm = dia / 1000;
                const innerDm = (dia - 2 * wall) / 1000;
                const areaM2 = Math.PI / 4 * (outerDm * outerDm - innerDm * innerDm);
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'squarePipe': {
                const A = parseFloat(document.getElementById('wSqPipeA').value);
                const B = parseFloat(document.getElementById('wSqPipeB').value);
                const wall = parseFloat(document.getElementById('wSqPipeWall').value);
                const Am = A / 1000, Bm = B / 1000;
                const iAm = (A - 2 * wall) / 1000, iBm = (B - 2 * wall) / 1000;
                const areaM2 = Am * Bm - iAm * iBm;
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'square': {
                const side = parseFloat(document.getElementById('wSquareSide').value);
                const sideM = side / 1000;
                const areaM2 = sideM * sideM;
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'strip': {
                const width = parseFloat(document.getElementById('wStripWidth').value);
                const thick = parseFloat(document.getElementById('wStripThick').value);
                const areaM2 = (width / 1000) * (thick / 1000);
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'round': {
                const idx = parseInt(document.getElementById('wRoundDia').value);
                const profile = roundData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'polygon': {
                const S = parseFloat(document.getElementById('wPolySize').value);
                const polyType = document.getElementById('wPolyType').value;
                const data = getPolygonData(S, polyType);
                areaCm2 = data.A;
                weightPerMeterVal = (data.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'rail': {
                const idx = parseInt(document.getElementById('wRailProfile').value);
                const profile = railData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'piles': {
                const idx = parseInt(document.getElementById('wPilesProfile').value);
                const profile = pilesData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'cprofile': {
                const idx = parseInt(document.getElementById('wCProfile').value);
                const profile = cprofileData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'zet': {
                const idx = parseInt(document.getElementById('wZetProfile').value);
                const profile = zetData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'tavr': {
                const idx = parseInt(document.getElementById('wTavrProfile').value);
                const profile = tavrData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'fut': {
                const idx = parseInt(document.getElementById('wFutProfile').value);
                const profile = futData[idx];
                areaCm2 = profile.A;
                weightPerMeterVal = (profile.A / 10000) * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'pvl': {
                const thick = parseFloat(document.getElementById('wPvlThick').value);
                const width = parseFloat(document.getElementById('wPvlWidth').value);
                const areaM2 = (width / 1000) * (thick / 1000) * pvlAreaFactor;
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'rifle': {
                const typeRifle = document.getElementById('wRifleType').value;
                const thickIdx = parseInt(document.getElementById('wRifleThick').value);
                const width = parseFloat(document.getElementById('wRifleWidth').value);
                const thicknessItem = rifleData[typeRifle][thickIdx];
                const areaM2 = (width / 1000) * (1);
                const weightPerM2 = thicknessItem.m2 * (dens / 7850);
                weightPerMeterVal = weightPerM2 * (width / 1000);
                lengthM = weight / weightPerMeterVal;
                break;
            }
            case 'plate': {
                const width = parseFloat(document.getElementById('wPlateWidth').value);
                const thick = parseFloat(document.getElementById('wPlateThick').value);
                const areaM2 = (width / 1000) * (thick / 1000);
                areaCm2 = areaM2 * 10000;
                weightPerMeterVal = areaM2 * dens;
                lengthM = weight / weightPerMeterVal;
                break;
            }
        }

        weightLength.innerHTML = `${lengthM.toFixed(3)} <small>м</small>`;
        weightPerMeter.innerHTML = `${weightPerMeterVal.toFixed(3)} <small>кг/м</small>`;

        addHistory('Расчёт по весу', { тип: type, вес: weight, длина: lengthM });
    });

    // ==================== ЗЕМЛЯНЫЕ РАБОТЫ ====================
    const earthType = document.getElementById('earthType');
    const earthMeasureMode = document.getElementById('earthMeasureMode');
    const earthSoil = document.getElementById('earthSoil');
    const earthInputs = document.getElementById('earthInputs');
    const earthCalculateBtn = document.getElementById('earthCalculate');
    const earthVolume = document.getElementById('earthVolume');
    const earthMass = document.getElementById('earthMass');
    const earthBackfillCard = document.getElementById('earthBackfillCard');
    const earthBackfill = document.getElementById('earthBackfill');
    const earthExtra1 = document.getElementById('earthExtra1');
    const earthGridExtra = document.getElementById('earthGridExtra');
    const drainGravelCard = document.getElementById('drainGravelCard');
    const drainGravel = document.getElementById('drainGravel');
    const drainSandCard = document.getElementById('drainSandCard');
    const drainSand = document.getElementById('drainSand');
    const drainSlopeCard = document.getElementById('drainSlopeCard');
    const drainSlopeArea = document.getElementById('drainSlopeArea');

    function getSoilDensity() { return parseFloat(earthSoil.value); }

    function renderEarthInputs() {
        const type = earthType.value;
        const mode = earthMeasureMode.value;
        let html = '';

        if (mode === 'manual') {
            if (type === 'trench' || type === 'excavation' || type === 'drain') {
                const isDrain = type === 'drain';
                html += `<div class="dimension-row">
                    <div class="input-group"><label>📏 Длина, м</label><input type="number" id="manLength" value="${isDrain?30:20}" step="any" min="0.01"></div>
                    <div class="input-group"><label>📐 Ширина дна, м</label><input type="number" id="manWidth" value="${isDrain?0.6:0.8}" step="any" min="0.01"></div>
                </div>
                <div class="dimension-row">
                    <div class="input-group"><label>📏 Глубина начала, м</label><input type="number" id="manDepth1" value="${isDrain?1.5:0.5}" step="any" min="0.01"></div>
                    <div class="input-group"><label>📏 Глубина конца, м</label><input type="number" id="manDepth2" value="${isDrain?2.0:1.5}" step="any" min="0.01"></div>
                </div>
                <div class="dimension-row">
                    <div class="input-group"><label>📐 Угол откоса, ° (0 = вертикально)</label><input type="number" id="manSlopeAngle" value="0" step="any" min="0" max="90"></div>
                    ${isDrain ? `
                    <div class="input-group"><label>🪨 Толщина щебня, м</label><input type="number" id="drainGravelThick" value="0.2" step="0.01" min="0"></div>
                    <div class="input-group"><label>🏖️ Толщина песка, м</label><input type="number" id="drainSandThick" value="0.1" step="0.01" min="0"></div>
                    ` : ''}
                </div>
                <div class="input-group"><label>🏗️ Объём конструкций (вычет), м³</label><input type="number" id="manConstruct" value="0" step="any" min="0"></div>`;
            } else if (type === 'pile') {
                html += `<div class="dimension-row">
                    <div class="input-group"><label>📏 Высота, м</label><input type="number" id="manHeight" value="3" step="any" min="0.01"></div>
                    <div class="input-group"><label>📐 Диаметр основания, м</label><input type="number" id="manDiameter" value="5" step="any" min="0.01"></div>
                </div>`;
            } else if (type === 'leveling') {
                html += `<div class="dimension-row">
                    <div class="input-group"><label>📏 Длина площадки, м</label><input type="number" id="manLength" value="20" step="any" min="0.01"></div>
                    <div class="input-group"><label>📐 Ширина, м</label><input type="number" id="manWidth" value="10" step="any" min="0.01"></div>
                </div>
                <p>Отметки углов (м):</p>
                <div class="dimension-row">
                    <div class="input-group"><label>Z1 (лев.верх)</label><input type="number" id="manZ1" value="100" step="any"></div>
                    <div class="input-group"><label>Z2 (пр.верх)</label><input type="number" id="manZ2" value="101" step="any"></div>
                    <div class="input-group"><label>Z3 (лев.низ)</label><input type="number" id="manZ3" value="99" step="any"></div>
                    <div class="input-group"><label>Z4 (пр.низ)</label><input type="number" id="manZ4" value="100.5" step="any"></div>
                </div>
                <div class="input-group"><label>🎯 Проектная отметка, м</label><input type="number" id="manTarget" value="100" step="any"></div>`;
            }
        } else if (mode === 'points') {
            html += `<div class="points-block">
                <div class="points-header"><span>Точки (X, Y, Z)</span><button type="button" id="addPointBtn" class="calc-btn">➕ Добавить</button></div>
                <div class="points-table-header"><span>№</span><span>X (м)</span><span>Y (м)</span><span>Z (м)</span><span></span></div>
                <div id="earthPointsContainer"></div>
            </div>`;
            if (type === 'trench' || type === 'drain') html += `<p>Нужно 2 точки (начало и конец оси)</p>`;
            if (type === 'excavation' || type === 'trench' || type === 'drain') {
                html += `<div class="input-group"><label>🏗️ Объём конструкций (вычет), м³</label><input type="number" id="ptsConstruct" value="0" step="any" min="0"></div>`;
            }
            if (type === 'leveling') {
                html += `<div class="input-group"><label>🎯 Проектная отметка, м</label><input type="number" id="ptsTarget" value="100" step="any"></div>`;
            }
        } else if (mode === 'grid') {
            html += `<div class="dimension-row">
                <div class="input-group"><label>📏 Длина площадки, м</label><input type="number" id="gridLength" value="30" step="any" min="0.1"></div>
                <div class="input-group"><label>📐 Ширина площадки, м</label><input type="number" id="gridWidth" value="30" step="any" min="0.1"></div>
            </div>
            <div class="dimension-row">
                <div class="input-group"><label>📏 Размер квадрата, м</label><input type="number" id="gridStep" value="10" step="any" min="0.5"></div>
                <div class="input-group"><label>🎯 Проектная отметка, м</label><input type="number" id="gridTarget" value="100" step="any"></div>
            </div>
            <div id="gridTableContainer"></div>`;
        }

        earthInputs.innerHTML = html;

        if (mode === 'grid') {
            generateGridTable();
        }

        if (mode === 'points') {
            const container = document.getElementById('earthPointsContainer');
            let pointCounter = 0;
            function addPointRow(x='', y='', z='') {
                pointCounter++;
                const row = document.createElement('div');
                row.className = 'point-row';
                row.innerHTML = `
                    <span>${pointCounter}</span>
                    <input type="number" class="pt-x" value="${x}" step="any">
                    <input type="number" class="pt-y" value="${y}" step="any">
                    <input type="number" class="pt-z" value="${z}" step="any">
                    <button class="del-point">🗑</button>
                `;
                container.appendChild(row);
                row.querySelector('.del-point').addEventListener('click', () => { row.remove(); updateNumbers(); });
            }
            function updateNumbers() {
                const rows = container.querySelectorAll('.point-row');
                pointCounter = 0;
                rows.forEach(r => { pointCounter++; r.querySelector('span').textContent = pointCounter; });
            }
            document.getElementById('addPointBtn').addEventListener('click', () => addPointRow());
            if (type === 'trench' || type === 'drain') { addPointRow(0,0,0.5); addPointRow(20,0,1.5); }
            else if (type === 'excavation') { addPointRow(0,0,2); addPointRow(10,0,2); addPointRow(10,5,2); addPointRow(0,5,2); }
            else if (type === 'pile') { addPointRow(0,0,3); addPointRow(5,0,2.5); addPointRow(2.5,5,3.5); }
            else if (type === 'leveling') { addPointRow(0,0,100); addPointRow(20,0,101); addPointRow(20,10,99); addPointRow(0,10,100.5); }
        }
    }

    function generateGridTable() {
        const container = document.getElementById('gridTableContainer');
        if (!container) return;
        const L = parseFloat(document.getElementById('gridLength')?.value) || 30;
        const W = parseFloat(document.getElementById('gridWidth')?.value) || 30;
        const step = parseFloat(document.getElementById('gridStep')?.value) || 10;
        if (L <= 0 || W <= 0 || step <= 0) return;

        const cols = Math.round(L / step) + 1;
        const rows = Math.round(W / step) + 1;

        let tableHtml = `<div style="overflow-x:auto; margin-top:0.5rem;"><table style="border-collapse:collapse; width:100%;">
            <tr><th style="padding:0.3rem; border:1px solid #ccc;">Y \\ X</th>`;
        for (let i = 0; i < cols; i++) {
            tableHtml += `<th style="padding:0.3rem; border:1px solid #ccc;">X${i+1} (${(i*step).toFixed(1)} м)</th>`;
        }
        tableHtml += `</tr>`;
        for (let j = 0; j < rows; j++) {
            tableHtml += `<tr><td style="padding:0.3rem; border:1px solid #ccc;">Y${j+1} (${(j*step).toFixed(1)} м)</td>`;
            for (let i = 0; i < cols; i++) {
                tableHtml += `<td style="padding:0.3rem; border:1px solid #ccc;">
                    <input type="number" class="grid-cell" data-row="${j}" data-col="${i}" value="${(100 + (i+j)*0.5).toFixed(2)}" step="0.01" style="width:60px;">
                </td>`;
            }
            tableHtml += `</tr>`;
        }
        tableHtml += `</table></div>`;
        container.innerHTML = tableHtml;
    }

    earthType.addEventListener('change', renderEarthInputs);
    earthMeasureMode.addEventListener('change', renderEarthInputs);
    document.addEventListener('change', function(e) {
        if (e.target.id === 'gridLength' || e.target.id === 'gridWidth' || e.target.id === 'gridStep') {
            if (earthMeasureMode.value === 'grid') generateGridTable();
        }
    });
    renderEarthInputs();

    function polygonArea(points) {
        let area = 0; const n = points.length;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += points[i].x * points[j].y - points[j].x * points[i].y;
        }
        return Math.abs(area) / 2;
    }

    earthCalculateBtn.addEventListener('click', () => {
        const type = earthType.value;
        const mode = earthMeasureMode.value;
        const density = getSoilDensity();
        let volume = 0, mass = 0, construct = 0, backfill = null;
        let cutVolume = 0, fillVolume = 0;
        let gravelVolume = 0, sandVolume = 0, slopeArea = 0;

        earthExtra1.style.display = 'none';
        earthBackfillCard.style.display = 'none';
        earthGridExtra.style.display = 'none';
        drainGravelCard.style.display = 'none';
        drainSandCard.style.display = 'none';
        drainSlopeCard.style.display = 'none';

        if (mode === 'manual') {
            if (type === 'trench' || type === 'excavation' || type === 'drain') {
                const L = parseFloat(document.getElementById('manLength')?.value);
                const W = parseFloat(document.getElementById('manWidth')?.value);
                const d1 = parseFloat(document.getElementById('manDepth1')?.value);
                const d2 = parseFloat(document.getElementById('manDepth2')?.value);
                const slopeAngle = parseFloat(document.getElementById('manSlopeAngle')?.value) || 0;
                construct = parseFloat(document.getElementById('manConstruct')?.value) || 0;
                if ([L, W, d1, d2].some(isNaN)) return;
                const avgDepth = (d1 + d2) / 2;

                if (slopeAngle > 0) {
                    const slopeRad = slopeAngle * Math.PI / 180;
                    const m = 1 / Math.tan(slopeRad);
                    if (type === 'trench' || type === 'drain') {
                        const S1 = L * W;
                        const S2 = L * (W + 2 * avgDepth * m);
                        volume = avgDepth / 3 * (S1 + S2 + Math.sqrt(S1 * S2));
                        slopeArea = 2 * L * avgDepth * Math.sqrt(1 + m * m);
                    } else {
                        const S1 = L * W;
                        const Ltop = L + 2 * avgDepth * m;
                        const Wtop = W + 2 * avgDepth * m;
                        const S2 = Ltop * Wtop;
                        volume = avgDepth / 3 * (S1 + S2 + Math.sqrt(S1 * S2));
                        slopeArea = 2 * (L + W) * avgDepth * Math.sqrt(1 + m * m);
                    }
                } else {
                    volume = L * W * avgDepth;
                    slopeArea = 0;
                }
                backfill = volume - construct;

                if (type === 'drain') {
                    const gravelThick = parseFloat(document.getElementById('drainGravelThick')?.value) || 0;
                    const sandThick = parseFloat(document.getElementById('drainSandThick')?.value) || 0;
                    let widthAtTop = W;
                    if (slopeAngle > 0) {
                        const slopeRad = slopeAngle * Math.PI / 180;
                        const m = 1 / Math.tan(slopeRad);
                        widthAtTop = W + 2 * (gravelThick + sandThick) * m;
                    }
                    const gravelArea = (W + widthAtTop) / 2 * gravelThick;
                    gravelVolume = gravelArea * L;
                    const sandWidthTop = W + 2 * gravelThick * (slopeAngle > 0 ? m : 0);
                    const sandArea = (W + sandWidthTop) / 2 * sandThick;
                    sandVolume = sandArea * L;

                    drainGravelCard.style.display = 'flex';
                    drainGravel.innerHTML = `${gravelVolume.toFixed(3)} <small>м³</small>`;
                    drainSandCard.style.display = 'flex';
                    drainSand.innerHTML = `${sandVolume.toFixed(3)} <small>м³</small>`;
                    if (slopeArea > 0) {
                        drainSlopeCard.style.display = 'flex';
                        drainSlopeArea.innerHTML = `${slopeArea.toFixed(2)} <small>м²</small>`;
                    }
                }
            } else if (type === 'pile') {
                const H = parseFloat(document.getElementById('manHeight')?.value);
                const D = parseFloat(document.getElementById('manDiameter')?.value);
                if ([H, D].some(isNaN)) return;
                volume = (Math.PI * (D / 2) * (D / 2) * H) / 3;
            } else if (type === 'leveling') {
                const L = parseFloat(document.getElementById('manLength')?.value);
                const W = parseFloat(document.getElementById('manWidth')?.value);
                const z1 = parseFloat(document.getElementById('manZ1')?.value);
                const z2 = parseFloat(document.getElementById('manZ2')?.value);
                const z3 = parseFloat(document.getElementById('manZ3')?.value);
                const z4 = parseFloat(document.getElementById('manZ4')?.value);
                const target = parseFloat(document.getElementById('manTarget')?.value);
                if ([L, W, z1, z2, z3, z4, target].some(isNaN)) return;
                const avgZ = (z1 + z2 + z3 + z4) / 4;
                const area = L * W;
                const cutFill = avgZ - target;
                volume = area * cutFill;
                mass = Math.abs(volume) * density / 1000;
                earthExtra1.style.display = 'flex';
                earthExtra1.querySelector('.result-label').textContent = cutFill >= 0 ? 'Срезка' : 'Насыпь';
                earthExtra1.querySelector('.result-value').innerHTML = `${Math.abs(volume).toFixed(2)} <small>м³</small>`;
                earthVolume.innerHTML = `${volume.toFixed(2)} <small>м³</small>`;
                earthMass.innerHTML = `${mass.toFixed(2)} <small>т</small>`;
                return;
            }
            mass = volume * density / 1000;
        } else if (mode === 'points') {
            const container = document.getElementById('earthPointsContainer');
            const rows = container.querySelectorAll('.point-row');
            const points = [];
            rows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                const x = parseFloat(inputs[0].value), y = parseFloat(inputs[1].value), z = parseFloat(inputs[2].value);
                if (!isNaN(x) && !isNaN(y) && !isNaN(z)) points.push({ x, y, z });
            });
            if (points.length < 2) return;

            if (type === 'trench' || type === 'drain') {
                if (points.length !== 2) return;
                const p1 = points[0], p2 = points[1];
                const dx = p2.x - p1.x, dy = p2.y - p1.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const width = (type === 'drain') ? 0.6 : 0.8;
                const avgDepth = (p1.z + p2.z) / 2;
                volume = length * width * avgDepth;
                construct = parseFloat(document.getElementById('ptsConstruct')?.value) || 0;
                backfill = volume - construct;
            } else if (type === 'excavation') {
                const area = polygonArea(points);
                const avgZ = points.reduce((s, p) => s + p.z, 0) / points.length;
                volume = area * avgZ;
                construct = parseFloat(document.getElementById('ptsConstruct')?.value) || 0;
                backfill = volume - construct;
            } else if (type === 'pile') {
                const area = polygonArea(points);
                const avgH = points.reduce((s, p) => s + p.z, 0) / points.length;
                volume = area * avgH / 3;
            } else if (type === 'leveling') {
                const target = parseFloat(document.getElementById('ptsTarget')?.value) || 0;
                const area = polygonArea(points);
                const avgZ = points.reduce((s, p) => s + p.z, 0) / points.length;
                const cutFill = avgZ - target;
                volume = area * cutFill;
                mass = Math.abs(volume) * density / 1000;
                earthExtra1.style.display = 'flex';
                earthExtra1.querySelector('.result-label').textContent = cutFill >= 0 ? 'Срезка' : 'Насыпь';
                earthExtra1.querySelector('.result-value').innerHTML = `${Math.abs(volume).toFixed(2)} <small>м³</small>`;
                earthVolume.innerHTML = `${volume.toFixed(2)} <small>м³</small>`;
                earthMass.innerHTML = `${mass.toFixed(2)} <small>т</small>`;
                return;
            }
            mass = volume * density / 1000;
        } else if (mode === 'grid') {
            const L = parseFloat(document.getElementById('gridLength')?.value);
            const W = parseFloat(document.getElementById('gridWidth')?.value);
            const step = parseFloat(document.getElementById('gridStep')?.value);
            const target = parseFloat(document.getElementById('gridTarget')?.value);
            if ([L, W, step].some(isNaN) || L <= 0 || W <= 0 || step <= 0) return;

            const cells = document.querySelectorAll('.grid-cell');
            if (cells.length === 0) return;
            const cols = Math.round(L / step) + 1;
            const rows = Math.round(W / step) + 1;

            let totalCut = 0, totalFill = 0;
            for (let j = 0; j < rows - 1; j++) {
                for (let i = 0; i < cols - 1; i++) {
                    const idx1 = j * cols + i;
                    const idx2 = j * cols + i + 1;
                    const idx3 = (j + 1) * cols + i + 1;
                    const idx4 = (j + 1) * cols + i;
                    const z1 = parseFloat(cells[idx1].value) || 0;
                    const z2 = parseFloat(cells[idx2].value) || 0;
                    const z3 = parseFloat(cells[idx3].value) || 0;
                    const z4 = parseFloat(cells[idx4].value) || 0;
                    const avgZ = (z1 + z2 + z3 + z4) / 4;
                    const h = avgZ - target;
                    const squareArea = step * step;
                    if (h > 0) {
                        totalCut += h * squareArea;
                    } else {
                        totalFill += Math.abs(h) * squareArea;
                    }
                }
            }
            volume = totalCut - totalFill;
            mass = (totalCut + totalFill) * density / 1000;

            earthGridExtra.style.display = 'flex';
            earthGridExtra.querySelector('.result-label').textContent = '📊 Выемка / Насыпь';
            earthGridExtra.querySelector('.result-value').innerHTML = `${totalCut.toFixed(2)} / ${totalFill.toFixed(2)} <small>м³</small>`;

            const balance = totalCut - totalFill;
            const extraLabel = balance > 0 ? '🔴 Излишек (вывоз)' : '🟢 Недостаток (привоз)';
            earthExtra1.style.display = 'flex';
            earthExtra1.querySelector('.result-label').textContent = extraLabel;
            earthExtra1.querySelector('.result-value').innerHTML = `${Math.abs(balance).toFixed(2)} <small>м³</small>`;
        }

        earthVolume.innerHTML = `${volume.toFixed(2)} <small>м³</small>`;
        earthMass.innerHTML = `${mass.toFixed(2)} <small>т</small>`;
        if (backfill !== null) {
            earthBackfillCard.style.display = 'flex';
            earthBackfill.innerHTML = `${backfill.toFixed(2)} <small>м³</small>`;
        }
        addHistory('Земляные работы', { объём: volume, масса: mass });
    });

    // ==================== БЕТОННЫЕ РАБОТЫ ====================
    const concreteType = document.getElementById('concreteType');
    const concreteMarkingGroup = document.getElementById('concreteMarkingGroup');
    const concreteMarking = document.getElementById('concreteMarking');
    const concreteGradeGroup = document.getElementById('concreteGradeGroup');
    const concreteGrade = document.getElementById('concreteGrade');
    const mortarGradeGroup = document.getElementById('mortarGradeGroup');
    const cementGradeGroup = document.getElementById('cementGradeGroup');
    const concreteLength = document.getElementById('concreteLength');
    const concreteWidth = document.getElementById('concreteWidth');
    const concreteHeight = document.getElementById('concreteHeight');
    const mortarGrade = document.getElementById('mortarGrade');
    const cementGrade = document.getElementById('cementGrade');
    const concreteCalculate = document.getElementById('concreteCalculate');
    const concreteVolume = document.getElementById('concreteVolume');
    const concreteWeight = document.getElementById('concreteWeight');
    const concreteCement = document.getElementById('concreteCement');
    const concreteSand = document.getElementById('concreteSand');
    const concreteGravel = document.getElementById('concreteGravel');
    const concreteWater = document.getElementById('concreteWater');
    const concreteStrength = document.getElementById('concreteStrength');
    const strengthCard = document.getElementById('strengthCard');
    const concreteComposition = document.getElementById('concreteComposition');
    const concreteDescription = document.getElementById('concreteDescription');

    function populateConcreteGrades() {
        const marking = concreteMarking.value;
        concreteGrade.innerHTML = '';
        const grades = marking === 'M' 
            ? ['M100','M150','M200','M250','M300','M350','M400','M450','M500']
            : ['B3.5','B5','B7.5','B10','B12.5','B15','B20','B25','B30','B35','B40','B45','B50','B55','B60'];
        grades.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g;
            opt.textContent = g;
            concreteGrade.appendChild(opt);
        });
    }
    populateConcreteGrades();
    concreteMarking.addEventListener('change', populateConcreteGrades);

    concreteType.addEventListener('change', function() {
        const isConcrete = this.value === 'concrete';
        concreteMarkingGroup.style.display = isConcrete ? 'block' : 'none';
        concreteGradeGroup.style.display = isConcrete ? 'block' : 'none';
        mortarGradeGroup.style.display = isConcrete ? 'none' : 'block';
        cementGradeGroup.style.display = isConcrete ? 'none' : 'block';
        document.getElementById('concreteVolume').innerHTML = '— <small>м³</small>';
        document.getElementById('concreteWeight').innerHTML = '— <small>т</small>';
        document.getElementById('concreteCement').innerHTML = '— <small>кг</small>';
        document.getElementById('concreteSand').innerHTML = '— <small>кг</small>';
        document.getElementById('concreteGravel').innerHTML = '— <small>кг</small>';
        document.getElementById('concreteWater').innerHTML = '— <small>л</small>';
        document.getElementById('concreteStrength').innerHTML = '—';
        strengthCard.style.display = 'none';
        document.getElementById('concreteComposition').innerHTML = '';
        document.getElementById('concreteDescription').textContent = '';
    });

    concreteCalculate.addEventListener('click', () => {
        const L = parseFloat(concreteLength.value);
        const W = parseFloat(concreteWidth.value);
        const H = parseFloat(concreteHeight.value);
        if ([L, W, H].some(isNaN) || L <= 0 || W <= 0 || H <= 0) return;
        const volume = L * W * H;

        const isConcrete = concreteType.value === 'concrete';
        let mix;
        if (isConcrete) {
            const grade = concreteGrade.value;
            mix = concreteMix[grade];
            if (!mix) return;
        } else {
            const mortarGradeValue = mortarGrade.value;
            const cementGradeValue = cementGrade.value;
            const mortarData = mortarMix[mortarGradeValue];
            if (!mortarData) return;
            mix = mortarData[cementGradeValue];
            if (!mix) return;
        }

        const cementMass = mix.cement * volume;
        const sandMass = mix.sand * volume;
        const waterMass = mix.water * volume;
        const gravelMass = isConcrete ? mix.gravel * volume : 0;
        const totalMass = (cementMass + sandMass + gravelMass + waterMass) / 1000;

        concreteVolume.innerHTML = `${volume.toFixed(2)} <small>м³</small>`;
        concreteWeight.innerHTML = `${totalMass.toFixed(2)} <small>т</small>`;
        concreteCement.innerHTML = `${cementMass.toFixed(1)} <small>кг</small> (${Math.ceil(cementMass/50)} меш.)`;
        concreteSand.innerHTML = `${sandMass.toFixed(1)} <small>кг</small> (${(sandMass/1000).toFixed(2)} т)`;
        if (isConcrete) {
            concreteGravel.innerHTML = `${gravelMass.toFixed(1)} <small>кг</small> (${(gravelMass/1000).toFixed(2)} т)`;
            concreteGravel.style.display = 'flex';
        } else {
            concreteGravel.style.display = 'none';
        }
        concreteWater.innerHTML = `${waterMass.toFixed(1)} <small>л</small>`;

        if (isConcrete) {
            const grade = concreteGrade.value;
            let strengthText = '';
            if (grade.startsWith('M')) {
                strengthText = `💪 ${mix.strength_kgf} кгс/см² (средняя)`;
            } else if (grade.startsWith('B')) {
                strengthText = `💪 ${mix.strength_mpa} МПа (гарантированная) / ${mix.strength_kgf} кгс/см² (средняя)`;
            }
            strengthCard.style.display = 'flex';
            concreteStrength.innerHTML = strengthText;
        } else {
            strengthCard.style.display = 'none';
        }

        let compHtml = '<ul>';
        if (isConcrete) {
            compHtml += `<li>🧱 Цемент: ${cementMass.toFixed(1)} кг</li>`;
            compHtml += `<li>🏖️ Песок: ${sandMass.toFixed(1)} кг</li>`;
            compHtml += `<li>🪨 Щебень: ${gravelMass.toFixed(1)} кг</li>`;
            compHtml += `<li>💧 Вода: ${waterMass.toFixed(1)} л</li>`;
            compHtml += `<li>📐 Пропорции: ${mix.ratio} (цемент:песок:щебень)</li>`;
            compHtml += `<li>⚖️ Общая масса: ${totalMass.toFixed(2)} т</li>`;
        } else {
            const cementGradeLabel = cementGrade.value === '400' ? 'М400' : 'М500';
            compHtml += `<li>🧱 Цемент (${cementGradeLabel}): ${cementMass.toFixed(1)} кг (${Math.ceil(cementMass/50)} меш.)</li>`;
            compHtml += `<li>🏖️ Песок: ${sandMass.toFixed(1)} кг (${(sandMass/1000).toFixed(2)} т)</li>`;
            compHtml += `<li>💧 Вода: ${waterMass.toFixed(1)} л</li>`;
            compHtml += `<li>📐 Пропорции: ${mix.ratio} (цемент:песок)</li>`;
            compHtml += `<li>⚖️ Общая масса: ${totalMass.toFixed(2)} т</li>`;
        }
        compHtml += '</ul>';
        concreteComposition.innerHTML = compHtml;
        concreteDescription.textContent = mix.desc;

        addHistory(isConcrete ? 'Бетон' : 'Раствор', { 
            объём: volume, 
            масса: totalMass, 
            марка: isConcrete ? concreteGrade.value : mortarGrade.value, 
            цемент: isConcrete ? '—' : cementGrade.value 
        });
    });

    // ==================== ФУНДАМЕНТЫ ====================
    const sfLength = document.getElementById('sfLength');
    const sfWidth = document.getElementById('sfWidth');
    const sfHeight = document.getElementById('sfHeight');
    const sfDepth = document.getElementById('sfDepth');
    const sfBelts = document.getElementById('sfBelts');
    const sfLongDia = document.getElementById('sfLongDia');
    const sfTransStep = document.getElementById('sfTransStep');
    const sfTransDia = document.getElementById('sfTransDia');
    const sfConcreteMarking = document.getElementById('sfConcreteMarking');
    const sfConcreteGrade = document.getElementById('sfConcreteGrade');
    const sfCover = document.getElementById('sfCover');
    const sfSubConcrete = document.getElementById('sfSubConcrete');
    const sfLapLength = document.getElementById('sfLapLength');
    const sfCalculate = document.getElementById('sfCalculate');
    const sfConcreteVolume = document.getElementById('sfConcreteVolume');
    const sfConcreteWeight = document.getElementById('sfConcreteWeight');
    const sfLongWeight = document.getElementById('sfLongWeight');
    const sfTransWeight = document.getElementById('sfTransWeight');
    const sfTotalRebar = document.getElementById('sfTotalRebar');
    const sfFormworkArea = document.getElementById('sfFormworkArea');
    const sfFormworkPanels = document.getElementById('sfFormworkPanels');
    const sfComposition = document.getElementById('sfComposition');
    const sfDescription = document.getElementById('sfDescription');

    // Заполнение селектов для диаметров арматуры
    populateRebarSelect('sfLongDia');
    populateRebarSelect('sfTransDia');

    // Заполнение селекта марки/класса бетона
    function populateSfConcreteGrades() {
        const marking = sfConcreteMarking.value;
        sfConcreteGrade.innerHTML = '';
        const grades = marking === 'M' 
            ? ['M100','M150','M200','M250','M300','M350','M400','M450','M500']
            : ['B3.5','B5','B7.5','B10','B12.5','B15','B20','B25','B30','B35','B40','B45','B50','B55','B60'];
        grades.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g;
            opt.textContent = g;
            sfConcreteGrade.appendChild(opt);
        });
    }
    populateSfConcreteGrades();
    sfConcreteMarking.addEventListener('change', populateSfConcreteGrades);

    sfCalculate.addEventListener('click', () => {
        const L = parseFloat(sfLength.value);
        const W = parseFloat(sfWidth.value);
        const H = parseFloat(sfHeight.value);
        const D = parseFloat(sfDepth.value);
        const belts = parseInt(sfBelts.value);
        const cover = parseFloat(sfCover.value);
        const sub = parseFloat(sfSubConcrete.value);
        const lap = parseFloat(sfLapLength.value);
        const step = parseFloat(sfTransStep.value);
        const longDia = parseInt(sfLongDia.value);
        const transDia = parseInt(sfTransDia.value);
        const marking = sfConcreteMarking.value;
        const grade = sfConcreteGrade.value;

        if ([L, W, H, D, belts, cover, step].some(v => isNaN(v) || v <= 0)) {
            alert('Проверьте корректность введённых данных.');
            return;
        }

        // Объём бетона (лента + подбетонка)
        const volume = L * W * H + L * W * (sub / 1000);
        const dens = 2400; // плотность бетона кг/м³
        const weight = volume * dens / 1000; // т

        // Площадь опалубки (периметр × высота ленты)
        const perimeter = 2 * (L + W);
        const formworkArea = perimeter * H;
        const panelWidth = 1.2; // м
        const panelHeight = 0.6; // м
        const panels = Math.ceil(formworkArea / (panelWidth * panelHeight));

        // Арматура
        const massLong = rebarMassMap[longDia] || 0;
        const massTrans = rebarMassMap[transDia] || 0;
        // Продольные стержни: 4 стержня на пояс (углы) + 2 посередине? Упростим: 4 * belts
        const longCount = belts * 4;
        // Длина продольных: (L + W) * 2 + нахлёст
        const longLength = (2 * (L + W) * 1000 + lap) / 1000; // м
        const totalLongLength = longCount * longLength;
        const longWeight = totalLongLength * massLong;

        // Поперечные хомуты: периметр / шаг + 1
        const transCount = Math.ceil((2 * (L + W) * 1000) / step) + 1;
        // Длина хомута: (ширина + высота) * 2 + загибы (упрощённо + 2*диаметр)
        const transLength = (2 * (W + H) * 1000 + 2 * transDia) / 1000;
        const totalTransLength = transCount * transLength;
        const transWeight = totalTransLength * massTrans;

        const totalRebar = longWeight + transWeight;

        // Бетон: состав
        const mix = concreteMix[grade];
        if (!mix) {
            alert('Нет данных для выбранной марки/класса бетона.');
            return;
        }
        const cementMass = mix.cement * volume;
        const sandMass = mix.sand * volume;
        const gravelMass = mix.gravel * volume;
        const waterMass = mix.water * volume;

        // Вывод результатов
        sfConcreteVolume.innerHTML = `${volume.toFixed(3)} <small>м³</small>`;
        sfConcreteWeight.innerHTML = `${weight.toFixed(3)} <small>т</small>`;
        sfLongWeight.innerHTML = `${longWeight.toFixed(2)} <small>кг</small>`;
        sfTransWeight.innerHTML = `${transWeight.toFixed(2)} <small>кг</small>`;
        sfTotalRebar.innerHTML = `${totalRebar.toFixed(2)} <small>кг</small>`;
        sfFormworkArea.innerHTML = `${formworkArea.toFixed(2)} <small>м²</small>`;
        sfFormworkPanels.innerHTML = `${panels} <small>шт.</small>`;

        let compHtml = '<ul>';
        compHtml += `<li>🧱 Цемент: ${cementMass.toFixed(1)} кг (${Math.ceil(cementMass/50)} меш.)</li>`;
        compHtml += `<li>🏖️ Песок: ${sandMass.toFixed(1)} кг (${(sandMass/1000).toFixed(2)} т)</li>`;
        compHtml += `<li>🪨 Щебень: ${gravelMass.toFixed(1)} кг (${(gravelMass/1000).toFixed(2)} т)</li>`;
        compHtml += `<li>💧 Вода: ${waterMass.toFixed(1)} л</li>`;
        compHtml += `<li>📐 Пропорции: ${mix.ratio} (цемент:песок:щебень)</li>`;
        compHtml += `<li>⚖️ Общая масса бетона: ${weight.toFixed(2)} т</li>`;
        compHtml += '</ul>';
        sfComposition.innerHTML = compHtml;
        sfDescription.textContent = mix.desc;

        addHistory('Ленточный фундамент', { объём_бетона: volume, масса_арматуры: totalRebar, опалубка: formworkArea });
    });

    // ==================== ИСТОРИЯ РАСЧЁТОВ ====================
    const historyModal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    const closeHistoryModal = document.getElementById('closeHistoryModal');
    let history = JSON.parse(localStorage.getItem('psmCalcHistory') || '[]');

    function addHistory(type, data) {
        history.push({ type, data, date: new Date().toLocaleString() });
        if (history.length > 100) history.shift();
        localStorage.setItem('psmCalcHistory', JSON.stringify(history));
    }

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `<strong>${item.date} – ${item.type}</strong>: ${JSON.stringify(item.data)} <button class="delete-history-btn" data-idx="${idx}">🗑</button>`;
            historyList.appendChild(div);
        });
        document.querySelectorAll('.delete-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'));
                history.splice(idx, 1);
                localStorage.setItem('psmCalcHistory', JSON.stringify(history));
                renderHistory();
            });
        });
    }

    document.getElementById('historyBtn').addEventListener('click', () => {
        historyModal.classList.remove('hidden');
        renderHistory();
    });
    closeHistoryModal.addEventListener('click', () => historyModal.classList.add('hidden'));
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        history = [];
        localStorage.setItem('psmCalcHistory', JSON.stringify(history));
        renderHistory();
    });

    // ==================== ЗАМЕТКИ ====================
    const notesFab = document.getElementById('newNotesFab');
    const notesModal = document.getElementById('newNotesModal');
    const closeNotesModal = document.getElementById('closeNewNotesModal');
    const notesList = document.getElementById('newNotesList');
    const addNoteBtn = document.getElementById('addNewNoteBtn');

    let notes = JSON.parse(localStorage.getItem('psmCalcNotesV2') || '[]');

    function saveNotes() { localStorage.setItem('psmCalcNotesV2', JSON.stringify(notes)); }

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, idx) => {
            const div = document.createElement('div');
            div.className = 'note-item';
            div.innerHTML = `
                <div class="note-date">${new Date(note.date).toLocaleString()}</div>
                <textarea data-idx="${idx}">${note.text}</textarea>
                <button class="delete-note-btn" data-idx="${idx}">🗑</button>
            `;
            notesList.appendChild(div);
        });
        document.querySelectorAll('.delete-note-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'));
                notes.splice(idx, 1);
                saveNotes();
                renderNotes();
            });
        });
        document.querySelectorAll('.note-item textarea').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'));
                notes[idx].text = e.target.value;
                saveNotes();
            });
        });
    }

    addNoteBtn.addEventListener('click', () => {
        notes.push({ text: '', date: Date.now() });
        saveNotes();
        renderNotes();
    });

    notesFab.addEventListener('click', () => {
        notesModal.classList.remove('hidden');
        renderNotes();
    });

    closeNotesModal.addEventListener('click', () => notesModal.classList.add('hidden'));
    notesModal.addEventListener('click', (e) => { if (e.target === notesModal) notesModal.classList.add('hidden'); });

    // ==================== ПЕЧАТЬ (удалена) ====================
    // Кнопка печати и её обработчик удалены.

    // Защита от отрицательных чисел
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('blur', function() {
            const val = parseFloat(this.value);
            if (isNaN(val) || val < 0) this.value = Math.abs(val) || 1;
        });
        input.addEventListener('keydown', function(e) { if (e.key === 'e' || e.key === 'E') e.preventDefault(); });
    });
})();