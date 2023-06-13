const setupController = (() => {
  const setUp = () => {
    setUpMainMenu();
    setUpFinishMenu();
    setUpSurrenderMenu;
  };

  function setUpMainMenu() {
    const fightButton = document.querySelector(".fight-button");
    const roundsInput = document.querySelector(".rounds-input");
    const chooseButtons = document.querySelectorAll(".choose-button");
    const playerXInput = document.querySelector("#name-x-player");
    const playerOInput = document.querySelector("#name-o-player");

    fightButton.addEventListener("click", gameboardController.startGame);
    roundsInput.addEventListener(
      "change",
      mainMenuController.changeNumberLives
    );
    chooseButtons.forEach((button) => {
      button.addEventListener("click", mainMenuController.changePlayerType);
    });
    playerXInput.addEventListener("change", mainMenuController.changeGodIconX);
    playerOInput.addEventListener("change", mainMenuController.changeGodIconO);
  }

  function setUpFinishMenu() {
    const playAgainButton = document.querySelector(".play-again-button");
    const mainMenuButton = document.querySelector(".main-menu-button");

    playAgainButton.addEventListener("click", menusController.playAgain);
    mainMenuButton.addEventListener("click", menusController.finsihBackMenu);
  }

  function setUpSurrenderMenu() {
    const surrenderButton = document.querySelector(".surrender-button");
    const yesSurrenderButton = document.querySelector(".yes-surrender-button");
    const noSurrenderButton = document.querySelector(".no-surrender-button");

    surrenderButton.addEventListener(
      "click",
      menusController.showSurrenderMenu
    );
    yesSurrenderButton.addEventListener(
      "click",
      menusController.surrenderBackMenu
    );
    noSurrenderButton.addEventListener(
      "click",
      menusController.hideSurrenderMenu
    );
  }

  return { setUp };
})();

const mainMenuController = (() => {
  const checkNames = () => {
    let valid = true;
    const playerXInput = document.querySelector("#name-x-player");
    const playerOInput = document.querySelector("#name-o-player");

    if (playerXInput.value === "") {
      playerXInput.style.borderColor = "red";
      valid = false;
    } else {
      playerXInput.style.borderColor = "";
    }

    if (playerOInput.value === "") {
      playerOInput.style.borderColor = "red";
      valid = false;
    } else {
      playerOInput.style.borderColor = "";
    }

    return valid;
  };

  const changeNumberLives = (event) => {
    const numberLives = document.querySelector(".number-lives");
    numberLives.textContent = event.target.value;
  };

  const changePlayerType = (event) => {
    const humanXbutton = document.querySelector(".human-x-button");
    const botXbutton = document.querySelector(".bot-x-button");
    const imageX = document.querySelector(".image-x");
    const nameInputX = document.querySelector("#name-x-player");
    const godTipX = document.querySelector(".god-tip-x");

    const humanObutton = document.querySelector(".human-o-button");
    const botObutton = document.querySelector(".bot-o-button");
    const imageO = document.querySelector(".image-o");
    const nameInputO = document.querySelector("#name-o-player");
    const godTipO = document.querySelector(".god-tip-o");

    const eventButton = event.target;

    if (eventButton.classList.contains("active")) return;

    switch (eventButton.classList[1]) {
      case "human-x-button":
        humanXbutton.classList.add("active");
        botXbutton.classList.remove("active");
        imageX.className = "image-x fa-solid fa-face-smile";
        nameInputX.value = "";
        godTipX.classList.add("hide-opacity");
        break;
      case "bot-x-button":
        botXbutton.classList.add("active");
        humanXbutton.classList.remove("active");
        imageX.className = "image-x fa-solid fa-robot";
        nameInputX.value = "Easy x bot";
        godTipX.classList.remove("hide-opacity");
        break;
      case "human-o-button":
        humanObutton.classList.add("active");
        botObutton.classList.remove("active");
        imageO.className = "image-o fa-solid fa-face-smile";
        nameInputO.value = "";
        godTipO.classList.add("hide-opacity");
        break;
      case "bot-o-button":
        botObutton.classList.add("active");
        humanObutton.classList.remove("active");
        imageO.className = "image-o fa-solid fa-robot";
        nameInputO.value = "Easy o bot";
        godTipO.classList.remove("hide-opacity");
        break;
    }
  };

  const changeGodIconX = (event) => {
    const name = event.target.value;
    const botXbutton = document.querySelector(".bot-x-button");
    const imageX = document.querySelector(".image-x");

    if (botXbutton.classList.contains("active") && name === "god")
      imageX.className = "image-x fa-solid fa-face-angry";
  };

  const changeGodIconO = (event) => {
    const name = event.target.value;
    const botXbutton = document.querySelector(".bot-o-button");
    const imageO = document.querySelector(".image-o");

    if (botXbutton.classList.contains("active") && name === "god")
      imageO.className = "image-o fa-solid fa-face-angry";
  };

  return {
    checkNames,
    changeNumberLives,
    changePlayerType,
    changeGodIconX,
    changeGodIconO,
  };
})();

const menusController = (() => {
  // PUBLIC FUNCTIONS
  const showFinishMenu = (winner) => {
    const winnerName = document.querySelector(".winner-name");

    winnerName.textContent =
      winner === "tie"
        ? (winnerName.textContent = "It's a tie")
        : winner + " won!";

    showFinish();
    hideBlocker();
    setTimeout(showBlocker, 1000);
  };

  const playAgain = () => {
    hideBlocker();
    hideFinish();
    gameboardController.startGame();
  };

  const finsihBackMenu = () => {
    hideFinish();
    goBackToMenu();
  };

  const showSurrenderMenu = () => {
    showSurrender();
    showBlocker();
  };

  const surrenderBackMenu = () => {
    hideSurrender();
    goBackToMenu();
  };

  const hideSurrenderMenu = () => {
    hideSurrender();
    hideBlocker();
  };

  // UTILITY FUNCTIONS
  const goBackToMenu = () => {
    const mainMenu = document.querySelector(".main-menu-container");
    const gameboardContainer = document.querySelector(".gameboard-container");

    hideBlocker();
    mainMenu.classList.remove("hide");
    gameboardContainer.classList.add("hide");
  };

  function showBlocker() {
    const blocker = document.querySelector(".blocker");
    blocker.classList.remove("hide");
  }

  function hideBlocker() {
    const blocker = document.querySelector(".blocker");
    blocker.classList.add("hide");
  }

  function showSurrender() {
    const surrenderMenu = document.querySelector(".surrender-menu");
    surrenderMenu.classList.remove("hide");
  }

  function hideSurrender() {
    const surrenderMenu = document.querySelector(".surrender-menu");
    surrenderMenu.classList.add("hide");
  }

  function showFinish() {
    const finishMenu = document.querySelector(".finish-menu");
    finishMenu.classList.remove("hide");
  }

  function hideFinish() {
    const finishMenu = document.querySelector(".finish-menu");
    finishMenu.classList.add("hide");
  }

  return {
    showFinishMenu,
    playAgain,
    finsihBackMenu,
    showSurrenderMenu,
    surrenderBackMenu,
    hideSurrenderMenu,
  };
})();

const gameboardController = (() => {
  let turn = "fa-solid fa-xmark";
  let botTurn = [null, null];

  // PUBLIC FUNCTIONS
  const startGame = () => {
    if (!mainMenuController.checkNames()) return;
    const numberLives = document.querySelector(".number-lives");

    resetTurn();
    resetBoard();
    resetHealth();
    gameController.prepareBoard(parseInt(numberLives.textContent));
    createPlayers();
    moveBot();
  };

  const removeHealth = (loser, health) => {
    let loserHealht =
      loser === "x"
        ? document.querySelector(".health-x-player")
        : document.querySelector(".health-o-player");

    loserHealht.style.width = health + "%";
    cleanBoard();
  };

  const showBotMovement = (index) => {
    const cells = document.querySelectorAll(".gameboard > i");
    cells[index].click();
  };

  // PRIVATE FUNCTIONS
  function addMove(event) {
    const cell = event.target;

    if (cell.className !== "") return;

    cell.className = turn;
    if (turn === "fa-solid fa-xmark") {
      gameController.addMove("x", cell.id);
      giveOturn();
    } else {
      gameController.addMove("o", cell.id);
      giveXturn();
    }

    moveBot();
  }

  // bot utility
  function moveBot() {
    const blocker = document.querySelector(".blocker");

    if (isBotTurn()) {
      blocker.classList.remove("hide");
      setTimeout(moveBotUtility, 1200);
    } else {
      blocker.classList.add("hide");
    }
  }

  function isBotTurn() {
    return botTurn[0] === "x" || botTurn[1] === "o";
  }

  function moveBotUtility() {
    const finishMenu = document.querySelector(".finish-menu");

    if (finishMenu.classList.contains("hide")) {
      if (botTurn[0] === "x") {
        gameController.moveBot("x");
      } else if (botTurn[1] === "o") {
        gameController.moveBot("o");
      }
    }
  }

  // clean utility
  function cleanBoard() {
    const cells = document.querySelectorAll(".gameboard > i");
    const numberLives = document.querySelector(".number-lives");

    cells.forEach((cell) => {
      cell.className = "";
    });

    gameController.prepareBoard(parseInt(numberLives.textContent));
    moveBot();
  }

  function resetTurn() {
    const arrowTurnTargetX = document.querySelector(".x");
    const arrowTurnTargetO = document.querySelector(".o");

    turn = "fa-solid fa-xmark";
    arrowTurnTargetX.classList.add("player-turn");
    arrowTurnTargetO.classList.remove("player-turn");
  }

  function resetBoard() {
    const mainMenu = document.querySelector(".main-menu-container");
    const gameboardContainer = document.querySelector(".gameboard-container");
    const cells = document.querySelectorAll(".gameboard > i");

    mainMenu.classList.add("hide");
    gameboardContainer.classList.remove("hide");

    cells.forEach((cell) => {
      cell.addEventListener("click", addMove);
      cell.className = "";
    });
  }

  function resetHealth() {
    const healthXplayer = document.querySelector(".health-x-player");
    const healthOplayer = document.querySelector(".health-o-player");

    healthXplayer.style.width = "100%";
    healthOplayer.style.width = "100%";
  }

  // movement utility
  function giveOturn() {
    const arrowTurnTargetX = document.querySelector(".x");
    const arrowTurnTargetO = document.querySelector(".o");

    turn = "fa-regular fa-circle";
    arrowTurnTargetX.classList.remove("player-turn");
    arrowTurnTargetO.classList.add("player-turn");
    if (botTurn[0] === "x") botTurn[0] = "";
    if (botTurn[1] === "") botTurn[1] = "o";
  }

  function giveXturn() {
    const arrowTurnTargetX = document.querySelector(".x");
    const arrowTurnTargetO = document.querySelector(".o");

    turn = "fa-solid fa-xmark";
    arrowTurnTargetX.classList.add("player-turn");
    arrowTurnTargetO.classList.remove("player-turn");
    if (botTurn[0] === "") botTurn[0] = "x";
    if (botTurn[1] === "o") botTurn[1] = "";
  }

  // players utility
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
      playerX[1] = isGodBot("x") ? "god" : "bot";
      botTurn[0] = "x";
    }
    if (!humanObutton.classList.contains("active")) {
      playerO[1] = isGodBot("o") ? "god" : "bot";
      botTurn[1] = "";
    }

    playerXNameLabel.textContent = playerXNameInput.value;
    playerONameLabel.textContent = playerONameInput.value;

    gameController.createPlayers(playerX, playerO);
  }

  function isGodBot(type) {
    if (type === "x") {
      const playerXInput = document.getElementById("name-x-player");
      return playerXInput.value === "god";
    } else {
      const playerOInput = document.getElementById("name-o-player");
      return playerOInput.value === "god";
    }
  }

  return {
    startGame,
    removeHealth,
    showBotMovement,
  };
})();

setupController.setUp();
