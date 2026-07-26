const leftEye = document.querySelector(".left");
const rightEye = document.querySelector(".right");
const mouth = document.getElementById("mouth");
const speech = document.getElementById("speech");

// --------------------
// PARPADEO
// --------------------

function blink() {

    leftEye.classList.add("blink");
    rightEye.classList.add("blink");

    setTimeout(() => {

        leftEye.classList.remove("blink");
        rightEye.classList.remove("blink");

    },220);

}

function autoBlink(){

    blink();

    const next = 2000 + Math.random()*3000;

    setTimeout(autoBlink,next);

}

setTimeout(autoBlink,1500);


// --------------------
// HABLAR
// --------------------

function speak(text){

    speech.innerText = text;

    const words = text.split(" ");

    let i = 0;

    clearInterval(window.talkInterval);

    window.talkInterval = setInterval(()=>{

        mouth.classList.toggle("talk");

        i++;

        if(i >= words.length*2){

            clearInterval(window.talkInterval);

            mouth.classList.remove("talk");

        }

    },180);

}


// --------------------
// DEMO
// --------------------

const frases = [

"Hola. Bienvenido.",

"Soy tu avatar virtual.",

"Todo funciona con HTML CSS y JavaScript.",

"No utilizo ninguna API externa.",

"Podemos añadir emociones y movimientos mucho más avanzados."

];

let indice = 0;

function siguienteFrase(){

    speak(frases[indice]);

    indice++;

    if(indice>=frases.length){

        indice=0;

    }

}

siguienteFrase();

setInterval(siguienteFrase,7000);
