const displayController = (() => {
  const mainMenu = document.querySelector(".main-menu-container");
  const gameboardContainer = document.querySelector(".gameboard-container");
  const finishMenu = document.querySelector(".finish-menu");

  let turn = "fa-solid fa-xmark";
  let botTurn = [null, null];

  const setUp = () => {
    const roundsInput = document.querySelector(".rounds-input");
    const fightButton = document.querySelector(".fight-button");
    const playAgainButton = document.querySelector(".play-again-button");
    const mainMenuButton = document.querySelector(".main-menu-button");
    const chooseButtons = document.querySelectorAll(".choose-button");

    roundsInput.addEventListener("change", changeNumberLives);
    fightButton.addEventListener("click", startGame);
    playAgainButton.addEventListener("click", playAgain);
    mainMenuButton.addEventListener("click", goBackToMenu);
    chooseButtons.forEach((button) => {
      button.addEventListener("click", changePlayerType);
    });
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
    if (botTurn[0] === "x") gameController.moveBot();
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
    const playerXNameInput = document.querySelector("#name-x-player");
    const playerONameInput = document.querySelector("#name-o-player");
    const playerXNameLabel = document.querySelector(".x-label-name");
    const playerONameLabel = document.querySelector(".o-label-name");
    const humanXbutton = document.querySelector(".human-x-button");
    const humanObutton = document.querySelector(".human-o-button");

    let playerX = [playerXNameInput.value, "human", "x"];
    let playerO = [playerONameInput.value, "human", "o"];
    botTurn = [null, null];

    if (!humanXbutton.classList.contains("active")) {
      playerX[1] = "bot";
      botTurn[0] = "x";
    }
    if (!humanObutton.classList.contains("active")) {
      playerO[1] = "bot";
      botTurn[1] = "";
    }

    playerXNameLabel.textContent = playerXNameInput.value;
    playerONameLabel.textContent = playerONameInput.value;

    gameController.createPlayers(playerX, playerO);
  }

  function addMove(event) {
    const arrowTurnTargetX = document.querySelector(".x");
    const arrowTurnTargetO = document.querySelector(".o");
    const cell = event.target;

    if (cell.className !== "") return;

    cell.className = turn;
    if (turn === "fa-solid fa-xmark") {
      gameController.addMove("x", cell.id);
      turn = "fa-regular fa-circle";
      arrowTurnTargetX.classList.remove("player-turn");
      arrowTurnTargetO.classList.add("player-turn");
      if (botTurn[0] === "x") botTurn[0] = "";
      if (botTurn[1] === "") botTurn[1] = "o";
    } else {
      gameController.addMove("o", cell.id);
      turn = "fa-solid fa-xmark";
      arrowTurnTargetX.classList.add("player-turn");
      arrowTurnTargetO.classList.remove("player-turn");
      if (botTurn[0] === "") botTurn[0] = "x";
      if (botTurn[1] === "o") botTurn[1] = "";
    }

    setTimeout(() => {
      if (
        finishMenu.classList.contains("hide") &&
        (botTurn[0] === "x" || botTurn[1] === "o")
      )
        gameController.moveBot();
    }, 1000);
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

  function changePlayerType(event) {
    const humanXbutton = document.querySelector(".human-x-button");
    const botXbutton = document.querySelector(".bot-x-button");
    const imageX = document.querySelector(".image-x");
    const nameInputX = document.querySelector("#name-x-player");
    const humanObutton = document.querySelector(".human-o-button");
    const botObutton = document.querySelector(".bot-o-button");
    const imageO = document.querySelector(".image-o");
    const nameInputO = document.querySelector("#name-o-player");
    const eventButton = event.target;

    if (eventButton.classList.contains("active")) return;

    switch (eventButton.classList[1]) {
      case "human-x-button":
        humanXbutton.classList.add("active");
        botXbutton.classList.remove("active");
        imageX.className = "image-x fa-solid fa-face-smile";
        nameInputX.value = "";
        break;
      case "bot-x-button":
        botXbutton.classList.add("active");
        humanXbutton.classList.remove("active");
        imageX.className = "image-x fa-solid fa-robot";
        nameInputX.value = "Easy x bot";
        break;
      case "human-o-button":
        humanObutton.classList.add("active");
        botObutton.classList.remove("active");
        imageO.className = "image-o fa-solid fa-face-smile";
        nameInputO.value = "";
        break;
      case "bot-o-button":
        botObutton.classList.add("active");
        humanObutton.classList.remove("active");
        imageO.className = "image-o fa-solid fa-robot";
        nameInputO.value = "Easy o bot";
        break;
    }
  }

  const moveBot = (index) => {
    const cells = document.querySelectorAll(".gameboard > i");
    cells[index].click();
  };

  return {
    setUp,
    removeHealth,
    showFinishMenu,
    moveBot,
  };
})();

// MAIN
displayController.setUp();
