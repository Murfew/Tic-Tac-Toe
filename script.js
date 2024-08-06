const gameboard = (function () {
  const board = [];
  const rows = 3;
  const columns = 3;
  let availableSpaces;

  const makeNewBoard = () => {
    board.length = 0;
    availableSpaces = rows * columns;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  makeNewBoard();

  const getBoard = () => board;
  const getAvailableSpaces = () => availableSpaces;

  // Move validation and applying move

  const makeMove = (token, row, column) => {
    if (board[row][column].getValue() === " ") {
      board[row][column].setValue(token);
      availableSpaces -= 1;
    }
  };

  return {
    makeMove,
    getBoard,
    getAvailableSpaces,
    makeNewBoard,
  };
})();

function Cell() {
  let value = " ";

  const getValue = () => value;

  const setValue = (player) => {
    value = player;
  };

  return { getValue, setValue };
}

const gameController = (function () {
  const players = [
    { name: "X Player", token: "X" },
    { name: "O Player", token: "O" },
  ];

  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;

  const swtichPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
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

  const playRound = (row, column) => {
    gameboard.makeMove(getActivePlayer().token, row, column);

    const [gameOver, isTie] = checkGameState(row, column);

    if (gameOver) {
      return [gameOver, isTie];
    } else {
      swtichPlayer();
      return [gameOver, isTie];
    }
  };

  return { playRound, getActivePlayer, swtichPlayer, players };
})();

const displayController = (function () {
  const gameBtns = document.querySelectorAll(".container button");
  const board = gameboard.getBoard();
  const player = document.querySelector(".player");
  const playAgain = document.querySelector(".play-again");
  const winner = document.querySelector(".winner");
  const endDialog = document.querySelector(".game-over");
  const startDialog = document.querySelector(".start-game");
  const playGame = document.querySelector(".play");
  const player1Name = document.querySelector("#player-1");
  const player2Name = document.querySelector("#player-2");

  const update = () => {
    gameBtns.forEach((btn) => {
      let row = btn.dataset.row;
      let column = btn.dataset.column;
      btn.textContent = board[row][column].getValue();
    });

    player.textContent = `${gameController.getActivePlayer().name}'s turn`;
  };

  gameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // check if valid move
      if (board[btn.dataset.row][btn.dataset.column].getValue() === " ") {
        // play move
        let [gameOver, isTie] = gameController.playRound(
          btn.dataset.row,
          btn.dataset.column
        );

        // if game over display results on display
        // play agin button
        if (gameOver) {
          if (isTie) {
            winner.textContent = "The game was a tie.";
          } else {
            winner.textContent = `${
              gameController.getActivePlayer().name
            } wins!`;

            if (gameController.getActivePlayer() == gameController.players[1]) {
              gameController.swtichPlayer();
            }
          }
          endDialog.showModal();
        }

        update();
      }
    });
  });

  playAgain.addEventListener("click", () => {
    gameboard.makeNewBoard();
    update();
    endDialog.close();
    startDialog.showModal();
  });

  playGame.addEventListener("click", () => {
    if (player1Name.value != "") {
      gameController.players[0].name = player1Name.value;
    } else {
      gameController.players[0].name = "X Player";
    }
    if (player2Name.value != "") {
      gameController.players[1].name = player2Name.value;
    } else {
      gameController.players[1].name = "O Player";
    }
    update();
    startDialog.close();
  });

  window.onload = () => {
    startDialog.showModal();
  };

  return {};
})();
