const fontSizeSlider = document.getElementById("font-size-slider");

// Seleciona todos os <p> e <h2> na página
const elements = document.querySelectorAll("p, h2, h1");

const navbar_elements = document.querySelectorAll("button>span");

//tamanhos de fonte iniciais de cada elemento
const originalFontSizes = Array.from(elements).map((element) => {
  return {
    element: element,
    baseFontSize: parseFloat(window.getComputedStyle(element).fontSize),
  };
});

fontSizeSlider.addEventListener("input", () => {
  const baseFontSize = fontSizeSlider.value;

  // Ajusta o tamanho da fonte proporcionalmente para cada elemento
  originalFontSizes.forEach(({ element, baseFontSize: initialSize }) => {
    const scaleFactor = initialSize / 200;
    element.style.fontSize = `${baseFontSize * scaleFactor}rem`;
  });
});