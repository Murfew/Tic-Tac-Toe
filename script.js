const gameboard = (function () {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  // Move validation and applying move

  function makeMove(player, row, column) {
    if (board[row][column] !== "") {
      return false;
    } else {
      board[row][column] = player.token;
    }
  }

  // Console printing
  function printBoard() {
    board.forEach((row) => {
      console.log(row.join(" | "));
      console.log("-" * 20);
    });
  }
})();

function Cell() {
  let value = "";

  const getValue = () => value;

  const setValue = (player) => {
    value = player;
  };
}

const gameController = (function (
  playerOneName = "X Player",
  playerTwoName = "O Player"
) {
  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  let activePlayer = players[0];
  const getActivePlayer = () => {
    activePlayer;
  };

  function swtichPlayer() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  function printNewRound() {
    gameboard.printBoard();
    console.log(`It's ${getActivePlayer.name}'s turn`);
  }
  // Win checking (inside round playing)
})();
