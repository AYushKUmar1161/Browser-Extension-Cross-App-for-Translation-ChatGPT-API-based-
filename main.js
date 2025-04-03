const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile("index.html");
});

ipcMain.on("translate", async (event, text, targetLang) => {
    try {
        let response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [{ role: "system", content: `Translate to ${targetLang}: ${text}` }]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            }
        });

        event.reply("translationResult", response.data.choices[0].message.content);
    } catch (error) {
        event.reply("translationResult", "Error translating text.");
    }
});
