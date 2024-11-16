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
      //menuContainer.setAttribute("aria-hidden", "false");
      closeMenuIcon.focus();
    }
  
    function CloseMenu() {
      this.setAttribute("aria-expanded", "false");
      menuContainer.classList.add("hide");
      //menuContainer.setAttribute("aria-hidden", "true");
      openMenuIcon.focus();
    }
  
    openMenuIcon.addEventListener("click", OpenMenu);
    closeMenuIcon.addEventListener("click", CloseMenu);
  



  });

  /*DROPDOWN MENU PARA TODOS OS BOTÕES*/
  /*function myFunction(event) {
    event.stopPropagation(); // Impede a propagação do clique
  
    // Seleciona o dropdown pelo ID
    const dropdown = document.getElementById("myDropdown");
    
    // Alterna a classe 'show' no dropdown
    dropdown.classList.toggle("show");
  }
  
  // Fecha o dropdown se o usuário clicar fora dele
  window.onclick = function(event) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
  
    // Itera sobre todos os dropdowns para fechá-los
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  };*/

  // Seleciona o contêiner pai da navegação
const navMenu = document.querySelector('#menu-wrapper');

// Adiciona o evento de clique ao contêiner pai
navMenu.addEventListener('click', function(event) {
  // Verifica se o alvo do clique é um botão com a classe 'dropbtn'
  if (event.target.closest('.dropbtn')) {
    const button = event.target.closest('.dropbtn');
    const dropdown = button.nextElementSibling; // Seleciona o menu dropdown correspondente
    
    // Fecha todos os outros dropdowns antes de abrir o atual
    closeAllDropdowns();

    // Alterna a visibilidade do menu dropdown correspondente
    dropdown.classList.toggle('show');
    event.stopPropagation(); // Evita que o clique feche o menu via window.onclick
  }
});

// Fecha todos os dropdowns se o usuário clicar fora
window.addEventListener('click', function() {
  closeAllDropdowns();
});

// Fecha todos os menus dropdown
function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown-content.show');
  dropdowns.forEach((dropdown) => dropdown.classList.remove('show'));
}

  

  
  