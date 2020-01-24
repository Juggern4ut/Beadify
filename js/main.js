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

  const infoLightbox = new Lightbox({
    additionalClasses: ["align-right"],
    openAnimation: "buildup",
    closeAnimation: "collapse",
    draggable: true
  })
    .setTitle("Color compare methods")
    .setContent(
      `
      <h2>What are color compare methods?</h2>
      <p>
        Colors can be defined by several values. One is RGB which defines
        the value for red, green and blue with a value between 0 and 255 
        where 0 is no amount of that color and 255 is all the value of 
        that color. rgb(255, 255, 0) for example would be a mix of all 
        red and all green with no blue, so it would result in a bright 
        yellow.
      </p>
      <p>Another way is hsl which stands for hue, saturation and lightness.</p>
      <p>
        Since there are several ways to look at color, there are also
        more than one distinct way to compare colors to oneanother.
        And with this tool you can experiment with three of them
      </p>
      <ul>
        <li>RGB - Will compare the colors by the squared average of all color values added. This one will usually provide the best results for this task</li>
        <li>Hue - Will compare by the hue of the color. Saturation and lightness however will not be taken into consideration here.</li>
        <li>HSL - The same as Hue but will also take saturation and lightness into effect</li>
      </ul>
      <p>Feel free to experiment with different color combinations and compare methods</p>
      `
    );

  const handler = document.getElementById("info_handler");
  handler.onclick = () => {
    infoLightbox.open();
  };
};
