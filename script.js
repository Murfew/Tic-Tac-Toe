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
      return true;
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

  function checkGameState() {
    // check rows
    gameboard.forEach((row) => {
      if ((row[0].getValue() === row[1].getValue()) === row[2].getValue()) {
        return [true, row[0].getValue()];
      }
    });

    // check cols
    gameboard.forEach((row, index) => {
      if (
        (gameboard[0][index].getValue() === gameboard[1][index].getValue()) ===
        gameboard[2][index].getValue()
      ) {
        return [true, row[index].getValue()];
      }
    });

    // check diags
    if (
      (gameboard[0][0].getValue() === gameboard[1][1].getValue()) ===
        gameboard[2][2].getValue() ||
      (gameboard[0][2].getValue() === gameboard[1][1].getValue()) ===
        gameboard[2][0].getValue()
    ) {
      return [true, gameboard[1][1].getValue()];
    }

    // check tie
    let emptySpaces = 0;
    gameboard.forEach((row) => {
      emptySpaces += row.filter((cell) => {
        cell.getValue() === " ";
      }).length;
    });
    if (emptySpaces === 0) {
      return [true, null];
    }

    return [false, null];
  }

  function playGame() {
    while (true) {
      printNewRound();

      while (true) {
        let playerRow = prompt(
          "In which row would you like to make your move?"
        );
        let playerCol = prompt(
          "In which column would you like to make your move?"
        );

        if (gameboard.makeMove(getActivePlayer, playerRow, playerCol)) {
          break;
        }
      }

      let [gameOver, winner] = checkGameState();
      if (gameOver) {
        // Win or tie message (match token to player)
        break;
      }

      swtichPlayer();
    }
  }
})();
