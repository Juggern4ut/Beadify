const getAverageColor = imageDataArray => {
  let counter = 0;
  let tmpColor = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0
  };
  for (let i = 0; i < imageDataArray.length; i++) {
    if (i % 4 === 0) {
      tmpColor.red += imageDataArray[i];
    } else if (i % 4 === 1) {
      tmpColor.green += imageDataArray[i];
    } else if (i % 4 === 2) {
      tmpColor.blue += imageDataArray[i];
    } else if (i % 4 === 3) {
      tmpColor.alpha += imageDataArray[i];
      counter++;
    }
  }
  let finalColor = {
    red: tmpColor.red / counter,
    green: tmpColor.green / counter,
    blue: tmpColor.blue / counter,
    alpha: tmpColor.alpha / counter
  };
  return finalColor;
};
