// Use MutationObserver to catch dynamically added popups
const observer = new MutationObserver((mutations, obs) => {
    const closeBtn = document.querySelector(".fc-close-background");
    const toggleMenu = document.getElementById("ToggleMenu");
    const logoImg = document.querySelector(
        'img[src="/img/m2/logo.svg"][alt="Факти"]'
    );

    if (logoImg) {
        // Create a wrapper div to handle centering
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center"; // horizontal centering
        wrapper.style.alignItems = "center"; // vertical centering
        wrapper.style.height = logoImg.height + "px"; // match original height
        wrapper.style.width = logoImg.width + "px"; // add some extra width for text

        const textNode = document.createElement("span");
        textNode.textContent = "ТЪПОТИИ";
        textNode.style.fontSize = "20px";
        textNode.style.fontWeight = "bold";
        textNode.style.color = "#fff";

        wrapper.appendChild(textNode);

        fadeOut(logoImg, 10000);

        setTimeout(() => {
            logoImg.replaceWith(wrapper);
        }, 5000);

        console.log("Set the correct logo text");
    }

    if (toggleMenu) {
        // Remove outline for the <a> itself
        toggleMenu.style.outline = "none";
        toggleMenu.style.boxShadow = "none";
        console.log("toggle menu removed");
    }

    if (closeBtn) {
        closeBtn.click(); // simulate a click on the close button
        console.log("fakti.bg popup closed by MutationObserver");
        obs.disconnect(); // stop observing once done
    }
});

// Observe the whole document for added nodes
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

function fadeOut(element, duration = 500) {
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        // Cubic ease-out: slows down at the end
        const eased = 1 - Math.pow(1 - progress, 3);

        element.style.opacity = Math.max(1 - eased, 0);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.style.opacity = 0;
            element.style.display = "none"; // hide completely
        }
    }

    requestAnimationFrame(step);
}
