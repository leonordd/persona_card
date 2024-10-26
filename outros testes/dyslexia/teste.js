 // JavaScript para seguir o cursor com a máscara
 const mask = document.getElementById('mask');

 document.addEventListener('mousemove', (event) => {
     const mouseX = event.pageX;
     const mouseY = event.pageY;

     // Atualiza a posição da máscara para seguir o cursor
     //mask.style.left = (mouseX - 250) + 'px';
     mask.style.top = (mouseY - 50) + 'px';
 });

const img = document.querySelector("img");
const click = document.querySelector(".click");
img.addEventListener("click", function(){
    mask.classList.remove("mask");
})

click.addEventListener("click", function(){
    mask.classList.add("mask");
})