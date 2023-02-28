const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const slider3 = document.getElementById("slider3");

const config1 = {
  showNavigationButtons: true,
  autoScroll: true,
};

const config2 = {
  customPlaceholder: "https://via.placeholder.com/400x400",
};

createSlider.init(slider1, config1);
createSlider.init(slider2);
createSlider.init(slider3, config2);
