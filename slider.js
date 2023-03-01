const slider = function () {
  // config variables
  const SLIDER_CLASSES = {
    SLIDER_CONTAINER: ".slider-container",
    LIST: ".slider-list",
    ITEM: ".slider-item",
    ITEM_ACTIVE: "slider-item-active",
    PLACEHOLDER: ".placeholder",
    SHOW_PLACEHOLDER: "show-placeholder",
    NAVIGATION_BUTTONS: ".slider-navigation",
    BTN_PREV: ".slider-navigation-button-prev",
    BTN_NEXT: ".slider-navigation-button-next",
  };

  const defaultConfig = {
    showNavigationButtons: false,
    autoScroll: true,
    placeholder: "https://via.placeholder.com/400x200",
    intervalTime: 3000,
  };

  // state variables
  let sliderRoot;
  let activeSlideIndex = 0;
  let config = {};
  let slides = [];
  let buttons = { prevButton: undefined, nextButton: undefined };
  let timer;

  // functions that query DOM
  const getSlides = () => {
    const list = sliderRoot.querySelector(SLIDER_CLASSES.LIST);
    return list.querySelectorAll(SLIDER_CLASSES.ITEM);
  };

  const getButtons = () => {
    const navigation = sliderRoot.querySelector(
      SLIDER_CLASSES.NAVIGATION_BUTTONS
    );
    const prevButton = navigation.querySelector(SLIDER_CLASSES.BTN_PREV);
    const nextButton = navigation.querySelector(SLIDER_CLASSES.BTN_NEXT);

    return {
      prevButton,
      nextButton,
    };
  };

  const createSlide = (src, alt) => {
    const slide = document.createElement("li");
    slide.classList.add(".slider-item");
    slide.innerHTML = `<img
        width="400"
        height="200"
        class="image"
        src="${src}"
        alt="${alt}"
      />`;

    return slide;
  };

  const getPrevSlideIndex = () => {
    return activeSlideIndex === 0 ? slides.length - 1 : activeSlideIndex - 1;
  };

  const getNextSlideIndex = () => {
    console.log();
    return activeSlideIndex >= slides.length - 1 ? 0 : activeSlideIndex + 1;
  };

  const selectSlide = (newSlideIndex) => {
    slides.forEach((slide) =>
      slide.classList.remove(SLIDER_CLASSES.ITEM_ACTIVE)
    );
    slides[newSlideIndex].classList.add(SLIDER_CLASSES.ITEM_ACTIVE);
    activeSlideIndex = newSlideIndex;
  };

  const selectPrevSlide = () => {
    const prevSlideIndex = getPrevSlideIndex();
    selectSlide(prevSlideIndex);
    initAutoscroll();
  };

  const selectNextSlide = () => {
    const nextSlideIndex = getNextSlideIndex();
    selectSlide(nextSlideIndex);
    initAutoscroll();
  };

  const initPlaceholder = () => {
    if (slides.length > 0) {
      return;
    }

    const placeholderSlide = createSlide(config.placeholder, "Placeholder");
    const list = sliderRoot.querySelector(SLIDER_CLASSES.LIST);
    list.appendChild(placeholderSlide);
    slides = getSlides();
  };

  const initAutoscroll = () => {
    if (!config.autoScroll || slides.length === 0) {
      return;
    }

    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(() => selectNextSlide(), config.intervalTime);
  };

  const initNavigation = () => {
    if (!config.showNavigationButtons || slides.length < 2) {
      buttons.nextButton.remove();
      buttons.prevButton.remove();
    }

    buttons.nextButton.addEventListener("click", () => selectNextSlide());
    buttons.prevButton.addEventListener("click", () => selectPrevSlide());
  };

  const init = (customSliderRoot, customConfig) => {
    // init plugin main variables
    sliderRoot = customSliderRoot;
    config = Object.assign(defaultConfig, customConfig || {});
    slides = getSlides(sliderRoot);
    buttons = getButtons(sliderRoot);

    // init plugin functionality
    initPlaceholder();
    initAutoscroll();
    initNavigation();
  };

  return {
    init,
    SLIDER_CLASSES,
  };
};
