// CONSTRUCTORS
const Gameboard = (lives) => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board, lives };
};

const Player = (name, type, lives) => {
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

  return { name, type, removeHealth, getHealth, getLives };
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

  const addMove = (type, position) => {
    gameboard.board[position] = type;
    checkWin();
  };

  const checkWin = () => {
    const winner = getWinner();
    console.log(winner);

    if (winner === playerO.type) {
      playerX.removeHealth();
      displayController.removeHealth(playerX.type, playerX.getHealth());
      setTimeout(checkEnd, 1000);
    } else if (winner === playerX.type) {
      playerO.removeHealth();
      displayController.removeHealth(playerO.type, playerO.getHealth());
      setTimeout(checkEnd, 1000);
    } else if (winner === "tie") {
      playerX.removeHealth();
      displayController.removeHealth(playerX.type, playerX.getHealth());
      playerO.removeHealth();
      displayController.removeHealth(playerO.type, playerO.getHealth());
      setTimeout(checkEnd, 1000);
    }
  };

  function getWinner() {
    let winner = checkHorizontal();
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

const displayController = (() => {
  const mainMenu = document.querySelector(".main-menu-container");
  const gameboardContainer = document.querySelector(".gameboard-container");
  const finishMenu = document.querySelector(".finish-menu");

  let turn = "fa-solid fa-xmark";

  const setUp = () => {
    const roundsInput = document.querySelector(".rounds-input");
    const fightButton = document.querySelector(".fight-button");
    const playAgainButton = document.querySelector(".play-again-button");
    const mainMenuButton = document.querySelector(".main-menu-button");

    roundsInput.addEventListener("change", changeNumberLives);
    fightButton.addEventListener("click", startGame);
    playAgainButton.addEventListener("click", playAgain);
    mainMenuButton.addEventListener("click", goBackToMenu);
  };

  const removeHealth = (loser, health) => {
    let loserHealht = null;

    if (loser === "x") {
      loserHealht = document.querySelector(".health-x-player");
    } else {
      loserHealht = document.querySelector(".health-o-player");
    }

    loserHealht.style.width = health + "%";

    cleanBoard();
  };

  const showFinishMenu = (winner) => {
    const winnerName = document.querySelector(".winner-name");

    if (winner === "tie") {
      winnerName.textContent = "It's a tie";
    } else {
      winnerName.textContent = winner + " won!";
    }

    finishMenu.classList.remove("hide");
  };

  function startGame() {
    if (!checkNames()) return;

    const cells = document.querySelectorAll(".gameboard > i");
    const numberLives = document.querySelector(".number-lives");
    const healthXplayer = document.querySelector(".health-x-player");
    const healthOplayer = document.querySelector(".health-o-player");

    mainMenu.classList.add("hide");
    gameboardContainer.classList.remove("hide");

    cells.forEach((cell) => {
      cell.addEventListener("click", addMove);
      cell.className = "";
    });

    healthXplayer.style.width = "100%";
    healthOplayer.style.width = "100%";

    gameController.prepareBoard(parseInt(numberLives.textContent));
    createPlayers();
  }

  function cleanBoard() {
    const cells = document.querySelectorAll(".gameboard > i");
    const numberLives = document.querySelector(".number-lives");

    cells.forEach((cell) => {
      cell.className = "";
    });

    gameController.prepareBoard(parseInt(numberLives.textContent));
  }

  function checkNames() {
    let valid = true;
    const playerXInput = document.getElementById("name-x-player");
    const playerOInput = document.getElementById("name-o-player");

    if (playerXInput.value === "") {
      playerXInput.style.borderColor = "red";
      valid = false;
    }

    if (playerOInput.value === "") {
      playerOInput.style.borderColor = "red";
      valid = false;
    }

    return valid;
  }

  function createPlayers() {
    const playerXInput = document.getElementById("name-x-player");
    const playerOInput = document.getElementById("name-o-player");
    const playerXNameLabel = document.querySelector(".x-label-name");
    const playerONameLabel = document.querySelector(".o-label-name");

    playerXNameLabel.textContent = playerXInput.value;
    playerONameLabel.textContent = playerOInput.value;
    gameController.createPlayers(playerXInput.value, playerOInput.value);
  }

  function addMove(event) {
    const cell = event.target;

    if (cell.className !== "") return;

    cell.className = turn;
    if (turn === "fa-solid fa-xmark") {
      gameController.addMove("x", cell.id);
      turn = "fa-regular fa-circle";
    } else {
      gameController.addMove("o", cell.id);
      turn = "fa-solid fa-xmark";
    }
  }

  function changeNumberLives(event) {
    const numberLives = document.querySelector(".number-lives");
    numberLives.textContent = event.target.value;
  }

  function playAgain() {
    finishMenu.classList.add("hide");
    startGame();
  }

  function goBackToMenu() {
    mainMenu.classList.remove("hide");
    gameboardContainer.classList.add("hide");
    finishMenu.classList.add("hide");
  }

  return {
    setUp,
    removeHealth,
    showFinishMenu,
  };
})();

// MAIN
displayController.setUp();
