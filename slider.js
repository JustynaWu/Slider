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

const createSlider = (function () {
  const getSlides = (sliderRoot) => {
    const list = sliderRoot.querySelector(SLIDER_CLASSES.LIST);
    const slides = list.querySelectorAll(SLIDER_CLASSES.ITEM);
    return slides;
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

  const getPlaceholder = (sliderRoot, customPlaceholder) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("placeholder");
    const image = document.createElement("img");
    const imageParent = sliderRoot.querySelector(
      SLIDER_CLASSES.SLIDER_CONTAINER
    );
    image.src = customPlaceholder;
    image.alt = "Placeholder image";
    imageContainer.appendChild(image);
    imageParent.appendChild(imageContainer);

    sliderRoot.querySelector(SLIDER_CLASSES.NAVIGATION_BUTTONS).remove();
  };

  const getPrevSlideIndex = (activeSlideIndex, slides) => {
    return activeSlideIndex === 0 ? slides.length - 1 : activeSlideIndex - 1;
  };

  const getNextSlideIndex = (activeSlideIndex, slides) => {
    return activeSlideIndex >= slides.length - 1 ? 0 : activeSlideIndex + 1;
  };

  const selectSlide = (slides, newSlideIndex) => {
    slides.forEach((slide) =>
      slide.classList.remove(SLIDER_CLASSES.ITEM_ACTIVE)
    );
    slides[newSlideIndex].classList.add(SLIDER_CLASSES.ITEM_ACTIVE);
  };

  const getPrevSlide = (slides, activeSlideIndex) => {
    const prevSlideIndex = getPrevSlideIndex(activeSlideIndex, slides);
    selectSlide(slides, prevSlideIndex);

    return prevSlideIndex;
  };

  const getNextSlide = (slides, activeSlideIndex) => {
    const nextSlideIndex = getNextSlideIndex(activeSlideIndex, slides);
    selectSlide(slides, nextSlideIndex);

    return nextSlideIndex;
  };

  const autoScrollHandler = (slides, activeSlideIndex) => {
    setInterval(() => {
      activeSlideIndex = getNextSlide(slides, activeSlideIndex);
    }, 3000);
  };

  const init = (sliderRoot, customConfig) => {
    let activeSlideIndex = 0;

    const defaultConfig = {
      showNavigationButtons: false,
      autoScroll: true,
      customPlaceholder: "https://via.placeholder.com/400x200",
    };

    const config = Object.assign(defaultConfig, customConfig || {});

    const slides = getSlides(sliderRoot);
    const buttons = getButtons(sliderRoot);

    if (slides.length === 0) {
      getPlaceholder(sliderRoot, config.customPlaceholder);
    }

    const initAutoScroll = () => {
      if (config.autoScroll) {
        autoScrollHandler(slides, activeSlideIndex);
      }
    };

    const initNavigationButtons = () => {
      if (config.showNavigationButtons) {
        getButtons(sliderRoot);

        buttons.nextButton.addEventListener("click", () => {
          activeSlideIndex = getNextSlide(slides, activeSlideIndex);
        });
        buttons.prevButton.addEventListener("click", () => {
          activeSlideIndex = getPrevSlide(slides, activeSlideIndex);
        });
      } else {
        buttons.nextButton.remove();
        buttons.prevButton.remove();
      }
    };

    if (slides.length > 1) {
      initNavigationButtons();
      initAutoScroll();
    } else {
      buttons.nextButton.remove();
      buttons.prevButton.remove();
    }

    buttons.nextButton.removeEventListener("click", () => {
      activeSlideIndex = getNextSlide(slides, activeSlideIndex);
    });

    buttons.prevButton.removeEventListener("click", () => {
      activeSlideIndex = getPrevSlide(slides, activeSlideIndex);
    });
  };

  return {
    init,
    SLIDER_CLASSES,
  };
})();
