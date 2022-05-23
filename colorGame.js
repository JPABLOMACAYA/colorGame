/* Arreglo de colores usado inicialmente. Luego la función randomColors() tomó el rol de asignar colores al azar */
let colors = [
    "rgb(240, 14, 128)",
    "rgb(40, 14, 228)",
    "rgb(120, 214, 30)",
    "rgb(10, 114, 240)",
    "rgb(40, 54, 18)",
    "rgb(140, 18, 228)",
];

/* Variables asociadas a elementos html*/
let tarjetas = document.querySelectorAll(".container > div");

let colorDisplay = document.querySelector("#colorDisplay");

let mensaje = document.querySelector("#message");

let titulo = document.querySelector("#titulo");

let botonReset = document.querySelector("#reset");

let botonEasy = document.querySelector("#easy");

let botonHard = document.querySelector("#hard");

/* Otras variables */
let backgroundBody = "rgb(23, 23, 23)"; // Color de fondo del body, se definió como variable para facilitar su uso en funciones.

let backgroundTitulo = "rgb(128, 128, 128)"; // Color de fondo del título, se definió como variable para facilitar su uso en funciones.

let numberOfSquares = 6;  // Se designó originalmente 6 cuadrados. Luego se redefine en 6 o 3 según el nivel de dificultad en que se haga click.

let pickedColor = colors[3];  // Se pickeó originalmente la posición 3 de colors. Luego pickColor() tomó el rol de asignarle un color aleatorio, pickeandolo desde el arreglo colors.

let clickedColor;

/* colorearTarjetas() asigna a cada div #square su color aleatorio correspondiente.*/
function colorearTarjetas() {
    for (let i = 0; i < tarjetas.length ; i ++) {
        tarjetas[i].style.background = colors[i];
        console.log ("vuelta " + i); // debug de cada vuelta dada por for loop
    }
}

/* comparaColores() compara el color pickeado con el clickeado por el jugador y desencadena acciones según si es true o false */
function comparaColores() {
    for (let i = 0; i < tarjetas.length; i ++) {
        tarjetas[i].addEventListener("click", function () {
            clickedColor = tarjetas[i].style.background;
            if (clickedColor !== pickedColor) {
                tarjetas[i].style.background = backgroundBody;
                mensaje.innerHTML = "Inténtalo nuevamente";
            } else {
                mensaje.innerHTML = "¡Correcto!";
                titulo.style.background = pickedColor;
                changeColors (pickedColor);  // changeColors sólo se ejecuta cuando el color clickeado es el correcto.
                botonReset.innerHTML = "Play Again";
            }
        })
    }
}

/* La función changeColores se encarga de colorear todas las tarjetas en pantalla del mismo color que el correcto. */
function changeColors(colorCorrecto) {
    for (let i = 0; i < tarjetas.length ; i ++) {
        tarjetas[i].style.background = colorCorrecto;
    }
}
/* La función pickColor se encarga de seleccionar un color aleatorio dentro del arreglo colors y mostrarlo en el display */
function pickColor() {
    let i = Math.floor(Math.random()*colors.length); // numero aleatorio que representa posición
    pickedColor = colors[i];
    colorDisplay.innerHTML = pickedColor; // el display mostrará el color pickeado
}

/* randomColor() concatena un string con un color rgb, basándose en 3 números aleatorios entre 0 y 255. Se usa valor 256 (255 + 1), ya que Math.floor trunca los decimales y Math.random sólo recorre entre 0 y 1, sin incluir el número 1.*/
function randomColor() {
    let red = Math.floor(Math.random()*256); 
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return `rgb(${red}, ${green}, ${blue})`;
}

/* generateRandomColors() redefine los colores que componen el arreglo colors, en una cantidad acorde al nivel de dificultad seleccionado.*/
function generateRandomColors(numCuadrados) {
    colors = [];
    for (let i = 0; i < numCuadrados; i ++) {
        colors[i] = randomColor();
        console.log(colors[i]);
    }
}

/* ocultarMostrar() tiene la capacidad de detectar aquellas tarjetas que sobran en pantalla y quitarlas, ya que compara si los colores de los divs #square coinciden con los existentes dentro del arreglo colors. Si para esas tarjetas no hay un color disponible en el arreglo, las oculta con la propiedad display: none.*/
function ocultarMostrar() {
    for (let i = 0; i < tarjetas.length; i ++) {
        if (tarjetas[i].style.background !== colors[i]) {
            tarjetas[i].style.display = "none";
        } else {
            tarjetas[i].style.display = "block";
        }
    }
}

/* Listener utilizado para que al clickear el botón reset, se invoque a la función reiniciar. */
botonReset.addEventListener("click", function () {
    reiniciar();
})

/* Listener utilizado para cambiar la modalidad de juego a easy, acondicionando entorno para iniciar una partida de 3 tarjetas. */
botonEasy.addEventListener("click", function () {
    botonEasy.classList.add("selected");
    botonHard.classList.remove("selected");
    numberOfSquares = 3;
    reiniciar();
    ocultarMostrar();
})

/* Listener utilizado para cambiar la modalidad de juego a hard, acondicionando entorno para iniciar una partida de 6 tarjetas. */
botonHard.addEventListener("click", function () {
    botonHard.classList.add("selected");
    botonEasy.classList.remove("selected");
    numberOfSquares = 6;
    reiniciar();
    ocultarMostrar();
})

/*Función encargada de generar las condiciones para iniciar una nueva partida*/
function reiniciar() {
    generateRandomColors(numberOfSquares);
    pickColor();
    colorearTarjetas();
    botonReset.innerHTML = "Nuevos Colores";
    mensaje.innerHTML = "";
    titulo.style.background = backgroundTitulo;
}

/*...................Funciones ejecutadas al cargar la página.................*/
generateRandomColors(numberOfSquares); // se redefine los colores que componen el arreglo colors, acorde al nivel de dificultad.

pickColor();  // la función pickColor() le reasigna a la variable pickedColor un color random desde el arreglo colors. Además se actualiza este valor en el display.

colorearTarjetas(); // aquí se colorea cada tarjeta con su color aleatorio correspondiente.

comparaColores(); // compara el color clickeado con el pickeado y desencadena acciones de acuerdo a si la condición es true o false.
/* ........................................................................... */
