// Liste des mots avec leurs thèmes et indices T9
const enigmes = [
    { mot: "cicciobello", theme: "Bébé", indice: "23223623556" },
    { mot: "monbazillac", theme: "Alcool", indice: "66622945522" },
    { mot: "cocktail", theme: "Alcool", indice: "26258245" },
    { mot: "pamphlet", theme: "Critique", indice: "72674538" },
    { mot: "mirabelle", theme: "Fruit", indice: "647223553" },
];

// Choisir une énigme aléatoire
let enigmeCourante = enigmes[Math.floor(Math.random() * enigmes.length)];
let request = 0;

// Afficher le thème et l'indice dans le HTML
document.getElementById("theme").textContent = `Thème: ???`;
document.getElementById("indice").textContent = `${enigmeCourante.indice}`;

// Fonction pour vérifier la réponse de l'utilisateur
function checkAnswer() {
    const userInput = document.getElementById("guess").value.toLowerCase();
    const message = document.getElementById("message");
    const indice = document.getElementById("indice-wait");

    if (userInput === enigmeCourante.mot) {
        message.style.color = "green";
        message.textContent = "Bonne réponse ! Redirection en cours...";
        setTimeout(() => {
            window.location.href = "bravo.html";
        }, 2000);
    } else {
        message.style.color = "red";
        message.textContent = "Mauvaise réponse, essayez encore.";
        if (request>1) {
            document.getElementById("theme").textContent = `Thème : ${enigmeCourante.theme}`;
        } else {
            request++
        }
    }
}
