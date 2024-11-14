const openMenuIcon = document.getElementById("open-menu");
const menuContainer = document.getElementById("menu-container");
const closeMenuIcon = document.getElementById("close-menu");

function OpenMenu() {
  this.setAttribute("aria-expanded", "true");
  openMenuIcon.classList.add("hide");
  menuContainer.classList.remove("hide");
  closeMenuIcon.focus();
  closeMenuIcon.setAttribute("aria-expanded", "true");
}

function CloseMenu() {
  this.setAttribute("aria-expanded", "false");
  openMenuIcon.classList.remove("hide");
  openMenuIcon.focus();
  menuContainer.classList.add("hide");
  menuContainer.setAttribute("aria-hidden", "true");
  openMenuIcon.setAttribute("aria-expanded", "false");
}

function OpenAndCloseMenu() {
  openMenuIcon.addEventListener("click", OpenMenu);
  closeMenuIcon.addEventListener("click", CloseMenu);
}

OpenAndCloseMenu();