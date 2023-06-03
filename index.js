let player = {
    name: "Player_1",
    chips: 1000
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": £" + player.chips


document.getElementById('claim-reward-btn').disabled = false;
document.getElementById('new-card-btn').disabled = false;



// DOESNT WORK FOR SOME REASON
// // Function that disables buttons
// function disableBtn(NewCrdBtn, ClaimBtn) {
//     if (NewCrdBtn) {
//       document.getElementById('new-card-btn').disabled = true;
//     }
  
//     if (ClaimBtn) {
//       document.getElementById('claim-reward-btn').disabled = true;
//     }
//   }




//Random card function to return cards
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

//What happens when you start a game
function startGame() {
    document.getElementById('claim-reward-btn').disabled = false;
    document.getElementById('new-card-btn').disabled = false;
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

//start the game button
function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + ", "
        Reward()
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"

    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        Reward()
        document.getElementById('claim-reward-btn').disabled = true;
        document.getElementById('new-card-btn').disabled = true;

    } else {
        message = "You're out of the game!"
        isAlive = false
        Reward()
        document.getElementById('claim-reward-btn').disabled = true;
        document.getElementById('new-card-btn').disabled = true;
    }
    messageEl.textContent = message


    //Button click audio
    var clickSound = new Audio('audio/card.mp3');
    clickSound.play()
    
}


//New card button
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }

    //Button click audio
    var clickSound = new Audio('audio/card.mp3');
    clickSound.play()
}

//Reward
function Reward(){
    if (sum > 21){
        player.chips -= 200
        playerEl.textContent = player.name + ": £" + player.chips
        
    }
    else if (sum === 21){
        player.chips += 10000
        playerEl.textContent = player.name + ": £" + player.chips
    }
}

//NewChips
function NewChips(){
    if(sum>17 && sum<21){
        player.chips += 500
        playerEl.textContent = player.name + ": £" + player.chips
        document.getElementById('claim-reward-btn').disabled = true;
        document.getElementById('new-card-btn').disabled = true;
    }

    else if(sum>14 && sum<18){
        player.chips += 200
        playerEl.textContent = player.name + ": £" + player.chips
        document.getElementById('claim-reward-btn').disabled = true;
        document.getElementById('new-card-btn').disabled = true;
    }

    else if(sum<14)
        player.chips += 50
        playerEl.textContent = player.name + ": £" + player.chips
        document.getElementById('claim-reward-btn').disabled = true;
        document.getElementById('new-card-btn').disabled = true;
}




//audio

window.addEventListener('DOMContentLoaded', (event) => {
    var backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
  });



  
  
  
  