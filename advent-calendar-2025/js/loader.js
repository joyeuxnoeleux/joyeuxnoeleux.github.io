document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    // Remove after fade-out
    setTimeout(() => {
        loader.style.display = "none";
    }, 500); // fade-out time
});
