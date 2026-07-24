const *endBtn =
document.getElementById("*end");

const input =
document.getElementById("prompt");

const messages =
document.getElementById("messages");

function addMessage(text){

    const div =
    document.createElement("div");

    div.className = "bubble";

    div.textContent = text;

    messages.appendChild(div);

    messages.scrollTop =
    messages.scrollHeight;
}

sendBtn.addEventListener("click",()=>{

    const text =
    input.value.trim();

    if(!text) return;

    addMessage("👤 " + text);

    input.value = "";
});

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendBtn.click();
    }
});
