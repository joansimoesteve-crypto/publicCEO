const sendBtn = document.getElementById("send");
const input = document.getElementById("prompt");
const messages = document.getElementById("messages");

const mouth = document.getElementById("mouth");
const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

let speaking = false;

// CHAT

function addMessage(text){

    const div = document.createElement("div");

    div.className = "bubble";

    div.textContent = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

// BOCA

function animateMouth(){

    if(!speaking) return;

    mouth.style.height =
        (10 + Math.random()*35) + "px";

    mouth.style.width =
        (45 + Math.random()*20) + "px";

    requestAnimationFrame(
        animateMouth
    );
}

// VOZ

function speak(text){

    speechSynthesis.cancel();

    const utter =
        new SpeechSynthesisUtterance(text);

    utter.lang = "es-ES";

    utter.onstart = ()=>{

        speaking = true;

        animateMouth();
    };

    utter.onend = ()=>{

        speaking = false;

        mouth.style.height = "14px";
        mouth.style.width = "60px";
    };

    speechSynthesis.speak(utter);
}

// IA SIMULADA

async function answer(question){

    const q = question.toLowerCase();

    if(q.includes("hola"))
        return "Hola. Encantado de ayudarte.";

    if(q.includes("servicios"))
        return "Ofrecemos atención personalizada y soluciones digitales.";

    if(q.includes("contacto"))
        return "Puedes contactar mediante formulario o correo electrónico.";

    return "Has preguntado: " + question;
}

// ENVIAR

async function ask(question){

    addMessage("👤 " + question);

    const response =
        await answer(question);

    addMessage("🤖 " + response);

    speak(response);
}

sendBtn.addEventListener("click",()=>{

    const q = input.value.trim();

    if(!q) return;

    ask(q);

    input.value = "";
});

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter")
        sendBtn.click();
});

// SEGUIMIENTO OJOS

document.addEventListener("mousemove",(e)=>{

    const x =
    (e.clientX/window.innerWidth-.5)*10;

    const y =
    (e.clientY/window.innerHeight-.5)*10;

    leftEye.style.transform =
        `translate(${x}px,${y}px)`;

    rightEye.style.transform =
        `translate(${x}px,${y}px)`;
});

// RESPIRACIÓN

const avatar =
document.querySelector(".avatar-card");

let breathe = 0;

function breathing(){

    breathe += .02;

    const scale =
        1 + Math.sin(breathe)*.01;

    avatar.style.scale = scale;

    requestAnimationFrame(
        breathing
    );
}

breathing();

// PARPADEO

function blink(){

    leftEye.style.height = "2px";
    rightEye.style.height = "2px";

    setTimeout(()=>{

        leftEye.style.height = "18px";
        rightEye.style.height = "18px";

    },120);

    const next =
        2500 + Math.random()*4000;

    setTimeout(blink,next);
}

blink();

// MICRO

if(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
){

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const recog =
        new Recognition();

    recog.lang="es-ES";

    document
    .getElementById("mic")
    .addEventListener("click",()=>{

        recog.start();
    });

    recog.onresult=(e)=>{

        const text =
            e.results[0][0].transcript;

        ask(text);
    };
}

// SALUDO

window.onload=()=>{

    setTimeout(()=>{

        speak(
            "Hola. Soy Public CEO. ¿Cómo puedo ayudarte hoy?"
        );

    },800);
};
