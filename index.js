const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const slider3 = document.getElementById("slider3");

const config1 = {
  showNavigationButtons: true,
  autoScroll: true,
};

createSlider.init(slider1, config1);
createSlider.init(slider2);
createSlider.init(slider3);
