const sliderRoot1 = document.getElementById("slider1");
const sliderRoot2 = document.getElementById("slider2");
const sliderRoot3 = document.getElementById("slider3");

const config1 = {
  showNavigationButtons: true,
  autoScroll: true,
};

const slider1 = new Slider(sliderRoot1, config1);
const slider2 = new Slider(sliderRoot2);
const slider3 = new Slider(sliderRoot3);
