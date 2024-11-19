export default function JSCarousel({ carouselSelector, slideSelector }) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error("Specify a valid selector for the carousel.");
    return null;
  }

  const slides = carousel.querySelectorAll(slideSelector);
  if (!slides.length) {
    console.error("Specify a valid selector for slides.");
    return null;
  }

  let currentSlideIndex = 0;
  let prevButton, nextButton;

  // Helper utilities functions
  const addElement = (tag, attributes, children) => {
    const element = document.createElement(tag);

    if (attributes) {
      // set attributes to the element
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (children) {
      // set content to the element
      if (typeof children === "string") {
        element.textContent = children;
      } else {
        children.forEach((child) => {
          if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
          } else {
            element.appendChild(child);
          }
        });
      }
    }
    return element;
  };

  const tweakStructure = () => {
    // create inner element to wrap all the slides
    const carouselInner = addElement("div", {
      class: "carousel-inner",
    });
    carousel.insertBefore(carouselInner, slides[0]);
    // move slides into the inner element and rearrange
    slides.forEach((slide, index) => {
      carouselInner.appendChild(slide);
      slide.style.transform = `translateX(${index * 100}%)`;
    });
    prevButton = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--prev",
      },
      "<"
    );
    carouselInner.appendChild(prevButton);

    nextButton = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--next",
      },
      ">"
    );
    carouselInner.appendChild(nextButton);
  };

  const adjustSlidePosition = () => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
    });
  };

  const updateCarouselState = () => {
    adjustSlidePosition();
  };

  // Slide movement logic
  const moveSlide = (direction) => {
    const newSlideIndex =
      direction === "next"
        ? (currentSlideIndex + 1) % slides.length
        : (currentSlideIndex - 1 + slides.length) % slides.length;
    currentSlideIndex = newSlideIndex;
    updateCarouselState();
  };

  const handlePrevButtonClick = () => moveSlide("prev");
  const handleNextButtonClick = () => moveSlide("next");

  // Attach event listeners
  const attachEventListeners = () => {
    prevButton.addEventListener("click", handlePrevButtonClick);
    nextButton.addEventListener("click", handleNextButtonClick);
  };

  const create = () => {
    tweakStructure();
    attachEventListeners();
  };

  const destroy = () => {
    prevButton.removeEventListener("click", handlePrevButtonClick);
    nextButton.removeEventListener("click", handleNextButtonClick);
  };

  return { create, destroy };
}
