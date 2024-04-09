const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('u', 'Move cursor up', this.moveCursorUp.bind(this));
    Screen.addCommand('d', 'Move cursor down', this.moveCursorDown.bind(this));
    Screen.addCommand('l', 'move cursor left', this.moveCursorLeft.bind(this));
    Screen.addCommand('r', 'move cursor right', this.moveCursorRight.bind(this));

    Screen.addCommand('space', 'Place move at cursor position', this.placeMove.bind(this));

    Screen.render();
  }

 moveCursorUp(){
  this.cursor.up();
  Screen.render();
 }

 moveCursorDown(){
  this.cursor.down();
  Screen.render();
 }

 moveCursorLeft(){
  this.cursor.left();
  Screen.render();
 }

 moveCursorRight(){
  this.cursor.right();
  Screen.render();
 }

 placeMove(){
 const row = this.cursor.row;
 const col = this.cursor.col;

     // Check if the cell is empty before placing the move
     if (this.grid[row][col] === ' ') {
      this.grid[row][col] = this.playerTurn;

      // Check for win after placing the move
      const winner = TTT.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
      } else {
        // Toggle player turn
        this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';

        // Re-render the screen after placing the move
        Screen.render();
      }
    }
 }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

       
       // Check rows for a win
    for (let i = 0; i < 3; i++) {
      if (grid[i][0] !== ' ' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
          return grid[i][0]; // Return the winner
      }
  }

  // Check columns for a win
  for (let i = 0; i < 3; i++) {
      if (grid[0][i] !== ' ' && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
          return grid[0][i]; // Return the winner
      }
  }

  // Check diagonals for a win
  if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return grid[0][0]; // Return the winner
  }
  if (grid[0][2] !== ' ' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return grid[0][2]; // Return the winner
  }
    // Check for a tie
    for (let row of grid) {
        for (let cell of row) {
            if (cell === ' ') {
                return false; // Game is not over, there are empty cells
            }
        }
    }
    return 'T'; // Game is a tie

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
