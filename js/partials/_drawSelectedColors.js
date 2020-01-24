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
