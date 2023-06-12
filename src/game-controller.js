// CONSTRUCTORS
const Gameboard = (lives) => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board, lives };
};

const Player = (name, type, mark, lives) => {
  let health = 100;
  lives = lives;
  const damage = (1 / parseInt(lives)) * 100;

  const removeHealth = () => {
    health -= damage;
    lives--;
  };

  const getHealth = () => {
    return health;
  };

  const getLives = () => {
    return lives;
  };

  return { name, type, mark, removeHealth, getHealth, getLives };
};

const gameController = (() => {
  let gameboard = null;
  let playerX = null;
  let playerO = null;

  const prepareBoard = (lives) => {
    gameboard = Gameboard(lives);
  };

  const createPlayers = (dataPlayerX, dataPlayerO) => {
    playerX = Player(
      dataPlayerX[0],
      dataPlayerX[1],
      dataPlayerX[2],
      gameboard.lives
    );
    playerO = Player(
      dataPlayerO[0],
      dataPlayerO[1],
      dataPlayerO[2],
      gameboard.lives
    );
  };

  const moveBot = () => {
    for (let index = 0; index < gameboard.board.length; index++) {
      if (gameboard.board[index] === "") {
        displayController.showBotMovement(index);
        return;
      }
    }
  };

  const moveGod = (godMark) => {
    const enemyMark = godMark === "x" ? "o" : "x";
    const marks = { godMark: godMark, enemyMark: enemyMark };

    const bestMovement = minmax(marks, marks.godMark, gameboard.board);
    displayController.showBotMovement(bestMovement.index);
  };

  function minmax(marks, currentMark, board) {
    let moves = [];
    let bestScore = currentMark === marks.godMark ? -Infinity : Infinity;
    let bestMove = null;

    if (getWinner(board) === marks.godMark) {
      return { score: 1 };
    } else if (getWinner(board) === marks.enemyMark) {
      return { score: -1 };
    } else if (getWinner(board) === "tie") {
      return { score: 0 };
    }

    for (let i = 0; i < board.length; i++) {
      let move = {};

      if (board[i] === "") {
        if (currentMark === marks.godMark) {
          board[i] = currentMark;
          let result = minmax(marks, marks.enemyMark, board);
          move.score = result.score;
        } else if (currentMark === marks.enemyMark) {
          board[i] = currentMark;
          let result = minmax(marks, marks.godMark, board);
          move.score = result.score;
        }
        move.index = i;
        moves.push(move);
        board[i] = "";
      }
    }

    for (let i = 0; i < moves.length; i++) {
      if (currentMark === marks.godMark && moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      } else if (
        currentMark === marks.enemyMark &&
        moves[i].score < bestScore
      ) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }

    return moves[bestMove];
  }

  const addMove = (mark, position) => {
    gameboard.board[position] = mark;
    checkWin();
  };

  const checkWin = () => {
    const winner = getWinner();

    if (winner === playerO.mark) {
      playerX.removeHealth();
      displayController.removeHealth(playerX.mark, playerX.getHealth());
      setTimeout(checkEnd, 1000);
    } else if (winner === playerX.mark) {
      playerO.removeHealth();
      displayController.removeHealth(playerO.mark, playerO.getHealth());
      setTimeout(checkEnd, 1000);
    } else if (winner === "tie") {
      playerX.removeHealth();
      displayController.removeHealth(playerX.mark, playerX.getHealth());
      playerO.removeHealth();
      displayController.removeHealth(playerO.mark, playerO.getHealth());
      setTimeout(checkEnd, 1000);
    }
  };

  function getWinner() {
    let winner = checkHorizontal();
    if (winner === "") winner = checkVertical();
    if (winner === "") winner = checkDiagonal();
    if (winner === "") winner = checkTie();
    return winner;
  }

  function checkEnd() {
    if (playerX.getLives() === 0 && playerO.getLives() === 0) {
      displayController.showFinishMenu("tie");
    } else if (playerX.getLives() === 0) {
      displayController.showFinishMenu(playerO.name);
    } else if (playerO.getLives() === 0) {
      displayController.showFinishMenu(playerX.name);
    }
  }

  function checkHorizontal() {
    let winner = "";
    if (
      gameboard.board[0] !== "" &&
      gameboard.board[0] === gameboard.board[1] &&
      gameboard.board[1] === gameboard.board[2]
    ) {
      winner = gameboard.board[0];
    } else if (
      gameboard.board[3] !== "" &&
      gameboard.board[3] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[5]
    ) {
      winner = gameboard.board[3];
    } else if (
      gameboard.board[6] !== "" &&
      gameboard.board[6] === gameboard.board[7] &&
      gameboard.board[7] === gameboard.board[8]
    ) {
      winner = gameboard.board[6];
    }
    return winner;
  }

  function checkVertical() {
    let winner = "";
    if (
      gameboard.board[0] !== "" &&
      gameboard.board[0] === gameboard.board[3] &&
      gameboard.board[3] === gameboard.board[6]
    ) {
      winner = gameboard.board[0];
    } else if (
      gameboard.board[1] !== "" &&
      gameboard.board[1] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[7]
    ) {
      winner = gameboard.board[1];
    } else if (
      gameboard.board[2] !== "" &&
      gameboard.board[2] === gameboard.board[5] &&
      gameboard.board[5] === gameboard.board[8]
    ) {
      winner = gameboard.board[2];
    }
    return winner;
  }

  function checkDiagonal() {
    let winner = "";
    if (
      gameboard.board[0] !== "" &&
      gameboard.board[0] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[8]
    ) {
      winner = gameboard.board[0];
    } else if (
      gameboard.board[2] !== "" &&
      gameboard.board[2] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[6]
    ) {
      winner = gameboard.board[2];
    }
    return winner;
  }

  function checkTie() {
    for (let index = 0; index < gameboard.board.length; index++) {
      if (gameboard.board[index] === "") return "";
    }

    return "tie";
  }

  return { createPlayers, prepareBoard, moveBot, moveGod, addMove };
})();
