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

  const makeMove = (player, row, column) => {
    if (board[row][column].getValue() !== " ") {
      console.log("Invalid move. Try again.");
      return false;
    } else {
      board[row][column].setValue(player.token);
      return true;
    }
  };

  // Console printing
  const printBoard = () => {
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
  };

  return { printBoard, makeMove, getBoard };
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
  const getActivePlayer = () => activePlayer;

  const swtichPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const checkGameState = () => {
    const board = gameboard.getBoard();

    // check rows
    board.forEach((row) => {
      if ((row[0].getValue() === row[1].getValue()) === row[2].getValue()) {
        return [true, false];
      }
    });

    // check cols
    board.forEach((row, index) => {
      if (
        (board[0][index].getValue() === board[1][index].getValue()) ===
        board[2][index].getValue()
      ) {
        return [true, false];
      }
    });

    // check diags
    if (
      (board[0][0].getValue() === board[1][1].getValue()) ===
        board[2][2].getValue() ||
      (board[0][2].getValue() === board[1][1].getValue()) ===
        board[2][0].getValue()
    ) {
      return [true, false];
    }

    // check tie
    let emptySpaces = 0;
    board.forEach((row) => {
      emptySpaces += row.filter((cell) => {
        cell.getValue() === " ";
      }).length;
    });
    if (emptySpaces === 9) {
      return [true, true];
    }

    return [false, false];
  };

  const playGame = () => {
    while (true) {
      printNewRound();

      while (true) {
        let playerRow = prompt(
          "In which row would you like to make your move?"
        );
        let playerCol = prompt(
          "In which column would you like to make your move?"
        );

        if (gameboard.makeMove(getActivePlayer(), playerRow, playerCol)) {
          break;
        }
      }

      const [gameOver, isTie] = checkGameState();
      if (gameOver) {
        if (isTie) {
          alert("The game was a tie!");
        } else {
          alert(`${getActivePlayer().name} wins!`);
        }
        break;
      }

      swtichPlayer();
    }
  };

  return { playGame };
})();

gameController.playGame();
