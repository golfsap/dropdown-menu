export default function MobileMenu() {
  const addDropDownMenu = (e) => {
    // console.log(e.currentTarget.nextElementSibling);
    e.currentTarget.nextElementSibling.classList.toggle("visible");
  };

  return {
    addDropDownMenu,
  };
}
