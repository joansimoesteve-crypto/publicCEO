const sendBtn =
document.getElementById("send");

const input =
document.getElementById("prompt");

const messages =
document.getElementById("messages");

const avatar =
document.querySelector(".avatar-card");

let speaking = false;

// CHAT

function addMessage(text){

    const div =
    document.createElement("div");

    div.className = "bubble";

    div.textContent = text;

    messages.appendChild(div);

    messages.scrollTop =
    messages.scrollHeight;
}

// VOZ

function speak(text){

    speechSynthesis.cancel();

    const utter =
    new SpeechSynthesisUtterance(text);

    utter.lang = "es-ES";

    utter.rate = 1;

    utter.onstart = ()=>{

        speaking = true;
    };

    utter.onend = ()=>{

        speaking = false;
    };

    speechSynthesis.speak(utter);
}

// IA DEMO

async function answer(question){

    const q =
    question.toLowerCase();

    if(q.includes("hola"))
        return "Hola. Encantado de ayudarte.";

    if(q.includes("servicios"))
        return "Puedo informarte sobre servicios y soluciones.";

    if(q.includes("contacto"))
        return "Puedes contactar directamente con la empresa.";

    return "He recibido tu consulta: " + question;
}

async function ask(question){

    addMessage("👤 " + question);

    const response =
    await answer(question);

    addMessage("🤖 " + response);

    speak(response);
}

// BOTONES

sendBtn.addEventListener("click",()=>{

    const text =
    input.value.trim();

    if(!text) return;

    ask(text);

    input.value="";
});

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendBtn.click();
    }
});

// MOVIMIENTO 3D

document.addEventListener(
"mousemove",
(e)=>{

    const x =
    (e.clientX /
    window.innerWidth
    - .5) * 18;

    const y =
    (e.clientY /
    window.innerHeight
    - .5) * 10;

    avatar.style.transform =
    `
    rotateY(${x}deg)
    rotateX(${-y}deg)
    `;
});

// FLOTACIÓN

let time = 0;

function breathing(){

    time += 0.01;

    const y =
    Math.sin(time) * 8;

    avatar.style.translate =
    `0 ${y}px`;

    requestAnimationFrame(
        breathing
    );
}

breathing();

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

    recog.lang = "es-ES";

    document
    .getElementById("mic")
    .addEventListener(
        "click",
        ()=>recog.start()
    );

    recog.onresult = (e)=>{

        const text =
        e.results[0][0].transcript;

        ask(text);
    };
}

// SALUDO

window.onload = ()=>{

    setTimeout(()=>{

        speak(
        "Hola. Soy Public CEO. ¿Cómo puedo ayudarte hoy?"
        );

    },1000);
};
