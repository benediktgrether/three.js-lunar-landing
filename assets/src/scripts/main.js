import jQuery from "jquery";
window.$ = jQuery;
window.jQuery = jQuery;

import { renderInit } from "./renderInit";

$(document).ready(function() {
  var getHeight = $(".card-wrapper").height();
  var getWidth = $(".card-wrapper").width();
  $(".card-boxshadow").css({
    height: getHeight,
    width: getWidth
  });
  console.info("DOM Ready");
  renderInit();
});
