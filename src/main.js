// =========================
// ELEMENTOS DOM
// =========================

const sendBtn = document.getElementById("send");
const micBtn = document.getElementById("mic");

const input = document.getElementById("prompt");
const messages = document.getElementById("messages");

const mouth = document.getElementById("mouth");

const leftLid = document.getElementById("leftLid");
const rightLid = document.getElementById("rightLid");

const avatarCard = document.querySelector(".avatar-card");

const quickButtons =
    document.querySelectorAll(".action");

// =========================
// ESTADO
// =========================

let speaking = false;
let recognition = null;

// =========================
// MENSAJES CHAT
// =========================

function addMessage(text, type = "assistant") {

    const wrapper = document.createElement("div");

    wrapper.className = type;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.textContent = text;

    wrapper.appendChild(bubble);

    messages.appendChild(wrapper);

    messages.scrollTop = messages.scrollHeight;
}

// =========================
// BOCA ANIMADA
// =========================

function animateMouth() {

    if (!speaking) return;

    const scale =
        0.4 + Math.random() * 1.4;

    mouth.style.transform =
        `translateX(-50%) scaleY(${scale})`;

    requestAnimationFrame(animateMouth);
}

// =========================
// VOZ
// =========================

function speak(text) {

    speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "es-ES";

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.onstart = () => {

        speaking = true;

        animateMouth();

        avatarCard.classList.add("speaking");
    };

    utterance.onend = () => {

        speaking = false;

        mouth.style.transform =
            "translateX(-50%) scaleY(1)";

        avatarCard.classList.remove("speaking");
    };

    speechSynthesis.speak(utterance);
}

// =========================
// RESPUESTA IA
// =========================

async function generateResponse(question) {

    const q = question.toLowerCase();

    if (q.includes("hola")) {
        return "Hola, encantado de ayudarte.";
    }

    if (q.includes("servicios")) {
        return "Disponemos de información, soporte y atención personalizada.";
    }

    if (q.includes("contacto")) {
        return "Puedes contactar mediante teléfono, correo o formulario web.";
    }

    if (q.includes("gracias")) {
        return "Ha sido un placer ayudarte.";
    }

    return `He recibido tu consulta sobre: ${question}`;
}

// =========================
// ENVÍO MENSAJE
// =========================

async function askAssistant(question) {

    addMessage(question, "user");

    const response =
        await generateResponse(question);

    addMessage(response, "assistant");

    speak(response);
}

// =========================
// BOTÓN ENVIAR
// =========================

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    askAssistant(text);

    input.value = "";
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        sendMessage();
    }
});

// =========================
// MICRÓFONO
// =========================

if (
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
) {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    recognition =
        new Recognition();

    recognition.lang = "es-ES";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = () => {

        micBtn.classList.add("recording");
    };

    recognition.onend = () => {

        micBtn.classList.remove("recording");
    };

    recognition.onresult = (event) => {

        const transcript =
            event.results[0][0].transcript;

        input.value = transcript;

        askAssistant(transcript);
    };

    micBtn.addEventListener("click", () => {

        recognition.start();
    });
}

// =========================
// PARPADEO
// =========================

function blink() {

    leftLid.style.height = "22px";
    rightLid.style.height = "22px";

    setTimeout(() => {

        leftLid.style.height = "0px";
        rightLid.style.height = "0px";

    }, 120);

    setTimeout(
        blink,
        2500 + Math.random() * 3000
    );
}

blink();

// =========================
// RESPIRACIÓN
// =========================

let breath = 0;

function breathing() {

    breath += 0.03;

    const scale =
        1 + Math.sin(breath) * 0.01;

    avatarCard.style.transform =
        `scale(${scale})`;

    requestAnimationFrame(breathing);
}

breathing();

// =========================
// ACCIONES RÁPIDAS
// =========================

quickButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const text =
            btn.textContent.trim();

        askAssistant(text);
    });
});

// =========================
// SALUDO INICIAL
// =========================

window.addEventListener("load", () => {

    setTimeout(() => {

        speak(
            "Hola. Soy tu asistente virtual. ¿En qué puedo ayudarte?"
        );

    }, 1200);
});

// =========================
// EFECTO RATÓN
// =========================

document.addEventListener("mousemove", e => {

    const x =
        (e.clientX / window.innerWidth - 0.5) * 8;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 8;

    avatarCard.style.boxShadow =
        `${x}px ${y}px 40px rgba(0,0,0,.4)`;
});
