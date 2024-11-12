var playerOnePoints = 0;
var playerTwoPoints = 0;

var coconut;//coconut image
//another change

//keystokres for player 1 and player 2
document.addEventListener('keydown', function (event) {
    if (event.key === 'a' || event.key === 'A') {
        addPlayerOnePoints();
    } else if (event.key === 'l' || event.key === 'L') {
        addPlayerTwoPoints();
    }
});

//add player 1 and player 2 points
function addPlayerOnePoints() {
    coconut = document.getElementById("coconut");
    coconut.style.transform = 'translateY(-30px)'; // little hop animation
    setTimeout(() => {
        coconut.style.transform = 'translateY(0)';
    }, 100);
    playerOnePoints += 1;
    updateCompDisplay();
}

//add player 2 points
function addPlayerTwoPoints() {
    coconut = document.getElementById("coconut2");
    coconut.style.transform = 'translateY(-30px)'; // little hop animation
    setTimeout(() => {
        coconut.style.transform = 'translateY(0)';
    }, 100);
    playerTwoPoints += 1;
    updateCompDisplay();
}
function updateCompDisplay() {
    if (playerOnePoints > 100){
        alert("Player One Wins! (Refresh to Restart)");
    }
    else if (playerTwoPoints > 100){
        alert("Player Two Wins! (Refresh to Restart)");
    }
    else{
        document.getElementById("comp1ScoreDisplay").innerText = playerOnePoints;
        document.getElementById("comp2ScoreDisplay").innerText = playerTwoPoints;
    }
    
}