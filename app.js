// constants

const player1 = "X";
const player2 = "O";
const winningCombo = [
    ["b0", "b1", "b2"],
    ["b3", "b4", "b5"],
    ["b6", "b7", "b8"],
    ["b0", "b3", "b6"],
    ["b1", "b4", "b7"],
    ["b2", "b5", "b8"],
    ["b0", "b4", "b8"],
    ["b2", "b4", "b6"],
];

// app state variables

let round;
let winner;
let playerTurn;
let p1Choices = [];
let p2Choices = [];

//cached element references

const board = document.querySelector('.board');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset');
const b0 = document.getElementById('b0');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');
const b6 = document.getElementById('b6');
const b7 = document.getElementById('b7');
const b8 = document.getElementById('b8');

// event listneners 

resetBtn.addEventListener("click", reset);
b0.addEventListener("click", assignBox);
b1.addEventListener("click", assignBox);
b2.addEventListener("click", assignBox);
b3.addEventListener("click", assignBox);
b4.addEventListener("click", assignBox);
b5.addEventListener("click", assignBox);
b6.addEventListener("click", assignBox);
b7.addEventListener("click", assignBox);
b8.addEventListener("click", assignBox);

// functions

function init() {
    playerTurn = player1;
    round = 1;
    message.textContent = "It's X's turn";
    winner = null;
}

function reset() {
    location.reload();
}

function assignBox(e) {
    if (playerTurn === player1) {
        e.target.innerHTML = "<p>X</p>";
        p1Choices.push(e.target.id);
        this.removeEventListener("click", arguments.callee);
        handlePlayerTurn();
    } else {
        e.target.innerHTML = "<p>O</p>";
        p2Choices.push(e.target.id);
        this.removeEventListener("click", arguments.callee);
        handlePlayerTurn();
    } 
} 

function handlePlayerTurn() {
    if (round >= 9) {
        winner = "Tie";
        renderWinner();
    } else if (round === 2 || round === 4 || round === 6 || round === 8) {
        playerTurn = player1;
        round ++;
        message.textContent = `It's ${playerTurn}'s turn`;
        checkWin();
    } else if (round === 1 || round === 3 || round === 5 || round === 7) {
        playerTurn = player2;
        round ++;
        message.textContent = `It's ${playerTurn}'s turn`;
        checkWin();
    }
}

function checkWin() {
        for (i = 0; i < winningCombo.length; i++) {
            if (checkPlayer1(p1Choices, winningCombo[i]) === true) {
                winner = player1;
                renderWinner();
            } else if (checkPlayer2(p2Choices, winningCombo[i]) === true) {
                winner = player2;
                renderWinner();
            }
        }
    }

function checkPlayer1(p1Choices, winningComboRow) {
    if (p1Choices.includes(winningComboRow[0]) && p1Choices.includes(winningComboRow[1]) 
        && p1Choices.includes(winningComboRow[2])) {
            return true;
        }
}
function checkPlayer2(p2Choices, winningComboRow) {
    if (p2Choices.includes(winningComboRow[0]) && p2Choices.includes(winningComboRow[1]) 
        && p2Choices.includes(winningComboRow[2])) {
            return true;
        }
} 

function renderWinner() {
    if (winner === player1) {
        message.textContent = "X is the winner!";
    } else if (winner === player2) {
        message.textContent = "O is the winner!";
    } else if (winner === "Tie") {
        message.textContent = "It's a tie!";
    }
}

// invoked functions

init();

