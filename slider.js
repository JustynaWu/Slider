const DEFAULT_CONFIG = {
  showNavigationButtons: false,
  autoScroll: true,
  placeholder: "https://via.placeholder.com/400x200",
  intervalTime: 3000,
};
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
/**
 * Class responsible for handling the slider initialization
 */
class Slider {
  /**
    Constructor - saves the parameters and default values.
   * After that it initiates (automatically - no need for manual initation) the class logic.
   * Parameters passed in the constructor are used in the init function.
   * @param customSliderRoot
   * @param customConfig
   */

  constructor(customSliderRoot, customConfig) {
    this.classes = SLIDER_CLASSES;
    this.defaultConfig = DEFAULT_CONFIG;
    this.sliderRoot;
    this.activeSlideIndex = 0;
    this.slides = [];
    this.buttons = { prevButton: null, nextButton: null };
    this.timer;
    this.init(customSliderRoot, customConfig);
  }

  getSlides() {
    const list = this.sliderRoot.querySelector(this.classes.LIST);
    const slides = list.querySelectorAll(this.classes.ITEM);
    return slides;
  }

  getButtons() {
    const navigation = this.sliderRoot.querySelector(
      this.classes.NAVIGATION_BUTTONS
    );
    const prevButton = navigation.querySelector(this.classes.BTN_PREV);
    const nextButton = navigation.querySelector(this.classes.BTN_NEXT);

    return {
      prevButton,
      nextButton,
    };
  }

  createSlide(src, alt) {
    const slide = document.createElement("li");
    slide.classList.add("slider-item.slider-item-active");
    slide.innerHTML = `<img
        width="400"
        height="200"
        class="image"
        src="${src}"
        alt="${alt}"
      />`;

    return slide;
  }

  getPrevSlideIndex() {
    return this.activeSlideIndex === 0
      ? this.slides.length - 1
      : this.activeSlideIndex - 1;
  }

  getNextSlideIndex() {
    return this.activeSlideIndex >= this.slides.length - 1
      ? 0
      : this.activeSlideIndex + 1;
  }

  selectSlide(newSlideIndex) {
    this.slides.forEach((slide) =>
      slide.classList.remove(this.classes.ITEM_ACTIVE)
    );
    this.slides[newSlideIndex].classList.add(this.classes.ITEM_ACTIVE);
    this.activeSlideIndex = newSlideIndex;
  }

  selectPrevSlide() {
    const prevSlideIndex = this.getPrevSlideIndex();
    this.selectSlide(prevSlideIndex);
    this.initAutoscroll();
  }

  selectNextSlide() {
    const nextSlideIndex = this.getNextSlideIndex();
    this.selectSlide(nextSlideIndex);
    this.initAutoscroll();
  }

  initPlaceholder() {
    if (this.slides.length > 0) {
      return;
    }
    const placeholderSlide = this.createSlide(
      this.config.placeholder,
      "Placeholder"
    );
    const list = this.sliderRoot.querySelector(this.classes.LIST);
    list.appendChild(placeholderSlide);
    this.slides = this.getSlides();
  }

  initAutoscroll() {
    if (!this.config.autoScroll || this.slides.length < 2) {
      return;
    }

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(
      () => this.selectNextSlide(),
      this.config.intervalTime
    );
  }

  initNavigation() {
    if (!this.config.showNavigationButtons || this.slides.length < 2) {
      this.buttons.nextButton.remove();
      this.buttons.prevButton.remove();
    }
    this.buttons.nextButton.addEventListener("click", () =>
      this.selectNextSlide()
    );
    this.buttons.prevButton.addEventListener("click", () =>
      this.selectPrevSlide()
    );
  }

  init(customSliderRoot, customConfig) {
    // init plugin main variables
    this.sliderRoot = customSliderRoot;
    this.slides = this.getSlides(this.sliderRoot);
    this.buttons = this.getButtons(this.sliderRoot);
    this.config = Object.assign(this.defaultConfig, customConfig || {});

    // init plugin functionality
    this.initPlaceholder();
    this.initAutoscroll();
    this.initNavigation();
  }
}
