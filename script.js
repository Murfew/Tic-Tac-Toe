const gameboard = (function () {
  const board = [];
  const rows = 3;
  const columns = 3;
  let availableSpaces = rows * columns;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;
  const getAvailableSpaces = () => availableSpaces;

  // Move validation and applying move

  const makeMove = (token, row, column) => {
    if (board[row][column].getValue() !== " ") {
      console.log("Invalid move. Try again.");
      return false;
    } else {
      board[row][column].setValue(token);
      availableSpaces -= 1;
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

  return { printBoard, makeMove, getBoard, getAvailableSpaces };
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

  const checkGameState = (row, column) => {
    const board = gameboard.getBoard();

    // check the row

    if (
      board[row][0].getValue() === board[row][1].getValue() &&
      board[row][0].getValue() === board[row][2].getValue()
    ) {
      if (board[row][0] !== " ") {
        return [true, false];
      }
    }

    // check column
    if (
      board[0][column].getValue() === board[1][column].getValue() &&
      board[0][column].getValue() === board[2][column].getValue()
    ) {
      if (board[0][column] !== " ") {
        return [true, false];
      }
    }

    // check diagonals
    if ((row + column) % 2 == 0) {
      if (
        board[0][0].getValue() === board[1][1].getValue() &&
        board[0][0].getValue() === board[2][2].getValue()
      ) {
        if (board[0][0].getValue() !== " ") {
          return [true, false];
        }
      }

      if (
        board[0][2].getValue() === board[1][1].getValue() &&
        board[0][2].getValue() === board[2][0].getValue()
      ) {
        if (board[0][2].getValue() !== " ") {
          return [true, false];
        }
      }
    }

    // check tie
    if (gameboard.getAvailableSpaces() === 0) {
      return [true, true];
    }

    return [false, false];
  };

  const playGame = () => {
    while (true) {
      printNewRound();

      let playerRow;
      let playerCol;

      while (true) {
        playerRow = Number(
          prompt("In which row would you like to make your move?")
        );
        playerCol = Number(
          prompt("In which column would you like to make your move?")
        );

        if (gameboard.makeMove(getActivePlayer().token, playerRow, playerCol)) {
          break;
        }
      }

      const [gameOver, isTie] = checkGameState(playerRow, playerCol);
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

const displayController = (function () {
  const updateGrid = () => {
    const gameBtns = document.querySelectorAll(".container button");
    const board = gameboard.getBoard();
    gameBtns.forEach((btn) => {
      let row = btn.dataset.row;
      let column = btn.dataset.column;
      btn.textContent = board[row][column].getValue();
    });
  };
})();
