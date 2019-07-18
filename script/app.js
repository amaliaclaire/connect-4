
let game_active = false;
let active_player = 0;
const gameboard = [];
const player_color = ["red", "blue"];
const gameWidth = 7;
const gameHeight = 6;




const DIRECTIONS = [
  {i: 1, j: 0}, //Horizontal
  {i: 0, j: 1}, //Vertical
  {i: 1, j: 1}, // Diagonal
  {i: -1, j: 1} // Other diagonal
]

  function beginGame() {

    if (game_active == true) return false;
    game_active = true;

    for (row=0; row<=5; row++) {
      gameboard[row] = [];
      for (col=0; col<=6; col++) {
        gameboard[row][col] = null;
      }
    }

    drawBoard();
    active_player = 0;
    setUpTurn();
  }

  function drawBoard() {
    for (col = 0; col<=6; col++) {
      for (row=0; row<=5; row++) {
        const occupant = gameboard[row][col];
        const cls = occupant === null ? 'empty' : `player${occupant}`;
        document.getElementById(`square_${row}_${col}`).innerHTML = `<span class='piece ${cls}'> </span>`;
      }
    }
  }

  function checkForWin(color) {
      // from each cell in the grid, we check for 4 in a row for each direction aka horizontal, diagonal, vertical
      // x & y are coordinate axis
      for (let y = 0; y < gameHeight; y++) {
        for (let x = 0; x < gameWidth; x++) {
          for (let direction of DIRECTIONS) {
            // console.log(direction);
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

  function checkFourColors (color, startX, startY, direction) {
    let win = true;


    // offset shows how many colors need to equal 4 to "win".
    for (let offset = 0; offset < 4; offset++ ) {
      const checkX = startX + offset * direction.i;
      const checkY = startY + offset * direction.j;

      if(checkX < 0 || checkX >= gameWidth || checkY < 0 || checkY >= gameHeight ) {
        win = false;
        break;
      }

      if(gameboard[checkY][checkX] != color) {
        win = false;
        break;
      }
    }
    // console.log('win', win);
    // win is displayed here 'now render which player has 'won' here maybe with a function
    return win;
  }



  function setUpTurn() {
    if (game_active) {
      document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
    }
  }

  function endGame(winningPlayer) {
    game_active = false;
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer;

  }




  function drop(col) {
      for (row=5; row>=0; row--) {
        if (gameboard[row][col] === null) {
          gameboard[row][col] = active_player;
          drawBoard();
          const winningLine = checkForWin(active_player);
          // console.log('active', active_player);
          // THIS IS WHERE YOU START LOOOKING AT THE ACTIVE PLAYER AND WHO WON

          if (winningLine) {

            alert(`player ${active_player} has won`);
            $(".myBtn").prop('disabled', true); 
            // let button = document.getElementsByClassName("myBtn")
            // button.disabled = true;


            return
          }

          console.log('active_player', active_player);
          active_player = active_player ? 0 : 1;
          setUpTurn();
          return true;


        }
      }
  }
