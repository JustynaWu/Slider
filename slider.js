const SLIDER_CLASSES = {
  LIST: ".slider-list",
  ITEM: ".slider-item",
  ACTIVE_ITEM: ".slider-item active",
  PLACEHOLDER: ".placeholder",
  ADD_SHOW_PLACEHOLDER: "show-placeholder",
  NAVIGATION_BUTTONS: ".navigation-buttons",
  ADD_NO_NAVIGATION_BUTTONS: "no-navigation",
  BTN_PREV: ".btn-prev",
  BTN_NEXT: ".btn-next",
};

const createSlider = (function () {
  let activeSlideIndex;

  const getSlides = (sliderRoot) => {
    let slides;
    const list = sliderRoot.querySelector(SLIDER_CLASSES.LIST);
    slides = list.querySelectorAll(SLIDER_CLASSES.ITEM);

    const showPlaceholder = () => {
      sliderRoot
        .querySelector(SLIDER_CLASSES.PLACEHOLDER)
        .classList.add(SLIDER_CLASSES.ADD_SHOW_PLACEHOLDER);
    };
    return slides.length > 0 ? slides : showPlaceholder();
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
    return activeSlideIndex === slides.length - 1 ? 0 : activeSlideIndex + 1;
  };

  const getPrevSlide = () => {
    const prevIndex = getPrevSlideIndex(activeSlideIndex, slides);

    slides[activeSlideIndex].classList.remove("active");
    slides[prevIndex].classList.add("active");

    return (activeSlideIndex = prevIndex);
  };

  const getNextSlide = () => {
    const nextIndex = getNextSlideIndex(activeSlideIndex, slides);

    slides[activeSlideIndex].classList.remove("active");
    slides[nextIndex].classList.add("active");

    return (activeSlideIndex = nextIndex);
  };

  let scrollTimer;
  const autoScrollHandler = () => {
    scrollTimer = setInterval(() => {
      getNextSlide();
    }, 3000);
  };
  const stopAutoScrollHandler = () => clearInterval(scrollTimer);

  const init = (sliderRoot, config) => {
    activeSlideIndex = 0;
    slides = getSlides(sliderRoot);
    const buttons = getButtons(sliderRoot);

    buttons.nextButton.addEventListener("click", () => {
      getNextSlide();
    });

    buttons.prevButton.addEventListener("click", () => {
      getPrevSlide();
    });

    if (config) {
      if (config.showNavigationButtons) {
        buttons;
      } else {
        sliderRoot
          .querySelector(SLIDER_CLASSES.NAVIGATION_BUTTONS)
          .classList.add(SLIDER_CLASSES.ADD_NO_NAVIGATION_BUTTONS);
      }

      if (config.autoScroll) {
        autoScrollHandler();
      } else {
        stopAutoScrollHandler();
      }
    }
  };

  return {
    init,
  };
})();
