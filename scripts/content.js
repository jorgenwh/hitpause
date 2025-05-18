function createPauseOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "video-pause-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    overlay.style.color = "white";
    overlay.style.fontSize = "48px";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.textAlign = "center";
    overlay.style.pointerEvents = "none";
    overlay.innerText = "Video Paused";

    document.body.appendChild(overlay);
}

function removePauseOverlay() {
    const overlay = document.getElementById("video-pause-overlay");
    if (overlay) {
        overlay.remove();
    }
}

// Function to track videos
function handleVideoEvents(video) {
    video.addEventListener("play", () => {
        console.log("Video started playing:", video);
        removePauseOverlay();
    });

    video.addEventListener("pause", () => {
        console.log("Video paused:", video);
        createPauseOverlay();
    });
}

// Function to attach event listeners to videos
function attachListenersToVideos() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        if (!video.dataset.eventsAttached) {
            handleVideoEvents(video);
            video.dataset.eventsAttached = "true";
        }
    });
}

// Function to start tracking videos (if on a valid URL)
function startTracking() {
    if (window.location.href.includes("https://www.netflix.com/watch/")) {
        console.log("Tracking enabled on:", window.location.href);
        attachListenersToVideos();
        observeNewVideos();
    } else {
        console.log("Tracking disabled - Not on a watch page:", window.location.href);
    }
}

// Function to observe new video elements (only if on the correct URL)
function observeNewVideos() {
    const observer = new MutationObserver(() => {
        if (window.location.href.includes("https://www.netflix.com/watch/")) {
            attachListenersToVideos();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Initial setup
startTracking();

// Monitor URL changes (including SPA navigation)
let lastURL = location.href;
new MutationObserver(() => {
    if (location.href !== lastURL) {
        lastURL = location.href;
        console.log("URL changed:", lastURL);
        startTracking();
    }
}).observe(document, { subtree: true, childList: true });
