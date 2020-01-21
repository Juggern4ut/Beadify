const drawBead = (context, x, y, size, color) => {
  let lineWidth = 7;
  let offset = size / 2;
  context.beginPath();
  context.arc(
    x + offset,
    y + offset,
    offset - lineWidth/2,
    0,
    2 * Math.PI
  );
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.stroke();
};

const drawCircle = (context, x, y, size, color) => {
  let offset = size / 2;
  context.beginPath();
  context.arc(x + offset, y + offset, offset, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};

const drawTriangle = (context, x, y, size, color) => {
  let offset = size / 2;
  context.beginPath();
  context.moveTo(x + offset, y);
  context.lineTo(x + size, y + size);
  context.lineTo(x, y + size);
  context.closePath();
  context.fillStyle = color;
  context.fill();
};

const drawDiamond = (context, x, y, size, color) => {
  let offset = size / 2;
  context.beginPath();
  context.moveTo(x + offset, y);
  context.lineTo(x + size, y + offset);
  context.lineTo(x + offset, y + size);
  context.lineTo(x, y + offset);
  context.closePath();
  context.fillStyle = color;
  context.fill();
};

const drawSquare = (context, x, y, size, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, size, size);
};
