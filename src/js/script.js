const columnA = document.querySelectorAll(".column-a");
const columnB = document.querySelectorAll(".column-b");
const columnC = document.querySelectorAll(".column-c");
const columnD = document.querySelectorAll(".column-d");
const columnE = document.querySelectorAll(".column-e");
const columnF = document.querySelectorAll(".column-f");
const columnG = document.querySelectorAll(".column-g");

const spaces = document.querySelectorAll(".board-space");

const board = [columnA, columnB, columnC, columnD, columnE, columnF, columnG];
let color1 = "#ff698d"; //red
let color2 = "#fbd164"; //yellow
const color3 = "#5d2cd6";
let color = color1;

const pointsP1 = document.getElementById("points-p1");
const pointsP2 = document.getElementById("points-p2");
let playerTurn = true;

const victoryMessage = document.querySelector('.victory-message')
const playerWins = document.getElementById('player-wins')

const bgFooter = document.querySelector(".footer-bg");

// -------------- temporizador -------------- //

const timer = document.querySelector(".svg-path");
let seconds = document.getElementById("seconds");
let playerNumber = document.getElementById("player-number");
var oneSecond;
var second;
var gameOver = false;

function startTimer() {
  timer.style.fill = color;

  if (color === color1) {
    playerNumber.innerText = 1;
  } else if (color === color2) {
    playerNumber.innerText = 2;
  }

  // switch (color) {
  //   case color1:
  //     playerNumber.innerText = 1
  //     break;
  //   case color2:
  //     playerNumber.innerText = 2
  //     break
  //   default:
  //     playerNumber.innerText = 1
  //     break;
  // }

  oneSecond = setInterval(() => {
    second--;
    seconds.innerHTML = second;
    if (second < 1) {
      changePlayer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(oneSecond);
}

function resetTimer() {
  clearInterval(oneSecond);
  second = 30;
  seconds.innerHTML = second;

  if (color === color1) {
    playerNumber.innerText = 2;
  } else if (color === color2) {
    playerNumber.innerText = 1;
  }
}

function changePlayer() {
  resetTimer();

  if (color === color1) {
    color = color2;
    spaces.forEach((space) => {
      space.classList.add("player2-turn");
      space.classList.remove("player1-turn");
    });
    playerNumber.innerText = 2;
    console.log("changeplayer if");
    startTimer();
  } else {
    color = color1;
    spaces.forEach((space) => {
      space.classList.remove("player2-turn");
      space.classList.add("player1-turn");
      playerNumber.innerText = 1;
      console.log("changeplayer else");
    });
    startTimer();
  }
}

function stopGame() {
  clearInterval(oneSecond);
  gameOver = true;

  spaces.forEach((space) => {
    space.classList.remove("player1-turn");
    space.classList.remove("player2-turn");
    space.style.cursor = "auto";
  });

  board.forEach((column) => {
    column.forEach((element) => {
      element.removeEventListener("click", play);
    });
  });
}

function countPoints() {
  if (color === color1) {
    pointsP1.innerHTML++;
  } else if (color === color2) {
    pointsP2.innerHTML++;
  }
}

function showVictoryMessage() {
  victoryMessage.style.display = "flex"

  if (color === color1) {
    playerWins.innerText = "Player 1";
  } else if (color === color2) {
    playerWins.innerText = "Player 2";
  }
}

function play(event) {
  const col = Number(event.target.id[1]);
  const colSelected = board[col];

  function check(n) {
    function checkWinHorizontal(y) {
      countPoints();
      bgFooter.style.backgroundColor = color;
      board[col + y][`${n}`].classList.add("game-win");
      board[col + y - 1][`${n}`].classList.add("game-win");
      board[col + y - 2][`${n}`].classList.add("game-win");
      board[col + y - 3][`${n}`].classList.add("game-win");
      showVictoryMessage()
      stopGame();
    }

    function checkWinVertical() {
      countPoints();
      bgFooter.style.backgroundColor = color;
      colSelected[`${n + 3}`].classList.add("game-win");
      colSelected[`${n + 2}`].classList.add("game-win");
      colSelected[`${n + 1}`].classList.add("game-win");
      colSelected[`${n}`].classList.add("game-win");
      showVictoryMessage()
      stopGame();
    }

    function checkWinDiagonalRight(y) {
      countPoints();
      bgFooter.style.backgroundColor = color;
      board[col + y][`${n - y}`].classList.add("game-win");
      board[col + y - 1][`${n - y + 1}`].classList.add("game-win");
      board[col + y - 2][`${n - y + 2}`].classList.add("game-win");
      board[col + y - 3][`${n - y + 3}`].classList.add("game-win");
      showVictoryMessage()
      stopGame();
    }

    function checkWinDiagonalLeft(y) {
      countPoints();
      bgFooter.style.backgroundColor = color;
      board[col - y][`${n - y}`].classList.add("game-win");
      board[col - y + 1][`${n - y + 1}`].classList.add("game-win");
      board[col - y + 2][`${n - y + 2}`].classList.add("game-win");
      board[col - y + 3][`${n - y + 3}`].classList.add("game-win");
      showVictoryMessage()
      stopGame();
    }

    //----------- Checar na horizontal -----------//

    if (board[col + 3]) {
      if (
        board[col + 3][`${n}`].dataset.key ===
          board[col + 2][`${n}`].dataset.key &&
        board[col + 2][`${n}`].dataset.key ===
          board[col + 1][`${n}`].dataset.key &&
        board[col + 1][`${n}`].dataset.key === board[col][`${n}`].dataset.key
      ) {
        checkWinHorizontal(3);
      }
    }
    if (board[col + 2] && board[col - 1]) {
      if (
        board[col + 2][`${n}`].dataset.key ===
          board[col + 1][`${n}`].dataset.key &&
        board[col + 1][`${n}`].dataset.key === board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key === board[col - 1][`${n}`].dataset.key
      ) {
        checkWinHorizontal(2);
      }
    }
    if (board[col + 1] && board[col - 2]) {
      if (
        board[col + 1][`${n}`].dataset.key === board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key === board[col - 1][`${n}`].dataset.key &&
        board[col - 1][`${n}`].dataset.key ===
          board[col - 2][`${n}`].dataset.key
      ) {
        checkWinHorizontal(1);
      }
    }
    if (board[col - 3]) {
      if (
        board[col][`${n}`].dataset.key === board[col - 1][`${n}`].dataset.key &&
        board[col - 1][`${n}`].dataset.key ===
          board[col - 2][`${n}`].dataset.key &&
        board[col - 2][`${n}`].dataset.key ===
          board[col - 3][`${n}`].dataset.key
      ) {
        checkWinHorizontal(0);
      }
    }

    //----------- Checar na vertical -----------//

    if (colSelected[`${n + 3}`]) {
      if (
        colSelected[`${n + 3}`].dataset.key ===
          colSelected[`${n + 2}`].dataset.key &&
        colSelected[`${n + 2}`].dataset.key ===
          colSelected[`${n + 1}`].dataset.key &&
        colSelected[`${n + 1}`].dataset.key === colSelected[`${n}`].dataset.key
      ) {
        checkWinVertical();
      }
    }

    //----------- Checar na diagonal para a direita -----------//

    if (board[col + 3] && board[col][`${n - 3}`]) {
      if (
        board[col + 3][`${n - 3}`].dataset.key ===
          board[col + 2][`${n - 2}`].dataset.key &&
        board[col + 2][`${n - 2}`].dataset.key ===
          board[col + 1][`${n - 1}`].dataset.key &&
        board[col + 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key
      ) {
        checkWinDiagonalRight(3);
      }
    }
    if (
      board[col + 2] &&
      board[col - 1] &&
      board[col][`${n + 1}`] &&
      board[col][`${n - 2}`]
    ) {
      if (
        board[col + 2][`${n - 2}`].dataset.key ===
          board[col + 1][`${n - 1}`].dataset.key &&
        board[col + 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key ===
          board[col - 1][`${n + 1}`].dataset.key
      ) {
        checkWinDiagonalRight(2);
      }
    }
    if (
      board[col + 1] &&
      board[col - 2] &&
      board[col][`${n + 2}`] &&
      board[col][`${n - 1}`]
    ) {
      if (
        board[col + 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key ===
          board[col - 1][`${n + 1}`].dataset.key &&
        board[col - 1][`${n + 1}`].dataset.key ===
          board[col - 2][`${n + 2}`].dataset.key
      ) {
        checkWinDiagonalRight(1);
      }
    }
    if (board[col - 3] && board[col][`${n + 3}`]) {
      if (
        board[col][`${n}`].dataset.key ===
          board[col - 1][`${n + 1}`].dataset.key &&
        board[col - 1][`${n + 1}`].dataset.key ===
          board[col - 2][`${n + 2}`].dataset.key &&
        board[col - 2][`${n + 2}`].dataset.key ===
          board[col - 3][`${n + 3}`].dataset.key
      ) {
        checkWinDiagonalRight(0);
      }
    }

    //----------- Checar na diagonal para a esquerda -----------//

    if (board[col - 3] && board[col][`${n - 3}`]) {
      if (
        board[col - 3][`${n - 3}`].dataset.key ===
          board[col - 2][`${n - 2}`].dataset.key &&
        board[col - 2][`${n - 2}`].dataset.key ===
          board[col - 1][`${n - 1}`].dataset.key &&
        board[col - 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key
      ) {
        checkWinDiagonalLeft(3);
      }
    }
    if (
      board[col - 2] &&
      board[col + 1] &&
      board[col][`${n + 1}`] &&
      board[col][`${n - 2}`]
    ) {
      if (
        board[col - 2][`${n - 2}`].dataset.key ===
          board[col - 1][`${n - 1}`].dataset.key &&
        board[col - 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key ===
          board[col + 1][`${n + 1}`].dataset.key
      ) {
        checkWinDiagonalLeft(2);
      }
    }
    if (
      board[col - 1] &&
      board[col + 2] &&
      board[col][`${n + 2}`] &&
      board[col][`${n - 1}`]
    ) {
      if (
        board[col - 1][`${n - 1}`].dataset.key ===
          board[col][`${n}`].dataset.key &&
        board[col][`${n}`].dataset.key ===
          board[col + 1][`${n + 1}`].dataset.key &&
        board[col + 1][`${n + 1}`].dataset.key ===
          board[col + 2][`${n + 2}`].dataset.key
      ) {
        checkWinDiagonalLeft(1);
      }
    }
    if (board[col + 3] && board[col][`${n + 3}`]) {
      if (
        board[col][`${n}`].dataset.key ===
          board[col + 1][`${n + 1}`].dataset.key &&
        board[col + 1][`${n + 1}`].dataset.key ===
          board[col + 2][`${n + 2}`].dataset.key &&
        board[col + 2][`${n + 2}`].dataset.key ===
          board[col + 3][`${n + 3}`].dataset.key
      ) {
        checkWinDiagonalLeft(0);
      }
    }
  }

  function selectSlot(z) {  
    colSelected[z].style.backgroundColor = color;
    colSelected[z].setAttribute("data-key", color);
    check(z);
  }

  function chooseSlot() {
    if (colSelected[0].style.backgroundColor) {
      return;
    } else if (colSelected[1].style.backgroundColor) {
      selectSlot(0);
    } else if (colSelected[2].style.backgroundColor) {
      selectSlot(1);
    } else if (colSelected[3].style.backgroundColor) {
      selectSlot(2);
    } else if (colSelected[4].style.backgroundColor) {
      selectSlot(3);
    } else if (colSelected[5].style.backgroundColor) {
      selectSlot(4);
    } else {
      selectSlot(5);
    }
  }

  chooseSlot();

  if (gameOver === false) {
    changePlayer();
  }
}

// ------------- adicionando função de click -------------//

function startGame() {
  if (playerTurn) {
    spaces.forEach((space) => {
      space.classList.remove("player2-turn");
      space.classList.add("player1-turn");
      playerTurn = false;
      color = color1;
    });
  } else {
    spaces.forEach((space) => {
      space.classList.remove("player1-turn");
      space.classList.add("player2-turn");
      playerTurn = true;
      color = color2;
    });
  }

  board.forEach((column) => {
    column.forEach((element) => {
      element.addEventListener("click", play);
    });
  });
}

startGame();

// -------------- resetar o game -------------- //

const btnRestart = document.querySelector(".restart");
const btnPlayAgain = document.querySelector(".play-again");


function restart() {
  spaces.forEach((space) => {
    space.style.backgroundColor = "";
    space.setAttribute("data-key", "");
    space.classList.remove("game-win");
    space.style.cursor = "pointer";
  });
  resetTimer();
  gameOver = false;
  victoryMessage.style.display = "none";

  startGame();
  timer.style.fill = color;
  bgFooter.style.backgroundColor = color3;
}

btnRestart.addEventListener("click", restart);
btnPlayAgain.addEventListener("click", restart);

// -------------------- menu ------------------- //

const btnMenu = document.querySelector(".menu-btn");
const menuModal = document.querySelector(".menu");
const game = document.querySelector(".game");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer-bg");

const logo = document.querySelector(".logo-btn");

function openMenu() {
  menuModal.style.display = "flex";
  game.style.opacity = "0.05";
  header.style.opacity = "0.05";
  footer.style.opacity = "0.05";
  pauseTimer();
}

function closeMenu() {
  menuModal.style.display = "none";
  game.style.opacity = "1";
  header.style.opacity = "1";
  footer.style.opacity = "1";

  if (second !== 30) {
    startTimer();
  }
}

btnMenu.addEventListener("click", openMenu);
logo.addEventListener("click", closeMenu);
