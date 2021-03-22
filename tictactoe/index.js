const statusDisplay = document.querySelector('.gameStatus');

 let gameInProgress = true;
 let currentPlayer = "X";
 let gameState = ["", "", "", "", "", "", "", "", ""];

 const winMessage = () => `Player ${currentPlayer} has won!`;
 const drawMessage = () => `No winner - it's a draw!`;
 const currentPlayerUpNext = () => `Player ${currentPlayer} is up next`;

 statusDisplay.innerHTML = currentPlayerUpNext();

 const winningConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
 ];

 function handleCellPlayed(clickedCell, clickedCellIndex) {
     gameState[clickedCellIndex] = currentPlayer;
     clickedCell.innerHTML = currentPlayer;
 }

 function handlePlayerChange() {
     currentPlayer = currentPlayer === "X" ? "O" : "X";
     statusDisplay.innerHTML = currentPlayerUpNext();
 }

//Check all 8 of the possible winning combinations
//Loop
 function handleResultValidation() {
     let gameWon = false;
     for (let i = 0; i <= 7; i++) {
         const winCondition = winningConditions[i];
         let a = gameState[winCondition[0]];
         let b = gameState[winCondition[1]];
         let c = gameState[winCondition[2]];

         if (a === '' || b === '' || c === '') {
             continue;
         }
//If all 3 values (corresponding to the grid positions in the winning rows array) are equal then the game has been won
         if (a === b && b === c) {
             gameWon = true;
             break
         }
     }
//End of loop
//If the game has been won - stop the game in progress and output a 'Win' message.
     if (gameWon) {
         statusDisplay.innerHTML = winMessage();
         gameInProgress = false;
         return;
     }
//The game is a draw if none of the values in the array are = "" - set boolean to true
     let gameDraw = !gameState.includes("");

//If the game is a draw - stop the game in progress and output a 'Draw' message.
     if (gameDraw) {
         statusDisplay.innerHTML = drawMessage();
         gameInProgress = false;
         return;
     }
//Change the player
     handlePlayerChange();
 }

 function handleCellClick(clickedCellEvent) {
     const clickedCell = clickedCellEvent.target;
     const clickedCellIndex = parseInt(clickedCell.getAttribute('gameCell'));
//Only allow selection if cell is blank
     if (gameState[clickedCellIndex] !== "" || !gameInProgress) {
         return;
     }

     handleCellPlayed(clickedCell, clickedCellIndex);
     handleResultValidation();
 }

 function handleRestartGame() {
     gameInProgress = true;
     currentPlayer = "X";
     gameState = ["", "", "", "", "", "", "", "", ""];
     statusDisplay.innerHTML = currentPlayerUpNext();
     document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
 }

 document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
 document.querySelector('.gameRestart').addEventListener('click', handleRestartGame); 
