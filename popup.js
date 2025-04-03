document.getElementById("translateBtn").addEventListener("click", async () => {
    let text = document.getElementById("inputText").value;
    let targetLang = document.getElementById("targetLang").value;

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: `Translate to ${targetLang}: ${text}` }]
        })
    });

    let data = await response.json();
    document.getElementById("outputText").innerText = data.choices[0].message.content;
});
