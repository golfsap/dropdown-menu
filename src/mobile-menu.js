export default function MobileMenu() {
  const addDropDownMenu = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("visible");
  };

  const addNavMenu = (e) => {
    const navList = e.currentTarget.parentNode;
    for (let i = 0; i < navList.children.length; i++) {
      if (e.currentTarget === navList.children[i]) {
        e.currentTarget.classList.add("selected");
      } else {
        navList.children[i].classList.remove("selected");
      }
    }
  };

  return {
    addDropDownMenu,
    addNavMenu,
  };
}
