console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Message received:", message);
    if (message.action === "captureScreenshot") {
        chrome.tabs.captureVisibleTab(sender.tab.windowId, {format: "png"}, (dataUrl) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            // Open the screenshot in a new tab
            chrome.tabs.create({ url: dataUrl });
        });
    }
});

