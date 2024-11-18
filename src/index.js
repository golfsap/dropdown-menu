// Load CSS
import "./style.css";
import MobileMenu from "./mobile-menu";

// Dropdown Buttons
const dropDowns = document.querySelectorAll(".dropdown");

const addDropdowntoBtn = (e) => {
  e.target.nextElementSibling.classList.toggle("visible");
};

const addHoverDropdowntoBtn = (e) => {
  if (!e.target.nextElementSibling.classList.contains("visible")) {
    e.target.nextElementSibling.classList.add("visible");
  }
};

const clickLink = (e) => {
  e.preventDefault();
  console.log(e.currentTarget.parentNode);
  e.currentTarget.parentNode.classList.toggle("visible");
};

for (let i = 0; i < dropDowns.length; i++) {
  const dropDownBtn = dropDowns[i].querySelector("button");
  if (dropDownBtn.classList.contains("hover")) {
    dropDownBtn.addEventListener("mouseenter", addHoverDropdowntoBtn);
  }
  dropDownBtn.addEventListener("click", addDropdowntoBtn);
  const listItems = dropDowns[i].querySelectorAll("li");
  for (let j = 0; j < listItems.length; j++) {
    listItems[j].addEventListener("click", clickLink);
  }
}

// Navigation Menus
const navMenus = document.querySelectorAll(".nav-icon");
const navBar = document.querySelector(".nav").querySelectorAll("li");

const mobileMenu = MobileMenu();

navMenus.forEach((menu) => {
  menu.addEventListener("click", mobileMenu.addDropDownMenu);
});

navBar.forEach((item) => {
  item.addEventListener("click", mobileMenu.addNavMenu);
});

// Image carousel
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

const images = Array.from(document.getElementsByClassName("carousel-img"));
const totalImages = images.length;
let currentImgIndex = 0;

function addTransitionEffectToImages() {
  images.forEach((img) => {
    img.style.transition = "transform 0.8s ease";
  });
}

function showNextImage() {
  if (currentImgIndex == totalImages - 1) {
    resetCarousel();
    return;
  }
  if (currentImgIndex === 0) addTransitionEffectToImages();
  images.forEach((img) => {
    img.style.transform = `translate(${(currentImgIndex + 1) * 100}%)`;
  });
  currentImgIndex++;
}

function resetCarousel() {
  images.forEach((img) => {
    img.style.transition = "none";
    img.style.transform = "translate(0)";
  });
  currentImgIndex = 0;
}

function showPrevImage() {
  if (currentImgIndex === 0) {
    return;
  }
  images.forEach((img) => {
    img.style.transform = `translate(${(currentImgIndex - 1) * -100}%)`;
  });
  currentImgIndex--;
}
