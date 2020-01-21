/**
 * Represents a color. Has functions to convert from
 * one format to another and many other functionalities
 * like comparing colors, inverting them and so on
 * @class Color
 * @author {Lukas Meier}
 */
class Color {
  /**
   * Constructs a new color and sets all values to black
   */
  constructor() {
    this.rgb = { red: 0, green: 0, blue: 0 };
    this.hsl = { hue: 0, saturation: 0, lightness: 0 };
    this.hex = "#000000";
  }

  /**
   * Will set the color using red, green and blue values
   * @param {Number} red The red color value (0 - 255)
   * @param {Number} green The green color value (0 - 255)
   * @param {Number} blue The blue color value (0 - 255)
   * @returns {Color} The Color-Object
   */
  setRgbValue(red, green, blue) {
    if (red < 0 || red > 255) {
      console.warn(`Red is out of bounds.`);
      return false;
    }
    if (green < 0 || green > 255) {
      console.warn(`Green is out of bounds.`);
      return false;
    }
    if (blue < 0 || blue > 255) {
      console.warn(`Blue is out of bounds.`);
      return false;
    }

    this.rgb.red = red;
    this.rgb.green = green;
    this.rgb.blue = blue;

    const hsl = Color.rgb2Hsl(red, green, blue);
    this.hsl = hsl;

    const hex = Color.rgbToHex(red, green, blue);
    if (hex) {
      this.hex = hex;
    }

    return this;
  }

  /**
   * Will set the color using hue, saturation and lightness
   * @param {Number} hue The hue of the color (0 - 360)
   * @param {Number} saturation The saturation of the color (0 - 100)
   * @param {Number} lightness The lightness of the color (0 - 100)
   * @returns {Color} The Color-Object
   */
  setHslValue(hue, saturation, lightness) {
    if (hue > 360 || hue < 0) {
      console.warn(
        `The hue cannot be larger than 360 or negative. It was ${hue}`
      );
      return false;
    }

    if (saturation > 360 || saturation < 0) {
      console.warn(
        `The saturation cannot be larger than 100 or negative. It was ${saturation}`
      );
      return false;
    }

    if (lightness > 360 || lightness < 0) {
      console.warn(
        `The lightness  cannot be larger than 100 or negative. It was ${lightness}`
      );
      return false;
    }

    this.hsl.hue = hue;
    this.hsl.saturation = saturation;
    this.hsl.lightness = lightness;

    const rgb = Color.hsl2rgb(hue, saturation, lightness);

    this.rgb = rgb;

    const hex = Color.rgbToHex(rgb.red, rgb.green, rgb.blue);
    if (hex) {
      this.hex = hex;
    }

    return this;
  }

  /**
   * Will set the color by using the hex format
   * @param {String} hex The hex-value of the color
   * @returns {Color} The Color-Object
   */
  setHexValue(hex) {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    if (!regex.test(hex)) {
      console.warn(`${hex} is not a correct hex-value`);
      return false;
    }
    this.hex = hex;

    const rgb = Color.hexToRgb(hex);
    if (rgb) {
      this.rgb = rgb;
      const hsl = Color.rgb2Hsl(rgb.red, rgb.green, rgb.blue);
      this.hsl = hsl;
    }

    return this;
  }

  /**
   * Will invert the color
   * @returns {Color} The newly inverted Color Object
   */
  invert() {
    let newRed = 255 - this.rgb.red;
    let newGreen = 255 - this.rgb.green;
    let newBlue = 255 - this.rgb.blue;
    this.setRgbValue(newRed, newGreen, newBlue);
    return this;
  }

  /**
   * Will convert a rgb value to the hsl format
   * @param {Number} red The red color value (0 - 255)
   * @param {Number} green The green color value (0 - 255)
   * @param {Number} blue The blue color value (0 - 255)
   * @returns {Object} An Object containing the color in the hsl format
   */
  static rgb2Hsl(red, green, blue) {
    red /= 255;
    green /= 255;
    blue /= 255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);

    let hue;
    let saturation;
    let lightness = (max + min) / 2;

    if (max == min) {
      // achromatic
      hue = 0;
      saturation = 0;
    } else {
      let diff = max - min;
      saturation =
        lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);

      switch (max) {
        case red:
          hue = (green - blue) / diff + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / diff + 2;
          break;
        case blue:
          hue = (red - green) / diff + 4;
          break;
      }

      hue /= 6;
    }

    return {
      hue: hue * 360,
      saturation: saturation * 100,
      lightness: lightness * 100
    };
  }

  /**
   * Will convert a hsl value to the rgb format
   * @param {Number} hue The hue of the color (0 - 360)
   * @param {Number} saturation The percentage of the saturation (0 - 100)
   * @param {Number} lightness The percentage of the lightness (0 - 100)
   */
  static hsl2rgb(hue, saturation, lightness) {
    saturation /= 100;
    lightness /= 100;

    let a = saturation * Math.min(lightness, 1 - lightness);
    let f = (n, k = (n + hue / 30) % 12) => {
      return lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };

    return {
      red: Math.floor(f(0) * 255),
      green: Math.floor(f(8) * 255),
      blue: Math.floor(f(4) * 255)
    };
  }

  /**
   * Converts the given hex value to rgb
   * @param {String} hex The hex value of the color
   * @returns {Object} The converted red, green and blue values or false if no valid hex was passed;
   */
  static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      console.warn(`${hex} is not a valid hex-value so it cannot be converted`);
      return false;
    }

    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    };
  }

  /**
   * Converts a rgb value to its corresponding hex value
   * @param {Number} red The red color value (0 - 255)
   * @param {Number} green The green color value (0 - 255)
   * @param {Number} blue The blue color value (0 - 255)
   * @returns {String} The color in a hex value
   */
  static rgbToHex(red, green, blue) {
    if (
      red > 255 ||
      green > 255 ||
      blue > 255 ||
      red < 0 ||
      green < 0 ||
      blue < 0
    ) {
      console.warn(
        `Either the red, green or blue value is out of bounds. It has to be between 0 and 255`
      );
    }

    let hexRed = red.toString(16);
    let hexGreen = green.toString(16);
    let hexBlue = blue.toString(16);
    hexRed = hexRed.length == 1 ? "0" + hexRed : hexRed;
    hexGreen = hexGreen.length == 1 ? "0" + hexGreen : hexGreen;
    hexBlue = hexBlue.length == 1 ? "0" + hexBlue : hexBlue;

    return `#${hexRed}${hexGreen}${hexBlue}`;
  }

  /**
   * Will search an array of colors and return the one that matches the
   * first given color the closest based on the squared rgb difference.
   * @param {Color} color A color that should be searched for
   * @param {Color[]} colorArray An array containing several colors.
   * @returns {Color} The color matching the first parameter the closest will be returned
   */
  static getColorClosestByRgb(targetColor, colorArray) {
    let colorDiffs = colorArray.map(arrayColor => {
      return Color.colorDiffByRgb(arrayColor, targetColor);
    });

    let smallestDiff = 1000;
    let smallestIndex;
    colorDiffs.map((el, index) => {
      smallestIndex = el < smallestDiff ? index : smallestIndex;
      smallestDiff = el < smallestDiff ? el : smallestDiff;
    });

    return colorArray[smallestIndex];
  }

  /**
   * Will search an array of colros and return the one that matches
   * the first given color the closest based on the hue.
   * @param {Color} targetColor The color that should be searched for
   * @param {Color[]} colorArray An array containing colors.
   * @returns {Color} The color matching the first parameter the closest will be returned
   */
  static getColorClosestByHue(targetColor, colorArray) {
    var colorDiffs = colorArray.map(arrayColor => {
      return Color.getHueDistance(arrayColor.hsl.hue, targetColor.hsl.hue);
    });

    let smallestDiff = 1000;
    let smallestIndex;
    colorDiffs.map((el, index) => {
      smallestIndex = el < smallestDiff ? index : smallestIndex;
      smallestDiff = el < smallestDiff ? el : smallestDiff;
    });

    return colorArray[smallestIndex];
  }

  /**
   * Will search an array of colros and return the one that matches
   * the first given color the closest based on the hue, saturation and lightness.
   * @param {Color} targetColor The color that should be searched for
   * @param {Color[]} colorArray An array containing colors.
   * @returns {Color} The color matching the first parameter the closest will be returned
   */
  static getColorClosestByHsl(targetColor, colorArray) {
    var colorDiffs = colorArray.map(
      arrayColor =>
        Math.abs(Color.colorNum(arrayColor) - Color.colorNum(targetColor)) +
        Color.getHueDistance(arrayColor.hsl.hue, targetColor.hsl.hue)
    );

    let smallestDiff = 1000;
    let smallestIndex;
    colorDiffs.map((el, index) => {
      smallestIndex = el < smallestDiff ? index : smallestIndex;
      smallestDiff = el < smallestDiff ? el : smallestDiff;
    });

    return colorArray[smallestIndex];
  }

  /**
   * Calculates the squred difference between all red, green and blue values
   * @param {Color} color1 The first color
   * @param {Color} color2 The second color
   * @returns {Number} The calculated difference
   */
  static colorDiffByRgb(color1, color2) {
    return Math.sqrt(
      (color1.rgb.red - color2.rgb.red) * (color1.rgb.red - color2.rgb.red) +
        (color1.rgb.green - color2.rgb.green) *
          (color1.rgb.green - color2.rgb.green) +
        (color1.rgb.blue - color2.rgb.blue) *
          (color1.rgb.blue - color2.rgb.blue)
    );
  }

  /**
   * Will return the distance between 2 hues
   * @param {Number} hue1 The hue of the first color
   * @param {Number} hue2 The hue of the second color
   * @returns {Number} The distance between the hues
   */
  static getHueDistance(hue1, hue2) {
    d = Math.abs(hue1 - hue2);
    return d > 180 ? 360 - d : d;
  }

  /**
   * Converts a number to it's number value
   * @param {Color} color The color that should be converted
   * @returns {Number}
   */
  static colorNum(color) {
    let factorSat = 1;
    let factorLi = 1;
    return color.hsl.saturation * factorSat + color.hsl.lightness * factorLi;
  }
}
