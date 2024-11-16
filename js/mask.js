 // JavaScript para seguir o cursor com a máscara
 const mask = document.getElementById('mask');

 document.addEventListener('mousemove', (event) => {
     const mouseX = event.pageX;
     const mouseY = event.pageY;

     // Atualiza a posição da máscara para seguir o cursor
     //mask.style.left = (mouseX - 250) + 'px';
     mask.style.top = (mouseY - 50) + 'px';
 });

/*const on = document.querySelector(".on");
const off = document.querySelector(".off");

off.addEventListener("click", function(){
    mask.classList.remove("mask");
})

on.addEventListener("click", function(){
    mask.classList.add("mask");
})*/

const slider = document.getElementById('font-size-mask');
const heightValueLabel = document.getElementById('mask-height-value');

const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('status');

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        statusText.textContent = 'ON';
        mask.classList.add("mask");
        slider.disabled = false;
    } else {
        statusText.textContent = 'OFF';
        mask.classList.remove("mask");
        slider.disabled = true;
    }
});

slider.addEventListener('input', function(event) {
  const heightValue = event.target.value;
  document.querySelector('.mask').style.height = `${heightValue}%`;
  heightValueLabel.textContent = heightValue; // Atualiza o valor no label
});
