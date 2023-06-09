// CONSTRUCTORS
const Gameboard = (lives) => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board, lives };
};

const Player = (name, mark, lives) => {
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

  return { name, mark, removeHealth, getHealth, getLives };
};

// MODULES
const gameController = (() => {
  let gameboard = null;
  let playerX = null;
  let playerO = null;

  const prepareBoard = (lives) => {
    gameboard = Gameboard(lives);
  };

  const createPlayers = (namePlayerX, namePlayerO) => {
    playerX = Player(namePlayerX, "x", gameboard.lives);
    playerO = Player(namePlayerO, "o", gameboard.lives);
  };

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

  function checkEnd() {
    if (playerX.getLives() === 0 && playerO.getLives() === 0) {
      displayController.showFinishMenu("tie");
    } else if (playerX.getLives() === 0) {
      displayController.showFinishMenu(playerO.name);
    } else if (playerO.getLives() === 0) {
      displayController.showFinishMenu(playerX.name);
    }
  }

  return { createPlayers, prepareBoard, addMove };
})();
