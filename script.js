const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn')
const successSound = new Audio('success.mp3'); // Sonido para cuando adivina correctamente

let secretNumber;
let attempts;
let maxAttempts = 10; 


function initGame() {
 // Genera un numero aleatorio entre 1 y 100
    secretNumber= Math.floor(Math.random()*100)+1;

    // reincia los intentos
    attempts=0;

    //limpia el campo de entrada
    input.value = '';

    //Habilita el campo de entrada y el boton de adivinar..
    input.disabled = false;
    form.querySelector('button').disabled = false; 

    //limpiar el mensaje mostrado
    messageEl.textContent = '¡Nuevo juego iniciado! Intenta adivinar el número.';

}

 //Llama la función de inicialización.
initGame();

form.addEventListener('submit', function (event){
event.preventDefault();

//Leer el valor del input
const guess = parseInt(input.value, 10);

//valida que numero este entre 1 y 100
if (!input.value || isNaN(guess) || guess < 1 || guess > 100) {
    messageEl.textContent = 'Por Favor, ingresa un número valido entre 1 y 100.';
    return;
}

//Aumnentar el numero de intentos 
attempts++;

// comparar el numero ingresado con el numero secreto 
if (guess === secretNumber){
    successSound.play(); // Reproduce el sonido de éxito
    messageEl.textContent  = `🎉 ¡Felicidades! Adivinaste el número en ${attempts} intentos.`;
    input.disabled = true;
    form.querySelector('button').disabled = true;
    return;
}

//si no acerto, dar una pista
if (guess < secretNumber) {
     messageEl.textContent =`🔺 El número secreto es mayor. Te quedan ${maxAttempts - attempts} intentos.`;
} else {   
     messageEl.textContent = `🔻 El número secreto es menor.Te quedan ${maxAttempts - attempts} intentos.`;
}

//verificar si se agotaron los intentos
if (attempts >=  maxAttempts) {
messageEl.textContent = `❌ Se acabaron los intentos. El número era ${secretNumber}.`;
    input.disabled = true;
    form.querySelector('button').disabled = true;
}
});


//Escuchar el clic en el botón de reiniciar
resetBtn.addEventListener('click', function (){
    initGame();
});