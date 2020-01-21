const size_slider = document.getElementById("size_slider");
size_slider.oninput = () => {
  document.getElementById("element_size").value = size_slider.value;
};

size_slider.addEventListener("change", () => {
  drawResult();
});
