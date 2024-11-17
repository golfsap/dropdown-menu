// Load CSS
import "./style.css";

const dropDowns = document.querySelectorAll(".dropdown");
// const dropDownHover = document.querySelector(".dropdown-hover");

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

// dropDownBtn.addEventListener("click", addDropdowntoBtn);

// dropDownHover.addEventListener("mouseenter", (e) => {
//   console.log(e.currentTarget.firstElementChild.nextElementSibling);
//   e.currentTarget.firstElementChild.nextElementSibling.classList.toggle(
//     "visible"
//   );
//   // e.target.nextElementSibling.classList.toggle("visible");
// });
