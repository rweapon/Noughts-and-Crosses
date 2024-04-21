// Variables
let anotherMode,
  computerOn,
  firstComputerMove,
  isStarted,
  turn,
  win,
  tie,
  winnerLine;
let boxes = ["", "", "", "", "", "", "", "", ""];
let combs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const box = document.querySelectorAll(".play-area__boxes");

const togetherButton = document.querySelector(".together-button");
const computerButton = document.querySelector(".computer-button");
const restartButton = document.querySelector(".restart-button");
const chooseButton = document.querySelector(".choose-button");
const chooseMode = document.querySelector(".menu__choose");
const menu = document.querySelector(".menu");

// Button logic
togetherButton.addEventListener("click", () => {
  isStarted = true;
  playerMove();
  updateButtons();
  document.querySelector("#crosses__player").innerHTML = "Player 1";
  document.querySelector("#noughts__player").innerHTML = "Player 2";
  // document.querySelector(".score").style = "gap: 130px";
});

computerButton.addEventListener("click", () => {
  isStarted = true;
  firstComputerMove = true;
  updateButtons();
  document.querySelector("#crosses__player").innerHTML = "Computer";
  document.querySelector("#noughts__player").innerHTML = "Player";
  // document.querySelector(".score").style = "margin-left: 20px; gap: 125px";
  // document.querySelector(".names__separator").style = "padding-left:10px";
  setTimeout(() => {
    computerMove();
  }, 500);
});

restartButton.addEventListener("click", () => {
  restart();
});

chooseButton.addEventListener("click", () => {
  updateButtons();
});

// Game logic
function playerMove() {
  document.querySelectorAll(".play-area__boxes").forEach((box, index) => {
    box.addEventListener("click", function addBox() {
      box.removeEventListener("click", addBox);
      if (!win && isStarted && boxes[index] === "") {
        !turn ? (boxes[index] = "x") : (boxes[index] = "o");
        updateBoxes(index);
        if (computerOn) {
          isStarted = false;
          setTimeout(() => {
            computerMove();
          }, 500);
        }
      }
    });
  });
}

function computerMove() {
  isStarted = true;
  computerOn = true;
  let j = 0;

  if (firstComputerMove) {
    j = randomNum(1, 9) - 1;
    firstComputerMove = false;
  } else {
    let computerBoxes = [];
    let playerBoxes = [];
    boxes.forEach((value, index) => {
      if (value === "x") computerBoxes.push(index);
      else if (value === "o") playerBoxes.push(index);
    });
    j = calculateBestMove(computerBoxes, playerBoxes);
    // console.log(playerBoxes);
    // console.log(computerBoxes2);
  }

  if (!win && isStarted) {
    !turn ? (boxes[j] = "x") : (boxes[j] = "o");
    updateBoxes(j);
    playerMove();
  }
}

function calculateBestMove(computerBoxes, playerBoxes) {
  let result;
  let playerComb;
  let minPlayer = null;
  let maxPlayer = null;
  let minComputer = null;
  let maxComputer = null;

  for (let i = 0; i < playerBoxes.length; i++) {
    if (minPlayer === null || playerBoxes[i] < minPlayer)
      minPlayer = playerBoxes[i];
    if (maxPlayer === null || playerBoxes[i] > maxPlayer)
      maxPlayer = playerBoxes[i];
    if (minComputer === null || computerBoxes[i] < minComputer)
      minComputer = computerBoxes[i];
    if (maxComputer === null || computerBoxes[i] > maxComputer)
      maxComputer = computerBoxes[i];
  }

  for (let comb of combs) {
    if (
      comb[0] === maxPlayer ||
      comb[1] === maxPlayer ||
      comb[2] === maxPlayer ||
      comb[0] === minPlayer ||
      comb[1] === minPlayer ||
      comb[2] === minPlayer
    ) {
      if (
        (comb[0] === minPlayer && comb[1] === maxPlayer) ||
        (comb[0] === minPlayer && comb[2] === maxPlayer) ||
        (comb[1] === minPlayer && comb[2] === maxPlayer)
      ) {
        playerComb = comb;
        // continue;
      } else continue;
    }

    if (computerBoxes.length === 1) {
      if (comb[0] === minComputer || comb[2] === minComputer) {
        result = comb[1];
        break;
      } else if (comb[1] === minComputer) {
        result = comb[0];
        break;
      }
    } else {
      if (comb[0] === minComputer && comb[1] === maxComputer) {
        result = comb[2];
        break;
      } else if (comb[1] === minComputer && comb[2] === maxComputer) {
        result = comb[0];
        break;
      } else if (comb[0] === minComputer && comb[2] === maxComputer) {
        result = comb[1];
        break;
      } else if (playerComb) {
        if (!boxes[playerComb[0]]) {
          result = playerComb[0];
          break;
        } else if (!boxes[playerComb[1]]) {
          result = playerComb[1];
          break;
        } else if (!boxes[playerComb[2]]) {
          result = playerComb[2];
          break;
        }
      }
    }
  }
  if (result === undefined || boxes[result] !== "") {
    let freeBoxes = [];
    boxes.forEach((value, index) => {
      if (value === "") freeBoxes.push(index);
    });
    let i = freeBoxes.length;
    result = freeBoxes[randomNum(1, i - 1) - 1];
    return result;
  }
  return result;
}

function updateBoxes(index) {
  let winner;
  if (turn) {
    box[index].innerHTML = '<img src="img/circle.png" class="circle-img">';
    const circle = document.querySelectorAll(".circle-img");
    circle.forEach((value, i) => {
      boxPopUp(circle[i], 50, "block");
    });
    turn = false;
    winner = "Noughts";
  } else if (!turn) {
    box[index].innerHTML = '<img src="img/cross.png" class="cross-img">';
    const cross = document.querySelectorAll(".cross-img");
    cross.forEach((value, i) => {
      boxPopUp(cross[i], 50, "block");
    });
    turn = true;
    winner = "Crosses";
  }

  checkResult();
  if (win) {
    ticTacFlicker(0, winner);
    setTimeout(() => {
      document.querySelector(".menu__result").innerHTML = `${winner} win!`;
      menu.style = "display: flex";

      popUp(restartButton, 50);
      popUp(chooseButton, 50);
      anotherMode = true;
      if (winner === "Crosses")
        document.querySelector(".score__crosses").innerHTML++;
      else document.querySelector(".score__noughts").innerHTML++;
    }, 1200);
  }
  if (tie) {
    ticTacFlicker(0);
    setTimeout(() => {
      document.querySelector(".menu__result").innerHTML = `It's a tie!`;
      menu.style = "display: flex";
      popUp(restartButton, 50);
      popUp(chooseButton, 50);
      anotherMode = true;
    }, 1200);
  }
}

function checkResult() {
  let i = 0;

  for (let comb of combs) {
    if (
      boxes[comb[0]] == boxes[comb[1]] &&
      boxes[comb[1]] == boxes[comb[2]] &&
      boxes[comb[0]] != ""
    ) {
      winnerLine = comb.slice();
      return (win = true);
    }
  }
  boxes.forEach((boxes) => boxes !== "" && i++);
  if (i === 9) return (tie = true);

  return false;
}

function restart() {
  refresh();
  anotherMode = false;
  updateButtons();
  isStarted = true;
  const player1 = document.querySelector("#crosses__player").innerHTML;
  if (player1 === "Computer") {
    firstComputerMove = true;
    setTimeout(() => {
      computerMove();
    }, 500);
  } else playerMove();
}

function refresh() {
  box.forEach((box) => (box.innerHTML = ""));
  boxes.forEach((box, index) => {
    boxes[index] = "";
  });
  // console.log(boxes);
  win = false;
  tie = false;
  computerOn = false;
  isStarted = false;
  turn = false;
  i = 0;
  j = 0;

  document.querySelector(".menu__result").innerHTML = "";

  popOut(restartButton, 50);
}

function updateButtons() {
  if (isStarted) {
    popOut(computerButton, 50);
    popOut(togetherButton, 50);
    popOut(chooseMode, 50);
    popOut(menu, 50);
    // menu.style = 'display:none'
    document.querySelector(".names").style = "";
  }
  if (anotherMode) {
    anotherMode = false;
    // document.querySelector(".names__separator").style = "padding-left:0";
    // document.querySelector(".names").style = "align-items: center;";
    document.querySelector("#crosses__player").innerHTML = "";
    document.querySelector("#noughts__player").innerHTML = "";
    document.querySelector(".score__crosses").innerHTML = 0;
    document.querySelector(".score__noughts").innerHTML = 0;
    popOut(menu, 50);

    popOut(chooseButton, 50);
    refresh();
    setTimeout(() => {
      menu.style = "display: flex";
      // popUp(menu, 50);
      popUp(computerButton, 50);
      popUp(togetherButton, 50);
      popUp(chooseMode, 50);
    }, 50);
  } else {
    popOut(chooseButton, 50);
    popOut(menu, 50);
  }
}

const boxPopUp = (el, timeout, display) => {
  el.style.display = display || "block";
  el.style.transition = ` ${timeout}ms ease-out`;
  setTimeout(() => {
    el.style.transform = "scale(2)";
  }, 10);
};

const popUp = (el, timeout, display) => {
  el.style.transform = "scale(0.5)";
  el.style.display = display || "block";
  el.style.transition = ` ${timeout}ms ease-in`;
  setTimeout(() => {
    el.style.transform = "scale(1)";
  }, 10);
};

const popOut = (el, timeout) => {
  el.style.transition = ` ${timeout}ms ease-in`;
  el.style.transform = "scale(0.5)";

  setTimeout(() => {
    el.style.display = "none";
  }, timeout);
};

function ticTacFlicker(i, winner) {
  const cross = document.querySelectorAll(".cross-img");
  const circle = document.querySelectorAll(".circle-img");
  if (tie) {
    let intervalId = setInterval(() => {
      i++;
      circle.forEach((value, i) => {
        circle[i].style = "display: none";
      });
      cross.forEach((value, i) => {
        cross[i].style = "display: none";
      });
      setTimeout(() => {
        circle.forEach((value, i) => {
          circle[i].style = "display: block";
          circle[i].style.transform = "scale(2)";
        });
        cross.forEach((value, i) => {
          cross[i].style = "display:block";
          cross[i].style.transform = "scale(2)";
        });
      }, 150);
      if (i === 3) clearInterval(intervalId);
    }, 300);
  } else if (win) {
    let intervalId = setInterval(() => {
      i++;
      winnerLine.forEach((value) => {
        if (winner === "Noughts")
          box[value].innerHTML =
            '<img src="img/circle.png" class="circle-img" style = "display: none">';
        else
          box[value].innerHTML =
            '<img src="img/cross.png" class="cross-img" style = "display: none">';
      });
      setTimeout(() => {
        winnerLine.forEach((value) => {
          if (winner === "Noughts") {
            box[value].innerHTML =
              '<img src="img/circle.png" class="circle-img" style = "display: block; transform: scale(2);">';
          } else {
            box[value].innerHTML =
              '<img src="img/cross.png" class="cross-img" style = "display: block; transform: scale(2);">';
          }
        });
      }, 150);
      if (i === 3) clearInterval(intervalId);
    }, 300);
  }
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
