/**
 * @Required three.min.js
 */
(function() {
    var scene,
        sphere,
        camera,
        light,
        gridHelper,
        axisHelper,
        lightHelper,
        renderer,
        width = 640,
        height = 330;

    //1. scene: ステージ
    scene = new THREE.Scene();

    //2. mesh: 物体
    sphere = new THREE.Mesh(
        ////geometry: 形状
        /*
            ・立方体
            new THREE.BoxGeometry(幅, 高さ, 奥行き)
            ・球体
            new THREE.SphereGeometry(半径, 経度分割数, 緯度分割数, 開始経度, 経線中心角, 開始緯度, 緯線中心角)
            ・円柱
            new THREE.CylinderGeometry(上面の半径, 底面の半径, 高さ,円周の分割数, 高さの分割数, フタをしない:true,フタをする:false)
        */
        new THREE.BoxGeometry(220, 120, 70),

        //material: 材質、色
        new THREE.MeshPhongMaterial({color: 0x8dc3ff})
        /*
        MeshBasicMaterial … 質感が一番低い。光源の影響を受けないので陰がつかない。
        MeshLambertMaterial … MeshBasicMaterialより質感が高い。影がつく。
        MeshPhongMaterial … 質感が一番高い。影も光も綺麗につく。また、オプションでカラーコードなどを渡せる。
            → http://matorel.com/archives/602
        */
    );
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    //4. light: 光源
    /*
        ・平方光源
        new THREE.DirectionalLight(0xから始まる16進数, 光の強さ)
        ・点光源
        new THREE.PointLight(0xから始まる16進数, 光の強さ, distance/遠くなるほど光の強さが線形で減衰)
        ・環境光自然光の乱反射シュミレート（補足として使用）
        new THREE.AmbientLight(0xから始まる16進数)
          → https://www56.atwiki.jp/threejs/pages/82.html
    */
    light = new THREE.DirectionalLight(0xf8f3e6, 1);
    light.position.set(100, 130, 80);
    scene.add(light);
    //4-5. 環境光源
    ambient = new THREE.AmbientLight(0x222222);
    scene.add(ambient);

    //3. camera
    /*
        ・透視投影
        new THREE.PerspectiveCamera(画角/カメラに写る光景の範囲を角度で表したもの, アスペクト比, ニアークリップ/視点から、光景が見え始める面までの距離, ファークリップ/視点から最も遠い面までの距離)
        ・正投影
        new THREE.OrthographicCamera(画角, アスペクト比, ニアークリップ, ファークリップ)
    */
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 500);
    //カメラの位置
    camera.position.set(160, 100, 250);
    //カメラの向き
    camera.lookAt(scene.position);


    //5. helper: ガイドレイヤー
    /*
        ・平面にグリッドを表示
        new THREE.GridHelper(全体のサイズ, 1グリッドのサイズ)
        ・x,y,x軸を表示
        new THREE.AxisHelper(サイズ)
        ・光源を表示
        new THREE.DirectionalLightHelper(光源の変数, サイズ)
        new THREE.PointLightHelper(光源の変数, サイズ)
    */
    gridHelper = new THREE.GridHelper(200, 25);
    scene.add(gridHelper);
    axisHelper = new THREE.AxisHelper(500);
    scene.add(axisHelper);
    lightHelper = new THREE.DirectionalLightHelper(light, 10);
    scene.add(lightHelper);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xeeeeee);
    document.getElementById('stage').appendChild(renderer.domElement);
    renderer.render(scene, camera);
})();