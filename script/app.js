
var game_active = false;
  var active_player = 0;
  var gameboard = [];
  var player_color = [];
  let gameWidth = 7;
  let gameHeight = 6;
  player_color[1] = "red";
  player_color[2] = "blue";



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
        gameboard[row][col] = 0;
      }
    }

    drawBoard();
    active_player = 1;
    setUpTurn();
  }

  function drawBoard() {
    for (col = 0; col<=6; col++) {
      for (row=0; row<=5; row++) {

        document.getElementById('square_'+row+'_'+col).innerHTML ="<span class='piece player"+gameboard[row][col]+"'> </span>";
      }
    }
  }

  function checkForWin(color) {
      // from each cell in the grid, we check for 4 in a row for each direction aka horizontal, diagonal, vertical
      // x & y are coordinate axis
      for (let y = 0; y < gameHeight; y++) {
        for (let x = 0; x < gameWidth; x++) {
          for (let direction of DIRECTIONS) {
            if (checkFourColors(color, x, y, direction)) {
              return {
                x: x,
                y: y,
                direction: direction
              }
            }
            return false;
          }
        }
      }
  }

  // when you see "i" use direction.i and direction.j

  function checkFourColors (color, startX, startY, direction) {
    let win = true;


    for (let offset = 0; offset < 4; offset++ ) {
      const checkX = startX + offset * direction.i;
      const checkY = startY + offset * direction.j;

      if(checkX < 0 || checkX >= gameWidth || checkY < 0 || checkY >= gameheight ) {
        win = false;
        break;
      }

      if(gameboard[checkY][checkX] != color) {
        win = false;
        break;
      }
    }
    return win;
  }






  function endGame(winningPlayer) {
    game_active = false;
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer;
  }

  function setUpTurn() {
    if (game_active) {
      document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
    }
  }

  function drop(col) {
      for (row=5; row>=0; row--) {
        if (gameboard[row][col] == 0) {
          gameboard[row][col] = active_player;
          drawBoard();
          if (active_player == 1) {
            active_player = 2;
          } else {
            active_player = 1;
          }
          setUpTurn();
          return true;
        }
      }
  }
