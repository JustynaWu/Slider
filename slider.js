const SLIDER_CLASSES = {
  LIST: ".slider-list",
  ITEM: ".slider-item",
  ITEM_ACTIVE: "slider-item-active",
  PLACEHOLDER: ".placeholder",
  ADD_SHOW_PLACEHOLDER: "show-placeholder",
  NAVIGATION_BUTTONS: ".navigation-buttons",
  ADD_NAVIGATION_BUTTONS: "showNavigationButtons",
  BTN_PREV: ".btn-prev",
  BTN_NEXT: ".btn-next",
};

const createSlider = (function () {
  const getSlides = (sliderRoot) => {
    const list = sliderRoot.querySelector(SLIDER_CLASSES.LIST);
    const slides = list.querySelectorAll(SLIDER_CLASSES.ITEM);
    return slides;
  };

  const getPlaceholder = (sliderRoot) => {
    sliderRoot
      .querySelector(SLIDER_CLASSES.PLACEHOLDER)
      .classList.add(SLIDER_CLASSES.ADD_SHOW_PLACEHOLDER);
  };

  const getButtons = (sliderRoot) => {
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

  const getPrevSlideIndex = (activeSlideIndex, slides) => {
    return activeSlideIndex === 0 ? slides.length - 1 : activeSlideIndex - 1;
  };

  const getNextSlideIndex = (activeSlideIndex, slides) => {
    return activeSlideIndex >= slides.length - 1 ? 0 : activeSlideIndex + 1;
  };

  const getPrevSlide = (slides, activeSlideIndex) => {
    const prevIndex = getPrevSlideIndex(activeSlideIndex, slides);
    slides.forEach((slide) =>
      slide.classList.remove(SLIDER_CLASSES.ITEM_ACTIVE)
    );
    slides[prevIndex].classList.add(SLIDER_CLASSES.ITEM_ACTIVE);

    return prevIndex;
  };

  const getNextSlide = (slides, activeSlideIndex) => {
    const nextIndex = getNextSlideIndex(activeSlideIndex, slides);
    slides.forEach((slide) =>
      slide.classList.remove(SLIDER_CLASSES.ITEM_ACTIVE)
    );
    slides[nextIndex].classList.add(SLIDER_CLASSES.ITEM_ACTIVE);

    return nextIndex;
  };

  let scrollTimer;
  const autoScrollHandler = (slides, activeSlideIndex) => {
    scrollTimer = setInterval(() => {
      activeSlideIndex = getNextSlide(slides, activeSlideIndex);
    }, 3000);
  };

  const stopAutoScrollHandler = () => clearInterval(scrollTimer);

  const init = (sliderRoot, config) => {
    const slides = getSlides(sliderRoot);
    const buttons = getButtons(sliderRoot);
    let activeSlideIndex = 0;

    const defaultConfig = {
      showNavigationButtons: false,
      autoScroll: true,
    };

    if (slides.length === 0) {
      return getPlaceholder(sliderRoot);
    }

    buttons.nextButton.addEventListener("click", () => {
      activeSlideIndex = getNextSlide(slides, activeSlideIndex);
    });

    buttons.prevButton.addEventListener("click", () => {
      activeSlideIndex = getPrevSlide(slides, activeSlideIndex);
    });

    if (!config) {
      config = defaultConfig;
    } else {
      config = Object.assign(defaultConfig, config);
    }

    config.showNavigationButtons
      ? sliderRoot
          .querySelector(SLIDER_CLASSES.NAVIGATION_BUTTONS)
          .classList.add(SLIDER_CLASSES.ADD_NAVIGATION_BUTTONS)
      : sliderRoot
          .querySelector(SLIDER_CLASSES.NAVIGATION_BUTTONS)
          .classList.remove(SLIDER_CLASSES.ADD_NAVIGATION_BUTTONS);

    config.autoScroll
      ? autoScrollHandler(slides, activeSlideIndex)
      : stopAutoScrollHandler();
  };

  return {
    init,
    SLIDER_CLASSES,
  };
})();
