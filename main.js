/* ==========================================
   PUBLIC CEO AI
   MAIN.JS - PARTE 1
========================================== */

const avatar = document.getElementById("avatar");
const avatarImage = document.getElementById("avatarImage");

const eyeLeft = document.getElementById("eyeLeft");
const eyeRight = document.getElementById("eyeRight");

const lidLeft = document.getElementById("lidLeft");
const lidRight = document.getElementById("lidRight");

const mouth = document.getElementById("mouth");

const prompt = document.getElementById("prompt");
const send = document.getElementById("send");
const voice = document.getElementById("voice");

const bubble = document.getElementById("bubble");

let talking = false;

let mouseX = 0;
let mouseY = 0;

/*============================================
RESPIRACIÓN
============================================*/

let breathe = 0;

function breathing(){

    breathe += 0.03;

    const y = Math.sin(breathe)*8;

    avatar.style.transform =
    `translateY(${y}px)`;

    requestAnimationFrame(breathing);

}

breathing();

/*============================================
OJOS
============================================*/

document.addEventListener("mousemove",(e)=>{

    mouseX=(e.clientX/window.innerWidth)-0.5;
    mouseY=(e.clientY/window.innerHeight)-0.5;

    const x=mouseX*8;
    const y=mouseY*8;

    eyeLeft.style.transform=
    `translate(${x}px,${y}px)`;

    eyeRight.style.transform=
    `translate(${x}px,${y}px)`;

    avatarImage.style.transform=
    `
    rotateY(${mouseX*6}deg)
    rotateX(${-mouseY*4}deg)
    scale(1.01)
    `;

});

/*============================================
PARPADEO
============================================*/

function blink(){

    lidLeft.style.height="24px";
    lidRight.style.height="24px";

    setTimeout(()=>{

        lidLeft.style.height="0px";
        lidRight.style.height="0px";

    },180);

}

setInterval(()=>{

    blink();

},3500+Math.random()*2500);

/*============================================
BOCA
============================================*/

function animateMouth(){

    if(!talking){

        mouth.style.height="10px";
        mouth.style.width="60px";

        requestAnimationFrame(animateMouth);

        return;

    }

    const h=10+Math.random()*28;
    const w=58+Math.random()*14;

    mouth.style.height=h+"px";
    mouth.style.width=w+"px";

    requestAnimationFrame(animateMouth);

}

animateMouth();
/*============================================
VOZ
============================================*/

const synth = window.speechSynthesis;

let currentVoice = null;

function loadVoice() {

    const voices = synth.getVoices();

    currentVoice =
        voices.find(v => v.lang.startsWith("es") && v.name.toLowerCase().includes("google")) ||
        voices.find(v => v.lang.startsWith("es")) ||
        voices[0];

}

loadVoice();

speechSynthesis.onvoiceschanged = loadVoice;

function speak(text){

    synth.cancel();

    talking = true;

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "es-ES";
    msg.rate = 0.98;
    msg.pitch = 1;
    msg.volume = 1;

    if(currentVoice)
        msg.voice = currentVoice;

    msg.onend = () => {

        talking = false;

    }

    synth.speak(msg);

}

/*============================================
EFECTO ESCRITURA
============================================*/

async function typeText(text){

    bubble.innerHTML = "";

    for(let i=0;i<text.length;i++){

        bubble.innerHTML += text[i];

        await new Promise(r=>setTimeout(r,18));

    }

}

/*============================================
RESPUESTA DEMO
============================================*/

const answers=[

"Hola. Soy el asistente virtual de PublicCEO. Estoy preparado para ayudarte.",

"Puedes preguntarme cualquier duda sobre nuestros servicios.",

"Estoy diseñado para ofrecer respuestas claras y rápidas.",

"En las próximas versiones estaré conectado directamente con ChatGPT.",

"Gracias por probar esta demostración del asistente virtual."

];

function randomAnswer(){

    return answers[
        Math.floor(Math.random()*answers.length)
    ];

}

/*============================================
ENVIAR
============================================*/

async function sendMessage(){

    const text = prompt.value.trim();

    if(text==="") return;

    prompt.value="";

    const response = randomAnswer();

    await typeText(response);

    speak(response);

}

send.addEventListener("click",sendMessage);

prompt.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});
/*============================================
MICRÓFONO
============================================*/

let recognition = null;

if ("webkitSpeechRecognition" in window) {

    recognition = new webkitSpeechRecognition();

    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {

        voice.style.background = "#ff4b4b";
        bubble.innerHTML = "🎤 Te escucho...";

    };

    recognition.onresult = async (event) => {

        const text = event.results[0][0].transcript;

        prompt.value = text;

        await sendMessage();

    };

    recognition.onend = () => {

        voice.style.background = "";

    };

}

voice.addEventListener("click", () => {

    if (recognition) {

        recognition.start();

    } else {

        alert("Tu navegador no soporta reconocimiento de voz.");

    }

});

/*============================================
MOVIMIENTO CABEZA
============================================*/

let head = 0;

function headMovement() {

    if (talking) {

        head += 0.12;

        const r = Math.sin(head) * 2.5;

        avatar.style.transform =
            `translateY(${Math.sin(breathe) * 8}px) rotate(${r}deg)`;

    }

    requestAnimationFrame(headMovement);

}

headMovement();

/*============================================
SALUDO INICIAL
============================================*/

window.addEventListener("load", async () => {

    const welcome = `

Hola.

Soy el asistente virtual de PublicCEO.

Estoy preparado para responder tus preguntas.

Puedes escribir o pulsar el micrófono para hablar conmigo.

`;

    await typeText(welcome);

    setTimeout(() => {

        speak(welcome);

    }, 500);

});

/*============================================
BOTONES RÁPIDOS
============================================*/

document.querySelectorAll(".action").forEach(btn => {

    btn.addEventListener("click", async () => {

        const text = btn.innerText;

        prompt.value = text;

        await sendMessage();

    });

});

/*============================================
PREPARADO PARA CHATGPT
============================================*/

// En la siguiente versión sustituiremos
//
// const response = randomAnswer();
//
// por una llamada fetch() a tu backend
// o directamente a la API de OpenAI.
//
// No habrá que cambiar el HTML ni el CSS.

/*============================================*/
