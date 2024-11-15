window.addEventListener("load", () => {
    const openMenuIcon = document.getElementById("open-menu");
    const menuContainer = document.getElementById("menu-container");
    const closeMenuIcon = document.getElementById("close-menu");
    
    function setFocusableElements(enable) {
      focusableElements.forEach((el) => {
        if (enable) {
          el.removeAttribute("tabindex");
        } else {
          el.setAttribute("tabindex", "-1");
        }
      });
    }
  
    function OpenMenu() {
      this.setAttribute("aria-expanded", "true");
      menuContainer.classList.remove("hide");
      menuContainer.setAttribute("aria-hidden", "false");
      closeMenuIcon.focus();
    }
  
    function CloseMenu() {
      this.setAttribute("aria-expanded", "false");
      menuContainer.classList.add("hide");
      menuContainer.setAttribute("aria-hidden", "true");
      openMenuIcon.focus();
    }
  
    openMenuIcon.addEventListener("click", OpenMenu);
    closeMenuIcon.addEventListener("click", CloseMenu);
  
  });
  