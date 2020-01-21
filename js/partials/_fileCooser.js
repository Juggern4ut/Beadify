document.getElementById("fileChooser").addEventListener("change", e => {
  let filename = document.getElementById("fileChooser").files[0].name;
  if (filename) {
    document.querySelector(".form__label").innerHTML = filename;
  }
});
