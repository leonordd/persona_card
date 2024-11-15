const fontSizeSlider = document.getElementById("font-size-slider");

// Seleciona todos os <p> e <h2> na página
const elements = document.querySelectorAll("p, h2, h1");

const navbar_elements = document.querySelectorAll("button>span");

// Armazena os tamanhos de fonte iniciais de cada elemento
const originalFontSizes = Array.from(elements).map((element) => {
  return {
    element: element,
    baseFontSize: parseFloat(window.getComputedStyle(element).fontSize),
  };
});

/*const originalFontSizes2 = Array.from(navbar_elements).map((element) => {
    return {
      element: element,
      baseFontSize: parseFloat(window.getComputedStyle(element).fontSize),
    };
  });*/

fontSizeSlider.addEventListener("input", () => {
  const baseFontSize = fontSizeSlider.value; // Valor do slider

  // Ajusta o tamanho da fonte proporcionalmente para cada elemento
  originalFontSizes.forEach(({ element, baseFontSize: initialSize }) => {
    const scaleFactor = initialSize / 200; // Supondo que 16px seja o tamanho base do slider
    element.style.fontSize = `${baseFontSize * scaleFactor}rem`;
  });

  /*originalFontSizes2.forEach(({ element, baseFontSize: initialSize }) => {
    const scaleFactor = initialSize / 200; // Supondo que 16px seja o tamanho base do slider
    element.style.fontSize = `${baseFontSize * scaleFactor}rem`;
  });*/
});