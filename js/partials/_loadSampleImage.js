let drawing = new Image();
let canvas_width = 0;
let canvas_height = 0;

drawing.src = "../res/sample.jpg";

drawing.addEventListener("load", () => {
  canvas_height = drawing.naturalHeight;
  canvas_width = drawing.naturalWidth;

  canvas_source.setAttribute("height", canvas_height);
  canvas_source.setAttribute("width", canvas_width);

  canvas_result.setAttribute("height", canvas_height);
  canvas_result.setAttribute("width", canvas_width);

  context_source.drawImage(drawing, 0, 0);
  generateDrawing(20);
});
