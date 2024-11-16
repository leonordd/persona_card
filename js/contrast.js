window.addEventListener("load", () => {

const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
const defaultTheme = 'black';

const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  document.documentElement.setAttribute("data-selected-theme", theme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
};

const handleThemeSelection = (event) => {
  const target = event.target;
  const isPressed = target.getAttribute('aria-pressed');
  const theme = target.getAttribute('data-theme');        
  
  if(isPressed !== "true") {
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme);
  }
}

const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme');
  if(savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
  }
};

setInitialTheme();

const themeSwitcher = document.querySelector('.theme-switcher');
const buttons = themeSwitcher.querySelectorAll('button');

buttons.forEach((button) => {
   button.addEventListener('click', handleThemeSelection);
});

  // Seleciona todos os botões do tema
  const themeButtons = document.querySelectorAll('.theme-btn');

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe "active" de todos os botões
      themeButtons.forEach(btn => btn.classList.remove('active'));

      // Adiciona a classe "active" ao botão clicado
      button.classList.add('active');
    });
  });

});