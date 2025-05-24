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
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        setTimeout(() => {
            alert("You win!");
            location.reload();
        }, 500);
    }
}

