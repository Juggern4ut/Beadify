const drawResult = () => {
  let val = parseInt(document.getElementById("element_size").value);
  
  if (typeof val === "number" && val > 2) {
    let file_chooser = document.getElementById("fileChooser");
    let files = file_chooser.files;
    let image_url;
    if (files.length) {
      let file = files[0];
      image_url = window.URL.createObjectURL(file);
    } else {
      image_url = "../res/sample.jpg";
    }

    let new_image = new Image();
    new_image.src = image_url;

    context_source.clearRect(0, 0, canvas_width, canvas_height);
    new_image.addEventListener("load", () => {
      canvas_height = new_image.naturalHeight;
      canvas_width = new_image.naturalWidth;

      canvas_source.setAttribute("height", canvas_height);
      canvas_source.setAttribute("width", canvas_width);

      canvas_result.setAttribute("height", canvas_height);
      canvas_result.setAttribute("width", canvas_width);

      context_source.drawImage(new_image, 0, 0);
      generateDrawing(val);
    });
  } else {
    alert("Please enter a valid number larger than 2");
  }
};

const generateDrawing = element_size => {
  
  let compareType = document.getElementById("compare_type").value;

  context_result.clearRect(0, 0, canvas_width, canvas_height);

  const total_rows = Math.floor(canvas_width / element_size);
  const total_cols = Math.floor(canvas_height / element_size);
  let x = 0;
  let y = 0;

  for (let col = 0; col < total_cols; col++) {
    for (let row = 0; row < total_rows; row++) {
      let image_data = context_source.getImageData(
        x,
        y,
        element_size,
        element_size
      ).data;

      let color_data = getAverageColor(image_data);
      let avColor = new Color().setRgbValue(
        color_data.red,
        color_data.green,
        color_data.blue
      );

      let closesColorFromArray;
      if (compareType === "hsl") {
        closesColorFromArray = Color.getColorClosestByHsl(avColor, colorArray);
      } else if (compareType === "hue") {
        closesColorFromArray = Color.getColorClosestByHue(avColor, colorArray);
      } else {
        closesColorFromArray = Color.getColorClosestByRgb(avColor, colorArray);
      }

      let hslColor = `hsl(${closesColorFromArray.hsl.hue}, ${closesColorFromArray.hsl.saturation}%, ${closesColorFromArray.hsl.lightness}%)`;

      drawCircle(context_result, x, y, element_size, hslColor);

      x += element_size;
    }
    x = 0;
    y += element_size;
  }
};
