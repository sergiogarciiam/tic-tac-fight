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
