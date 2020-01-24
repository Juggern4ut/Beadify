let canvas_source = document.getElementById("canvas_source");
let context_source = canvas_source.getContext("2d");

let canvas_result = document.getElementById("canvas_result");
let context_result = canvas_result.getContext("2d");

let colorArray = [];

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  drawResult();
});

window.onload = () => {
  initColorpickerLightbox();
  initInfoLightbox();
};
