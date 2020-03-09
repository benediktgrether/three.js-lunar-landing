import { tweenUpdate } from "./tweenObject";
import { objectLoad, RESOURCES_LOADED } from "./objectLoad";

var camera, scene, renderer;
var aspect = window.innerWidth / window.innerHeight;
var d = 2.5;

//#region Loading Screen

var loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(90, aspect, 0.1, 100),
  box: new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x4444ff })
  )
};

//#endregion

function renderInit() {
  scene = new THREE.Scene();

  //#region Isometric Camera
  camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
  );

  camera.position.set(20.8, 20, 20 - 0.8); // all components equal
  camera.lookAt(scene.position); // or the origin

  window.addEventListener("resize", onWindowResize, false);
  //#endregion

  objectLoad();
  renderSetup();

  lightSetup();

  planeSetup();

  animationSetup();
}

function renderSetup() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xc7e1ff);
  renderer.setClearColor(0x333333);
  document.body.appendChild(renderer.domElement);

  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.0;

  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.renderSingleSided = false; // default is true
}

function lightSetup() {
  //#region HemiLight
  var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemiLight);

  //#region spotLight
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(3, 14, 12);
  spotLight.intensity = 5;
  spotLight.castShadow = true;
  // spotLight.shadow.radius = 4;

  spotLight.shadowMapWidth = 2048;
  spotLight.shadowMapHeight = 2048;
  spotLight.shadowCameraNear = 1;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 45;
  scene.add(spotLight);
}

function planeSetup() {
  //Shadow for Plane Material
  var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  planeGeometry.rotateX(-Math.PI / 2);

  var planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 0.2;

  var planeShadow = new THREE.Mesh(planeGeometry, planeMaterial);
  planeShadow.receiveShadow = true;
  planeShadow.position.y = 0.1;
  scene.add(planeShadow);
}

function animationSetup() {
  var animate = function() {
    if (RESOURCES_LOADED == false) {
      requestAnimationFrame(animate);

      renderer.render(loadingScreen.scene, loadingScreen.camera);
      return;
    }

    renderer.render(scene, camera);

    if (tweenUpdate == true) {
      TWEEN.update();
    }
    requestAnimationFrame(function() {
      animate(renderer, scene, camera);
    });
  };
  animate();
}

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;

  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export { renderInit, camera, scene };
