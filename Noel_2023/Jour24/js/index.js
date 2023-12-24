$(document).ready(function () {

    $("#overlay").hide();

    // console.log(todayday + ", " + todayhour + ", " + todaymin + ", " + todaysec)
    var waitTime = new Date("December 24, 2023 18:00:00").getTime();

    // Update the countdown every second
    var countdown = setInterval(function () {

        // Get the current date and time
        var now = new Date().getTime();

        // Calculate the time remaining
        var timeRemaining = waitTime - now;

        // Calculate days, hours, minutes, and seconds
        var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Display the countdown
        var countdownElement = document.getElementById('countdown');
        console.log(days + "j " + hours + "h " + minutes + "m " + seconds + "s ");
        countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // Check if the countdown is over
        if (timeRemaining < 0) {
            clearInterval(countdown);
            console.log("Countdown expired!");
            countdownElement.style.display = 'none'
            document.getElementById('endButton').style.display = 'inline-block';
            countdownElement.classList.add('expired'); // Change text color to red
        } else if (hours < 1) {
            countdownElement.classList.add('expired'); // Change text color to red
        } else {
            countdownElement.classList.remove('expired'); // Remove red color if not expired or less than 1 hour
        }
    }, 1000); // Update every second
});

function handleButtonClick() {
    window.location.href = 'christmas.html'
  }