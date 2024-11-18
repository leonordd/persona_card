// Elementos da DOM
const voiceToggle = document.getElementById('voiceToggle');
const contentArea = document.getElementById('contentArea');
const speedRange = document.getElementById('speechSpeed'); 
const speedValue = document.getElementById('speedValue');

let utterance;
let isSpeaking = false;
let isPaused = false;

// Função para devolver palavras em spans e destacar palavras enquanto são ditadas
function createUtteranceForElement(element) {
  const words = element.textContent.split(/\s+/); // Divide as palavras, preservando espaços
  element.innerHTML = ''; // Limpa o conteúdo anterior

  // Adiciona spans para cada palavra com um espaço restaurado
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word; // Define o texto do span
    element.appendChild(span);

    // Adiciona um espaço após a palavra, exceto na última
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  const wordElements = element.querySelectorAll('span');

  const newUtterance = new SpeechSynthesisUtterance(element.textContent);
  newUtterance.rate = parseFloat(speedRange.value); // Define a velocidade de leitura

  let wordIndex = 0;
  newUtterance.onboundary = (event) => {
    if (event.name === 'word' && wordElements[wordIndex]) {
      wordElements.forEach(el => el.classList.remove('highlighted'));
      wordElements[wordIndex].classList.add('highlighted');
      wordIndex++;
    }
  };

  newUtterance.onend = () => {
    wordElements.forEach(el => el.classList.remove('highlighted'));
    isSpeaking = false; // A leitura termina
  };

  return newUtterance;
}

// Evento para ajustar a velocidade da voz
speedRange.addEventListener('input', () => {
  speedValue.textContent = speedRange.value; // Exibe o valor da velocidade
  if (isSpeaking && isPaused) {
    utterance.rate = parseFloat(speedRange.value); // Altera a taxa de leitura
  }
});

// Evento de clique para controlar a leitura
contentArea.addEventListener('click', (e) => {
  if (voiceToggle.checked) {
    const clickedElement = e.target;
    const synth = window.speechSynthesis;

    // Cancela qualquer leitura anterior
    if (isSpeaking) {
      synth.cancel();
    }

    // Remove o destaque de todas as palavras
    const allWords = contentArea.querySelectorAll('span');
    allWords.forEach(word => word.classList.remove('highlighted'));

    // Verifica se o elemento é uma imagem
    if (clickedElement.tagName === 'IMG') {
      const altText = clickedElement.alt;
      if (altText) {
        utterance = new SpeechSynthesisUtterance(altText);
        utterance.rate = parseFloat(speedRange.value);
        synth.speak(utterance);
        isSpeaking = true;
      } else {
        console.warn('Esta imagem não possui um texto alternativo (alt).');
      }
    } else if (clickedElement.tagName === 'H1' || clickedElement.tagName === 'H2' || clickedElement.tagName === 'P') {
      // Tratamento para texto
      utterance = createUtteranceForElement(clickedElement);
      synth.speak(utterance);
      isSpeaking = true;
    }
  }
});

const status2Text = document.getElementById('status2');

// Controla o ativar/desativar do botão de voz voz
voiceToggle.addEventListener('change', () => {
  if (!voiceToggle.checked) {
    window.speechSynthesis.cancel(); // Cancela a leitura se OFF
    isSpeaking = false;
    contentArea.classList.add('inactive'); // Desabilita navegação de texto com o teclado

    // Remove o destaque (highlight) de todas as palavras no texto
    const allHighlightedWords = contentArea.querySelectorAll('.highlighted');
    allHighlightedWords.forEach(word => word.classList.remove('highlighted'));

    // Remove o foco de todos os elementos
    const allFocusableElements = contentArea.querySelectorAll('[tabindex="0"]');
    allFocusableElements.forEach(element => {
      element.removeAttribute('tabindex');
    });
  } else {
    contentArea.classList.remove('inactive'); // Permite a navegação de texto com o teclado

    //Adiciona o tabindex para permitir navegação pelo teclado (tab)
    const allTextElements = contentArea.querySelectorAll('h1, h2, p, img');
    allTextElements.forEach(element => {
      element.setAttribute('tabindex', '0'); // Define o tabindex para permitir foco
    });
  }
  if (voiceToggle.checked) {
    status2Text.textContent = 'ON';
} else {
     status2Text.textContent = 'OFF';
    }
});


// Ativa a leitura com a tecla Enter
contentArea.addEventListener('keydown', (e) => {
  if (voiceToggle.checked && (e.key === 'Enter' || e.key === ' ')) {
    const focusedElement = document.activeElement;
    if (focusedElement && (focusedElement.tagName === 'H1' || focusedElement.tagName === 'H2' || focusedElement.tagName === 'P' || focusedElement.tagName === 'IMG')) {
      const synth = window.speechSynthesis;

      // Cancela qualquer leitura anterior
      if (isSpeaking) {
        synth.cancel();
      }

      // Remove o destaque de todas as palavras
      const allWords = contentArea.querySelectorAll('span');
      allWords.forEach(word => word.classList.remove('highlighted'));

      // Verifica se o elemento é uma imagem e lê o alt
      if (focusedElement.tagName === 'IMG') {
        const altText = focusedElement.alt;
        if (altText) {
          utterance = new SpeechSynthesisUtterance(altText);
          synth.speak(utterance);
          isSpeaking = true;
        }
      } else {
        // Cria o utterance para o texto do elemento
        utterance = createUtteranceForElement(focusedElement);
        synth.speak(utterance);
        isSpeaking = true;
      }
    }
  }
});


// Seleção dos elementos de toggle
const toggleButtons = document.querySelectorAll('.toggle-button input'); // Seleciona todos os inputs do tipo checkbox (toggle buttons)

// Função que adiciona suporte ao teclado para alternar o estado dos botões
toggleButtons.forEach(toggleButton => {
  // Adiciona tabindex para permitir a navegação via teclado
  toggleButton.setAttribute('tabindex', '0'); 

  // Adiciona evento de keydown para permitir alternar entre 'Enter' ou 'Space'
  toggleButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      toggleButton.checked = !toggleButton.checked;  // Alterna o estado do toggle
      toggleButton.dispatchEvent(new Event('change'));  // Corre o evento 'change'
    }
  });
});

// Evento para alternar o estado dos toggle buttons
toggleButtons.forEach(toggleButton => {
  toggleButton.addEventListener('change', () => {
    const toggleLabel = toggleButton.closest('.toggle-button');

    // Lógica específica para o estado de cada toggle
    if (toggleButton.id === 'voiceToggle') {
      // Altera o comportamento de leitura com voz e ativa ou desativa a leitura de voz
      if (toggleButton.checked) {
        contentArea.classList.remove('inactive');
      } else {
        contentArea.classList.add('inactive');
        window.speechSynthesis.cancel();
        isSpeaking = false;
      }
    } else if (toggleButton.id === 'toggleSwitch') {
      const mask = document.getElementById('mask');
      if (toggleButton.checked) {
        mask.style.display = 'block';
      } else {
        mask.style.display = 'none';
      }
    }
  });
});


