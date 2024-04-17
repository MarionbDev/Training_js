let snake = [
  { x: 3, y: 19 },
  { x: 2, y: 19 },
  { x: 1, y: 19 },
  { x: 0, y: 19 },
];

let dirX = 1;
let dirY = 0;
let score = 0;

function generateFood() {
  let food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };

  return {
    x: food.x,
    y: food.y,
  };
}
let food = generateFood(); // génère la position initiale de la nourriture avec la fonction random

function drawFood() {
  let gridContainer = document.querySelector(".grid-container");
  let foodElement = document.createElement("div");
  foodElement.className = "cell-food";
  foodElement.style.gridColumnStart = food.x + 1;
  foodElement.style.gridRowStart = food.y + 1;
  foodElement.textContent = "🍒";
  gridContainer.append(foodElement);
}

function checkAteFood(snakeHead, food) {
  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    return true;
  } else {
    return false;
  }
}

function drawSnake() {
  // sélection du grid-container
  let gridContainer = document.querySelector(".grid-container");

  // supprimer les div du serpent en-cours
  let snakeSegments = document.querySelectorAll(".snake-head, .snake-body");
  snakeSegments.forEach((segment) => {
    segment.parentNode.removeChild(segment);
  });

  // ajout des segements du serpent dans une div
  snake.forEach((segment, index) => {
    let div = document.createElement("div");
    // différencier la tête et le corps du serpent
    div.className = index === 0 ? "cell snake-head" : "cell snake-body";
    if (index === 0) {
      div.textContent = "🐸";
    }
    // positionner la div à l'endroit voulu pour le départ du jeu
    div.style.gridColumnStart = segment.x + 1; // +1 : ajuste l'index 0
    div.style.gridRowStart = segment.y + 1;

    // ajout de la div au grid-container
    gridContainer.appendChild(div);
  });
}

function moveSnake() {
  // ajouter un nouveau segment à la tête du serpent
  let newHead = {
    x: snake[0].x + dirX,
    y: snake[0].y + dirY,
  };

  // gestion des collisions
  if (newHead.x < 0 || newHead.x > 19 || newHead.y < 0 || newHead.y > 19) {
    alert("GAME OVER");
    gameOver();
    clearInterval(gameInterval);
    return; // arrête la fonction moveSnake
  }

  if (checkAteFood(newHead, food)) {
    score++;
    document.getElementById("score").textContent = "Score :" + score;
    // redessine le serpent après avoir déplacé la tête
    snake.unshift(newHead);
    food = generateFood();
    drawFood();
  } else {
    snake.pop();
    snake.unshift(newHead);
  }

  drawSnake();
}

function gameOver() {
  // masquer le grid-container
  let gridContainer = document.querySelector(".grid-container");
  gridContainer.style.display = "none";

  // afficher message de fin de jeu
  let gameOverMessage = document.createElement("div");
  gameOverMessage.className = "game-over-message";
  gameOverMessage.textContent = "Game Over ! Appuyer sur F5 pour recommencer.";

  document.body.append(gameOverMessage);
}

function gameLoop() {
  moveSnake();
  drawSnake();
}

generateFood();
drawFood();
drawSnake();
gameInterval = setInterval(gameLoop, 100);

// ajout d'un écouteur d'évènement pour les touches du clavier
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      if (dirX !== 1) {
        dirX = -1;
        dirY = 0;
        moveSnake();
      }
      break;
    case "ArrowRight":
      if (dirX !== -1) {
        dirX = 1;
        dirY = 0;
        moveSnake();
      }
      break;
    case "ArrowUp":
      if (dirY !== 1) {
        dirX = 0;
        dirY = -1;
        moveSnake();
      }
      break;
    case "ArrowDown":
      if (dirY !== -1) {
        dirX = 0;
        dirY = 1;
        moveSnake();
      }
      break;
  }
});