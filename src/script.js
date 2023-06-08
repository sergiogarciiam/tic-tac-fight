// CONSTRUCTORS
const Gameboard = (lives) => {
  board = ["", "", "", "", "", "", "", "", ""];
  return { board, lives };
};

const Player = (name) => {
  return { name };
};

// MODULES
const gameController = (() => {
  let gameboard = null;

  const startGame = (lives) => {
    gameboard = Gameboard(lives);
  };

  const addMove = (type, position) => {
    gameboard.board[position] = type;
    checkWin();
  };

  const checkWin = () => {
    if (checkHorizontal() !== "") {
      console.log("winner");
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

  return { startGame, addMove };
})();

const displayController = (() => {
  let turn = "fa-solid fa-xmark";

  const setUp = () => {
    const roundsInput = document.querySelector(".rounds-input");
    const fightButton = document.querySelector(".fight-button");

    roundsInput.addEventListener("change", changeNumberLives);
    fightButton.addEventListener("click", startGame);
  };

  function startGame() {
    const mainMenu = document.querySelector(".main-menu-container");
    const gameboardContainer = document.querySelector(".gameboard-container");
    const cells = document.querySelectorAll(".gameboard > i");
    const numberLives = document.querySelector(".number-lives");

    mainMenu.classList.add("hide");
    gameboardContainer.classList.remove("hide");

    cells.forEach((cell) => {
      cell.addEventListener("click", addMove);
    });

    gameController.startGame(numberLives.textContent);
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

  return {
    setUp,
  };
})();

// MAIN
displayController.setUp();
