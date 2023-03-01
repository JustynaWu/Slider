const sliderRoot1 = document.getElementById("slider1");
const sliderRoot2 = document.getElementById("slider2");
const sliderRoot3 = document.getElementById("slider3");

const config1 = {
  showNavigationButtons: true,
  autoScroll: true,
};

slider().init(sliderRoot1, config1);
slider().init(sliderRoot2);
slider().init(sliderRoot3);
