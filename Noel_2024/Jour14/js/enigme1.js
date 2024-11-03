const words = ["MERLIN", "CAMPING", "CANARD", "ARABE", "INTERNET", "DORDOGNE", "VACANCE", "CHATON"];
let secretWord = "";
let attempts = 0;
let maxAttempts = 6;

const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

function startGame() {
    // Sélectionne un mot aléatoire
    secretWord = words[Math.floor(Math.random() * words.length)];
    attempts = 0;
    guessInput.value = "";
    guessInput.maxLength = secretWord.length;
    message.textContent = "";

    // Efface le plateau de jeu et le recrée en fonction de la longueur du mot
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${secretWord.length}, 60px)`;
    for (let i = 0; i < maxAttempts * secretWord.length; i++) {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter");
        gameBoard.appendChild(letterBox);
    }
}

function handleGuess() {
    const guess = guessInput.value.toUpperCase();
    if (guess.length !== secretWord.length) {
        message.textContent = `Veuillez entrer un mot de ${secretWord.length} lettres.`;
        return;
    }

    const row = Array.from(gameBoard.children).slice(attempts * secretWord.length, attempts * secretWord.length + secretWord.length);
    for (let i = 0; i < secretWord.length; i++) {
        const letterBox = row[i];
        const letter = guess[i];

        if (secretWord[i] === letter) {
            letterBox.classList.add("correct");
        } else if (secretWord.includes(letter)) {
            letterBox.classList.add("present");
        } else {
            letterBox.classList.add("absent");
        }
        letterBox.textContent = letter;
    }

    attempts++;
    guessInput.value = "";

    if (guess === secretWord) {
        message.textContent = "Félicitations ! Vous avez trouvé le mot.";
        guessInput.disabled = true;
        submitBtn.disabled = true;
        setTimeout(() => {
            window.location.href = "enigme2.html";
        }, 2000);
    } else if (attempts === maxAttempts) {
        message.textContent = `Dommage ! Le mot était : ${secretWord}. Recommençons avec un nouveau mot !`;
        guessInput.disabled = true;
        submitBtn.disabled = true;
        setTimeout(() => {
            guessInput.disabled = false;
            submitBtn.disabled = false;
            startGame();
        }, 3000); // Attend 3 secondes avant de recommencer
    }
}

submitBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleGuess();
    }
});

// Démarre le jeu au chargement
startGame();