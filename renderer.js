const { ipcRenderer } = require("electron");

function translate() {
    let text = document.getElementById("inputText").value;
    let targetLang = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Enter text to translate.");
        return;
    }

    ipcRenderer.send("translate", text, targetLang);
}

ipcRenderer.on("translationResult", (event, translatedText) => {
    document.getElementById("outputText").textContent = translatedText;
});
