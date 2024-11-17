// Load CSS
import "./style.css";
import MobileMenu from "./mobile-menu";

const dropDowns = document.querySelectorAll(".dropdown");
const navMenus = document.querySelectorAll(".nav-icon");

const mobileMenu = MobileMenu();

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

navMenus.forEach((menu) => {
  menu.addEventListener("click", mobileMenu.addDropDownMenu);
});

// navMenus.addEventListener("click", mobileMenu.addDropDownMenu);

// navMenus.forEach((menu) => {
//   menu.addEventListener("click", mobileMenu.addDropDownMenu());
// });
