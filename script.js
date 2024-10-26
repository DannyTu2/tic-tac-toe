function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placeToken = (row, column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === "")
      .map((row) => row[column]);
    if (!availableCells.length) return;

    board[row][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  // need to refactor this code
  const winningCondition = () => {
    // first row horizontal win condition
    if (
      board[0][0].getValue() === "X" &&
      board[0][1].getValue() === "X" &&
      board[0][2].getValue() === "X"
    ) {
      return true; // trying to make it so it breaks in the for loop
    } else if (
      board[0][0].getValue() === "O" &&
      board[0][1].getValue() === "O" &&
      board[0][2].getValue() === "O"
    ) {
      return true;
    }
    // second row horizontal win condition
    if (
      board[1][0].getValue() === "X" &&
      board[1][1].getValue() === "X" &&
      board[1][2].getValue() === "X"
    ) {
      return true;
    } else if (
      board[1][0].getValue() === "O" &&
      board[1][1].getValue() === "O" &&
      board[1][2].getValue() === "O"
    ) {
      return true;
    }

    // third row horizontal win condition
    if (
      board[2][0].getValue() === "X" &&
      board[2][1].getValue() === "X" &&
      board[2][2].getValue() === "X"
    ) {
      return true;
    } else if (
      board[2][0].getValue() === "O" &&
      board[2][1].getValue() === "O" &&
      board[2][2].getValue() === "O"
    ) {
      return true;
    }

    // first vertical win condition
    if (
      board[0][0].getValue() === "X" &&
      board[1][0].getValue() === "X" &&
      board[2][0].getValue() === "X"
    ) {
      return true;
    } else if (
      board[0][0].getValue() === "O" &&
      board[1][0].getValue() === "O" &&
      board[2][0].getValue() === "O"
    ) {
      return true;
    }

    if (
      board[0][1].getValue() === "X" &&
      board[1][1].getValue() === "X" &&
      board[2][1].getValue() === "X"
    ) {
      return true;
    } else if (
      board[0][1].getValue() === "O" &&
      board[1][1].getValue() === "O" &&
      board[2][1].getValue() === "O"
    ) {
      return true;
    }

    // second vertical win condition
    if (
      board[0][2].getValue() === "X" &&
      board[1][2].getValue() === "X" &&
      board[2][2].getValue() === "X"
    ) {
      return true;
    } else if (
      board[0][2].getValue() === "O" &&
      board[1][2].getValue() === "O" &&
      board[2][2].getValue() === "O"
    ) {
      return true;
    }

    // diagonal 1
    if (
      board[0][0].getValue() === "X" &&
      board[1][1].getValue() === "X" &&
      board[2][2].getValue() === "X"
    ) {
      return true;
    } else if (
      board[0][0].getValue() === "O" &&
      board[1][1].getValue() === "O" &&
      board[2][2].getValue() === "O"
    ) {
      return true;
    }

    // diagonal 2
    if (
      board[2][0].getValue() === "X" &&
      board[1][1].getValue() === "X" &&
      board[0][2].getValue() === "X"
    ) {
      return true;
    } else if (
      board[2][0].getValue() === "O" &&
      board[1][1].getValue() === "O" &&
      board[0][2].getValue() === "O"
    ) {
      return true;
    }
    return false;
  };

  return { getBoard, placeToken, printBoard, winningCondition };
}

function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, col) => {
    board.placeToken(row, col, getActivePlayer().token);
    if (board.winningCondition() == true) {
      console.log(`${getActivePlayer().name}'s is the winner`);
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    winningCondition: board.winningCondition,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const board = game.getBoard();
  const clearButton = document.querySelector(".clearButton");
  const activePlayer = game.getActivePlayer();

  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, indexRow) => {
      row.forEach((cell, indexCol) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = indexCol;
        cellButton.dataset.row = indexRow;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const winnerDiv = document.querySelector(".winner");
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (game.winningCondition()) {
      winnerDiv.textContent = `${activePlayer.name}'s is the winner!`;
      return;
    }
    if (board[selectedRow][selectedColumn].getValue() == "") {
      game.playRound(selectedRow, selectedColumn);
    }

    updateScreen();
  }

  function clickClearBoard(e) {
    const cellButton = document.querySelector("button")
    board.forEach(row => {
      row.forEach(cell => {
        cellButton.textContent = "";
      });
    });

  }


  boardDiv.addEventListener("click", clickHandlerBoard);
  clearButton.addEventListener("click", clickClearBoard);
  updateScreen();
}

ScreenController();
