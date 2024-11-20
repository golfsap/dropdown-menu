export default function JSCarousel({
  carouselSelector,
  slideSelector,
  enablePagination = true,
  enableAutoplay = true,
  autoplayInterval = 2000,
}) {
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
  let paginationContainer;
  let autoplayTimer;

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

    // Add pagination container if pagination is enabled
    if (enablePagination) {
      paginationContainer = addElement("nav", {
        class: "carousel-pagination",
        role: "tablist",
      });
      carousel.appendChild(paginationContainer);
    }

    // move slides into the inner element and rearrange
    slides.forEach((slide, index) => {
      carouselInner.appendChild(slide);
      slide.style.transform = `translateX(${index * 100}%)`;
      if (enablePagination) {
        const paginationButton = addElement(
          "button",
          {
            class: `carousel-btn carousel-btn--${index + 1}`,
            role: "tab",
          },
          `${index + 1}`
        );

        paginationContainer.appendChild(paginationButton);

        if (index === 0) {
          paginationButton.classList.add("carousel-btn--active");
          paginationButton.setAttribute("aria-selected", true);
        }

        paginationButton.addEventListener("click", () => {
          handlePaginationBtnClick(index);
        });
      }
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

  const updatePaginationBtns = () => {
    const btns = paginationContainer.children;
    const prevActiveBtns = Array.from(btns).filter((btn) =>
      btn.classList.contains("carousel-btn--active")
    );
    const currentActiveBtn = btns[currentSlideIndex];

    prevActiveBtns.forEach((btn) => {
      btn.classList.remove("carousel-btn--active");
      btn.removeAttribute("aria-selected");
    });
    if (currentActiveBtn) {
      currentActiveBtn.classList.add("carousel-btn--active");
      currentActiveBtn.setAttribute("aria-selected", true);
    }
  };

  const updateCarouselState = () => {
    if (enablePagination) {
      updatePaginationBtns();
    }
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

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      moveSlide("next");
    }, autoplayInterval);
  };

  const stopAutoplay = () => clearInterval(autoplayTimer);
  const handleMouseEnter = () => stopAutoplay();
  const handleMouseLeave = () => startAutoplay();

  // Attach event listeners
  const attachEventListeners = () => {
    prevButton.addEventListener("click", handlePrevButtonClick);
    nextButton.addEventListener("click", handleNextButtonClick);
    if (enableAutoplay && autoplayInterval !== null) {
      carousel.addEventListener("mouseenter", handleMouseEnter);
      carousel.addEventListener("mouseleave", handleMouseLeave);
    }
  };

  const handlePaginationBtnClick = (index) => {
    currentSlideIndex = index;
    updateCarouselState();
  };

  const create = () => {
    tweakStructure();
    attachEventListeners();
    if (enableAutoplay && autoplayInterval !== null) {
      startAutoplay();
    }
  };

  const destroy = () => {
    prevButton.removeEventListener("click", handlePrevButtonClick);
    nextButton.removeEventListener("click", handleNextButtonClick);
    if (enablePagination) {
      const paginationBtns =
        paginationContainer.querySelectorAll(".carousel-btn");
      if (paginationBtns.length) {
        paginationBtns.forEach((btn) => {
          btn.removeEventListener("click", handlePaginationBtnClick);
        });
      }
    }
    if (enableAutoplay && autoplayInterval !== null) {
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
      stopAutoplay();
    }
  };

  return { create, destroy };
}
