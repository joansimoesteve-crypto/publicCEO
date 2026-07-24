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
}

// BOCA

function animateMouth(){

    if(!speaking) return;

    mouth.style.height =
        (8 + Math.random()*35) + "px";

    requestAnimationFrame(
        animateMouth
    );
}

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
    };

    speechSynthesis.speak(utter);
}

// IA DEMO

async function answer(question){

    return "Has preguntado: " + question;
}

async function ask(question){

    addMessage("👤 " + question);

    const response =
        await answer(question);

    addMessage("🤖 " + response);

    speak(response);
}

// BOTÓN

sendBtn.addEventListener("click",()=>{

    const q = input.value.trim();

    if(!q) return;

    ask(q);

    input.value = "";
});

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendBtn.click();
    }
});

// OJOS

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

// PARPADEO

function blink(){

    leftEye.style.height = "2px";
    rightEye.style.height = "2px";

    setTimeout(()=>{

        leftEye.style.height = "20px";
        rightEye.style.height = "20px";

    },120);

    setTimeout(
        blink,
        2500 + Math.random()*3000
    );
}

blink();

// SALUDO

window.onload=()=>{

    setTimeout(()=>{

        speak(
            "Hola. Soy Public CEO. ¿Cómo puedo ayudarte?"
        );

    },1000);
};
