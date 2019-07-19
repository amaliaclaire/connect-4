
// 3. Explanations of global variables below.
let game_active = false; // game immediately displays false, since no player has click the "drop" function
let active_player = 0; // starts at 0
const gameboard = []; // emptry array
const player_color = ["red", "blue"]; // players assigned colors
const gameWidth = 7;
const gameHeight = 6;






const DIRECTIONS = [
  {i: 1, j: 0}, //Horizontal
  {i: 0, j: 1}, //Vertical
  {i: 1, j: 1}, // Diagonal
  {i: -1, j: 1} // Other diagonal

]

//4. shows the x & y axis of the gameboard grid.

  function beginGame() {
    if (game_active == true) return false;
    game_active = true;

    // if there is an active game I make it inactive.

    for (row=0; row<=5; row++) {
      gameboard[row] = [];
      for (col=0; col<=6; col++) {
        gameboard[row][col] = null;
      }
    }

    // 5. This is how the gameboard grid is created.

    drawBoard();
    active_player = 0;
    setUpTurn();
  }


// 6. explained below.
  function drawBoard() {
    for (col = 0; col<=6; col++) {
      for (row=0; row<=5; row++) {
        const occupant = gameboard[row][col];
        // gameboard is a nested array, occupant is the specific cell inside that board.
        const cls = occupant === null ? 'empty' : `player${occupant}`;
        document.getElementById(`square_${row}_${col}`).innerHTML = `<span class='piece ${cls}'> </span>`;

        // check if the occupant is null, then set the occupant to the color of the active player.
      }
    }
  }

// 7. explained below.
  function checkForWin(color) {
      // from each cell in the grid, we check for 4 in a row for each direction aka horizontal, diagonal, vertical
      // x & y are coordinate axis

      // We're checking for the winning directions (through color). When we click on the cell, it will invoke this method "checkForWin()", it will check from that move from every direction to see if there is a winning move -- a total of 4.
      for (let y = 0; y < gameHeight; y++) {
        for (let x = 0; x < gameWidth
          ; x++) {
          for (let direction of DIRECTIONS) {
            if (checkFourColors(color, x, y, direction)) {
              return {
                x: x,
                y: y,
                direction: direction
              }
            }
          }
        }
      }
      return null;
  }

  // when you see "i" use direction.i and direction.j

// 8. explaination below
  function checkFourColors (color, startX, startY, direction) {
    let win = true;


    // offset shows how many colors need to equal 4 to "win".
    for (let offset = 0; offset < 4; offset++ ) {
      const checkX = startX + offset * direction.i;
      const checkY = startY + offset * direction.j;

      if(checkX < 0 || checkX >= gameWidth || checkY < 0 || checkY >= gameHeight ) {
        win = false;
        break;
        // this is checking for the loosing condition

      }

      if(gameboard[checkY][checkX] != color) {
        win = false;
        break;
        // this is checking for the loosing condition

      }
    }
    // console.log('win', win);
    // win is displayed here 'now render which player has 'won' here. win is equal to true.
    return win;
  }



  function setUpTurn() {
    if (game_active) {
      document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
    }
  }
  // 9. This displays to the page of which player is active.

  function endGame(winningPlayer) {
    game_active = false;
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer;

  }
  // 10. the winning player ends the game


// 11.
  function drop(col) {
      for (row=5; row>=0; row--) {
        if (gameboard[row][col] === null) {
          // if this gameboard is empty, then proceed to play and press the drop buttons.
          gameboard[row][col] = active_player;
          // this shows where the color goes on the board.
          drawBoard();
          const winningLine = checkForWin(active_player);


          if (winningLine) {

            alert(`player ${active_player} has won`);
            // alert button showcases which active_player won.
            $(".myBtn").prop('disabled', true);
            // the buttons immediately become inactive, when the game ends.

            return
          }

          console.log('active_player', active_player);
          active_player = active_player ? 0 : 1;
          setUpTurn();
          return true;

        }
      }
  }

function restart () {
  location.reload();

}
