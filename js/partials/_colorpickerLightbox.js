const initColorpickerLightbox = () => {
  let colorPicker = new ColorPicker();

  const lightbox = new Lightbox({
    additionalClasses: ["align-right"],
    draggable: true
  }).setTitle("Colorpicker");

  const quickaddText = document.createElement("p");
  quickaddText.innerHTML = "<br>Quickadd Colorsets:";

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

  //ADD MONOCHROMATIC RED

  lightbox.setContent([
    colorCanvas,
    addColorButton,
    quickaddText,
    addRedColorSet(lightbox),
    addOrangeColorSet(lightbox),
    addYellowColorSet(lightbox),
    addGreenColorSet(lightbox),
    addBlueColorSet(lightbox),
    addBlackColorSet(lightbox)
  ]);

  document.getElementById("color-button").addEventListener("click", e => {
    lightbox.open();
  });
};
