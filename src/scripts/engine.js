const emojis = [
    "😺",
    "😺",
    "🐺",
    "🐺",
    "🐻",
    "🐻",
    "🐷",
    "🐷",
    "🐮",
    "🐮",
    "🐯",
    "🐯",
];
let openCards = [];
let moves = 0;

let shuffleEmojis = emojis.sort(()=> (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < shuffleEmojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

// Function to handle card click
function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        playSound("swipe-card");
        moves++;
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Function to check if the two open cards match
// If they match, add a class to keep them open
function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        playSound("coin-flip");
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        setTimeout(() => {
            playSound("win");
            document.getElementById("moves").innerText = moves;
            document.getElementById("winPopup").style.display = "block";
        }, 500);
    }
}

// Function to restart the game
document.getElementById("restartButton").addEventListener("click", function() {
    location.reload();
});

// Function to close the win popup
document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("winPopup").style.display = "none";
});

// Function to play sound effects
function playSound(audioName){
    const audio = new Audio(`https://raw.githubusercontent.com/lgjor/memory-game/main/src/audios/${audioName}.mp3`);
    audio.volume = 1;
    audio.play().catch((error) => {
        console.error(`Failed to play sound ${audioName}:`, error);
    });
}

