chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ apiKey: "YOUR_OPENAI_API_KEY" });
});
