const initInfoLightbox = () => {
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
