$(document).ready(function () {

    $("#overlay").show();

    $("#close-overlay").click(function () {
        $("#overlay").hide();
    });
});
document.getElementById("submit-button").addEventListener("click", function () {
    var enteredCode = document.getElementById("code-input").value;

    if (enteredCode.toLowerCase() === "glados") {
        window.location.href = "congrat.html";
    } else {
        alert("Mauvais code! essaie encore.");
    }
});

var x = document.getElementById("audio");

function playaudio() {
    x.play();
    console.log("Vraiment t'as pas autre chose a faire?")
} 