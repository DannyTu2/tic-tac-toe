function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = []
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
        if (!availableCells.length) return;

        board[row][column].addToken(player);
      };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    const winningCondition = () => {

            // first row horizontal win condition
            if((board[0][0].getValue() === 1 && board[0][1].getValue() === 1 && board[0][2].getValue() === 1)) {
                console.log("Player 1 is the winner!")
                return true; // trying to make it so it breaks in the for loop
            } else if((board[0][0].getValue() === 2 && board[0][1].getValue() === 2 && board[0][2].getValue() === 2)) {
                console.log("Player 2 is the winner!");
                return true;
            }
            // second row horizontal win condition
            if((board[1][0].getValue() === 1 && board[1][1].getValue() === 1 && board[1][2].getValue() === 1)) {
              console.log("Player 1 is the winner!")
              return true;
            } else if ((board[1][0].getValue() === 2 && board[1][1].getValue() === 2 && board[1][2].getValue() === 2)) {
              console.log("Player 2 is the winner!");
              return true;
            }

            // third row horizontal win condition
            if((board[2][0].getValue() === 1 && board[2][1].getValue() === 1 && board[2][2].getValue() === 1)) {
              console.log("Player 1 is the winner!")
              return true;
            } else if ((board[2][0].getValue() === 2 && board[2][1].getValue() === 2 && board[2][2].getValue() === 2)) {
              console.log("Player 2 is the winner!");
              return true;
            }

            // first vertical win condition
            if((board[0][0].getValue() === 1 && board[1][0].getValue() === 1) && board[2][0].getValue() === 1) {
              console.log("Player 1 is the winner")
              return true;
            } else if((board[0][0].getValue() === 1 && board[1][0].getValue() === 1) && board[2][0].getValue() === 1) {
              console.log("Player 2 is the winner")
              return true;
            }

            // second vertical win condition
            if((board[0][1].getValue() === 1 && board[1][1].getValue() === 1) && board[2][1].getValue() === 1) {
              console.log("Player 1 is the winner")
              return true;
            } else if((board[0][1].getValue() === 1 && board[1][1].getValue() === 1) && board[2][1].getValue() === 1) {
              console.log("Player 2 is the winner")
              return true;
            }

             // second vertical win condition
            if((board[0][2].getValue() === 1 && board[1][2].getValue() === 1) && board[2][2].getValue() === 1) {
              console.log("Player 1 is the winner")
              return true;
            } else if((board[0][2].getValue() === 1 && board[1][2].getValue() === 1) && board[2][2].getValue() === 1) {
              console.log("Player 2 is the winner")
              return true;
            }

            // diagonal 1
            if((board[0][0].getValue() === 1 && board[1][1].getValue() === 1) && board[2][2].getValue() === 1) {
              console.log("Player 1 is the winner")
              return true;
            } else if((board[0][0].getValue() === 1 && board[1][1].getValue() === 1) && board[2][2].getValue() === 1) {
              console.log("Player 2 is the winner")
              return true;
            }            
            
            // diagonal 2
            if((board[2][0].getValue() === 1 && board[1][1].getValue() === 1) && board[0][2].getValue() === 1) {
              console.log("Player 1 is the winner")
              return true;
            } else if((board[2][0].getValue() === 1 && board[1][1].getValue() === 1) && board[0][2].getValue() === 1) {
              console.log("Player 2 is the winner")
              return true;
            }
          }          
    
    return {getBoard, placeToken, printBoard, winningCondition};
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    }
}

function GameController (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = GameBoard();

    const players = [
        {
            name:playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token:2
        }
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
        switchPlayerTurn();
        printNewRound();
      };

    // possible coordinate you can input
    // from 0 to 2 for row
    // from 0 to 2 for column
    // there is probably only max 
    for(let i = 0; i <= 9; i++) {
        // for now
        // If one array is filled in the 2D array, then return winner. Horizontal Check
        // Diagonal Check
        // Vertical Check
        // maybe create a new function called checkWinningCondition?
      const inputRow = prompt("What row number you want to input?"); 
      const inputCol = prompt("What col number you want to input?");

      playRound(inputRow, inputCol);

      if(board.winningCondition() == true) {
        break;
      }

      // this is for the tie condition
      // might be a bug here
      if(board.winningCondition() == false || i === 9) {
        console.log("Tie! Neither player wins!")
        break;
      }
       

    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
      };
    
}



const game = GameController();