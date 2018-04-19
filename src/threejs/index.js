import THREE from 'three.js'

//渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 300);

//场景
var scene = new THREE.Scene();

//照相机:定义三维空间到二维屏幕的投影方式:正交投影照相机与透视投影照相机

  //正交投影照相机
  var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
  camera.position.set(-4,5, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  //透视投影照相机
  var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
  camera.position.set(0,0, 5);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(camera);

//长方体
var cube = new THREE.Mesh(
  new THREE.CubeGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })
);

scene.add(cube);

renderer.render(scene, camera);


document.getElementById('root').appendChild(renderer.domElement);