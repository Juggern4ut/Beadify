const drawCircle = (context, x, y, size, color) => {
  let offset = size / 2;
  context.beginPath();
  context.arc(x + offset, y + offset, offset, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};
