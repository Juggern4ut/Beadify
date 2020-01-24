const addRedColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(0,100%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(0, 100, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};

const addGreenColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(120,100%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(120, 100, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};

const addBlueColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(240,100%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(240, 100, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};

const addYellowColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(60,100%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(60, 100, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};

const addBlackColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(0,0%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(0, 0, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};

const addOrangeColorSet = lightbox => {
  const addRed = document.createElement("div");
  addRed.style.cursor = "pointer";
  for (let i = 1; i < 11; i++) {
    let tmp = document.createElement("div");
    tmp.style.cssText = `border: 1px solid #000; width: 10px; height: 10px; background-color: hsl(30,100%,${i *
      10}%); display: inline-block; margin-right: 5px`;
    addRed.append(tmp);
  }
  addRed.onclick = () => {
    for (let i = 1; i < 11; i++) {
      colorArray.push(new Color().setHslValue(30, 100, i * 10));
    }

    redrawSelectedColors();
    lightbox.close();
  };
  return addRed;
};
