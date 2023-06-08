const displayController = (() => {
  let turn = "fa-solid fa-xmark";

  const startGame = () => {
    const fightButton = document.querySelector(".fight-button");

    fightButton.addEventListener("click", displayBoard);
  };

  function displayBoard() {
    const mainMenu = document.querySelector(".main-menu-container");
    const gameboardContainer = document.querySelector(".gameboard-container");
    const cells = document.querySelectorAll(".gameboard > i");

    mainMenu.classList.add("hide");
    gameboardContainer.classList.remove("hide");

    console.log(cells);
    cells.forEach((cell) => {
      cell.addEventListener("click", addMove);
    });
  }

  function addMove(event) {
    const cell = event.target;

    if (cell.className !== "") return;

    cell.className = turn;
    if (turn === "fa-solid fa-xmark") {
      turn = "fa-regular fa-circle";
    } else {
      turn = "fa-solid fa-xmark";
    }
  }

  return {
    startGame,
  };
})();

displayController.startGame();
