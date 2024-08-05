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

  // Move validation and applying move

  function makeMove(player, row, column) {
    if (board[row][column].getValue() !== " ") {
      return false;
    } else {
      board[row][column].setValue(player.token);
    }
  }

  // Console printing
  function printBoard() {
    board.forEach((row, index) => {
      const rowValues = [];
      row.forEach((cell) => {
        rowValues.push(cell.getValue());
      });
      if (index !== board.length - 1) {
        console.log(rowValues.join("|"));
        console.log("-----");
      } else {
        console.log(rowValues.join("|"));
      }
    });
  }

  return { printBoard, makeMove };
})();

function Cell() {
  let value = " ";

  const getValue = () => value;

  const setValue = (player) => {
    value = player;
  };

  return { getValue, setValue };
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

gameboard.makeMove({ token: "X" }, 0, 0);
gameboard.printBoard();
