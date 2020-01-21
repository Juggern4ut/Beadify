let canvas_source = document.getElementById("canvas_source");
let context_source = canvas_source.getContext("2d");

let canvas_result = document.getElementById("canvas_result");
let context_result = canvas_result.getContext("2d");

let colorArray = [];

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  drawResult();
});

const redrawSelectedColors = () => {
  const colorDrawer = document.getElementById("color-drawer");

  colorDrawer.innerHTML = "";

  colorArray.forEach((color, i) => {
    let tmp = document.createElement("div");
    tmp.addEventListener("click", () => {
      colorArray.splice(i, 1);
      redrawSelectedColors();
    });
    tmp.style.backgroundColor = `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`;
    colorDrawer.append(tmp);
  });
};

window.onload = () => {
  for (let i = 0; i < 10; i++) {
    colorArray.push(new Color().setHslValue(0, 0, i * 10));
  }

  redrawSelectedColors();

  let colorPicker = new ColorPicker();

  const lightbox = new Lightbox({
    draggable: true
  }).setTitle("Colorpicker");

  const colorCanvas = document.getElementById("canvas_colorpicker");
  const addColorButton = document.createElement("button");
  addColorButton.innerHTML = "Add color";
  addColorButton.style.display = "block";
  addColorButton.addEventListener("click", e => {
    colorArray.push(
      new Color().setHslValue(
        colorPicker.currentColor.hue,
        colorPicker.currentColor.saturation,
        colorPicker.currentColor.lightness
      )
    );
    redrawSelectedColors();
  });
  lightbox.setContent([colorCanvas, addColorButton]);

  document.getElementById("color-button").addEventListener("click", e => {
    lightbox.open();
  });
};
