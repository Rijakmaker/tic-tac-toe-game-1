const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startGame");
const restartBtn = document.getElementById("restartBtn");

const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");

const player1SymbolSelect = document.getElementById("player1Symbol");
const player2SymbolSelect = document.getElementById("player2Symbol");

let player1Name = "";
let player2Name = "";

let player1Symbol = "";
let player2Symbol = "";

let currentPlayerSymbol = "";
let currentPlayerName = "";

let board = ["","","","","","","","",""];
let gameActive = false;

const winConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

startBtn.addEventListener("click", startGame);

cells.forEach(cell=>{
cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function startGame(){

player1Name = player1NameInput.value || "Player 1";
player2Name = player2NameInput.value || "Player 2";

player1Symbol = player1SymbolSelect.value;
player2Symbol = player2SymbolSelect.value;

if(player1Symbol === player2Symbol){

alert("Players must select different symbols!");
return;

}

currentPlayerSymbol = player1Symbol;
currentPlayerName = player1Name;

gameActive = true;

statusText.textContent = `${currentPlayerName} (${currentPlayerSymbol}) Turn`;

}

function handleClick(){

if(!gameActive) return;

const index = this.getAttribute("data-index");

if(board[index] !== "") return;

board[index] = currentPlayerSymbol;

this.textContent = currentPlayerSymbol;

checkWinner();

}

function checkWinner(){

let winnerFound = false;

for(let i=0;i<winConditions.length;i++){

const [a,b,c] = winConditions[i];

if(board[a] && board[a] === board[b] && board[a] === board[c]){

winnerFound = true;
break;

}

}

if(winnerFound){

statusText.textContent = `${currentPlayerName} Wins! 🎉`;
gameActive = false;
return;

}

if(!board.includes("")){

statusText.textContent = "Game Draw!";
gameActive = false;
return;

}

if(currentPlayerSymbol === player1Symbol){

currentPlayerSymbol = player2Symbol;
currentPlayerName = player2Name;

}else{

currentPlayerSymbol = player1Symbol;
currentPlayerName = player1Name;

}

statusText.textContent = `${currentPlayerName} (${currentPlayerSymbol}) Turn`;

}

function restartGame(){

board = ["","","","","","","","",""];

cells.forEach(cell=>{
cell.textContent="";
});

gameActive = false;

statusText.textContent = "Enter player names and start game";

}
