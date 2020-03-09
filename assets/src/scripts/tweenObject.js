import { meshes } from "./objectLoad";

var tween;
let tweenUpdate = true;

function lunarLandingAnimation() {
  var position = { y: meshes["lunar"].position.y };
  var target = { y: 0.94 };
  tween = new TWEEN.Tween(position).to(target, 10000);
  tween.onUpdate(function() {
    meshes["lunar"].position.y = position.y;
  });
  tween.easing(TWEEN.Easing.Cubic.Out);
  tween.start();
  tween.onComplete(function() {
    console.log("done!");
    tweenUpdate = false;
  });
}

export { tweenUpdate, lunarLandingAnimation };
