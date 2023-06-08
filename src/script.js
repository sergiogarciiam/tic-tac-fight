// CONSTRUCTORS
const Gameboard = (lives) => {
  board = ["", "", "", "", "", "", "", "", ""];
  return { board, lives };
};

const Player = (name, type, lives) => {
  return { name, type, lives };
};

// MODULES
const gameController = (() => {
  let gameboard = null;
  let playerX = null;
  let playerO = null;

  const startGame = (lives) => {
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
    const winner = checkHorizontal();
    if (winner !== "" && winner === playerO.type) {
      displayController.showFinishMenu(playerO.name);
    } else if (winner !== "" && winner === playerX.type) {
      displayController.showFinishMenu(playerX.name);
    }
  };

  const checkHorizontal = () => {
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
  };

  return { createPlayers, startGame, addMove };
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

  const showFinishMenu = (winner) => {
    const winnerName = document.querySelector(".winner-name");
    winnerName.textContent = winner;
    finishMenu.classList.remove("hide");
  };

  function startGame() {
    const cells = document.querySelectorAll(".gameboard > i");
    const numberLives = document.querySelector(".number-lives");

    mainMenu.classList.add("hide");
    gameboardContainer.classList.remove("hide");

    cells.forEach((cell) => {
      cell.addEventListener("click", addMove);
      cell.className = "";
    });

    gameController.startGame(numberLives.textContent);
    createPlayers();
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

    console.log(event.target.value);
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
    showFinishMenu,
  };
})();

// MAIN
displayController.setUp();
