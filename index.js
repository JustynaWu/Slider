const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");

const config1 = {
  autoplay: true,
  showNavigationButtons: true,
};

createSlider.init(slider1, config1);
createSlider.init(slider2);
