import { scene } from "./renderInit";
import { lunarLandingAnimation } from "./tweenObject";

var models = {
  lunar: {
    glb: "./assets/dist/object/lunar/lunar.glb",
    name: "lunar",
    mesh: null
  },
  lunarSurface: {
    glb: "./assets/dist/object/lunarsurface/moonSurface.glb",
    name: "lunar_surface",
    mesh: null
  }
};

var meshes = {};

var RESOURCES_LOADED = false;

var loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(item, loaded, total) {
  console.log(item, loaded, total);
  $(".container-load").html(item, loaded, total);
};

loadingManager.onLoad = function() {
  console.log("loaded all resources");
  RESOURCES_LOADED = true;
  $(".container-load").css("display", "none");

  onResourcesLoad();
};

function objectLoad() {
  for (var _key in models) {
    (function(key) {
      var loader = new THREE.GLTFLoader(loadingManager);
      loader.load(models[key].glb, function(gltf) {
        var mesh = gltf.scene;
        mesh.traverse(function(object) {
          if (object.isMesh) object.castShadow = true;
        });
        mesh.name = '"' + models[key].name + '"';
        models[key].mesh = mesh;
      });
    })(_key);
  }
}

function onResourcesLoad() {
  meshes["lunar"] = models.lunar.mesh.clone();
  meshes["lunar"].position.set(0, 6, 0);
  meshes["lunar"].scale.set(0.5, 0.5, 0.5);
  meshes["lunar_surface"] = models.lunarSurface.mesh.clone();
  meshes["lunar_surface"].scale.set(0.5, 0.5, 0.5);
  scene.add(meshes["lunar"]);
  scene.add(meshes["lunar_surface"]);
  lunarLandingAnimation();
}

export { objectLoad, onResourcesLoad, RESOURCES_LOADED, meshes };
