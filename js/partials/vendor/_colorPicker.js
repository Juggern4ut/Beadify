class ColorPicker {
  constructor() {
    this.canvas = document.getElementById("canvas_colorpicker");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;

    this.scaleX = this.canvasWidth / 360;
    this.scaleY = this.canvasHeight / 100;

    this.currentColor = null;

    let x = 0;
    let y = 0;

    let hue = 0;
    let saturation = 100;
    let lightness = 100;

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 360; j++) {
        this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        this.ctx.fillRect(
          x,
          y,
          Math.ceil(this.scaleX + 1),
          Math.ceil(this.scaleY + 1)
        );
        x += this.scaleX;
        hue = j;
      }
      lightness -= 1;
      x = 0;
      y += 1;
    }

    this.canvas.addEventListener("mousedown", e => {
      this.selecting = true;
      this.circle = document.createElement("div");
      this.circle.style.cssText =
        "background-color: red; border-radius: 50%; width: 10px; height: 10px; position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); border: 1px solid #000;";

      this.canvas.after(this.circle);
    });

    document.addEventListener("mouseup", () => {
      if (!this.selecting) return false;
      this.selecting = false;
      this.circle.remove();
    });

    document.addEventListener("mousemove", e => {
      if (!this.selecting) return false;

      let rect = this.canvas.getBoundingClientRect();
      let win = this.canvas.ownerDocument.defaultView;

      let mousePosX = e.pageX - rect.left + win.pageXOffset;
      let mousePosY = e.pageY - rect.top + win.pageYOffset;

      mousePosX = mousePosX < 0 ? 0 : mousePosX;
      mousePosY = mousePosY < 0 ? 0 : mousePosY;

      let maxTop = rect.top + win.pageYOffset;
      let maxBottom = rect.top + win.pageYOffset + this.canvas.offsetHeight;

      let maxLeft = rect.left + win.pageXOffset;
      let maxRight = rect.left + win.pageXOffset + this.canvas.offsetWidth;

      let circleTop = e.pageY;
      let circleLeft = e.pageX;

      if (e.pageY < maxTop) {
        circleTop = maxTop;
      } else if (e.pageY > maxBottom) {
        circleTop = maxBottom;
      }

      if (e.pageX < maxLeft) {
        circleLeft = maxLeft;
      } else if (e.pageX > maxRight) {
        circleLeft = maxRight;
      }

      this.circle.style.top = circleTop + "px";
      this.circle.style.left = circleLeft + "px";

      mousePosX = mousePosX > this.canvasWidth ? this.canvasWidth : mousePosX;
      mousePosY = mousePosY > this.canvasHeight ? this.canvasHeight : mousePosY;

      mousePercentageX = mousePosX / this.canvasWidth;
      mousePercentageY = mousePosY / this.canvasHeight;

      let hue = Math.round(360 * mousePercentageX);
      let lightness = Math.round(100 - 100 * mousePercentageY);

      let a = document.querySelector(".lightbox__data");
      a.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;

      this.currentColor = { hue: hue, saturation: 100, lightness: lightness };

      this.circle.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;
    });
  }
}
