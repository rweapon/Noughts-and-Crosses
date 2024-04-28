import box from "../objects/box.js";
import renderPlayArea from "../renders/renderPlayArea.js";
import renderScore from "../renders/renderScore.js";
import score from "../data/score.js";
import renderMenu from "../renders/renderMenu.js";
import { combs, boxes, logic, result } from "../data/dataArrays.js";

export let winnerLine;

export function playerMove() {
  box.$box.forEach((b, index) => {
    b.addEventListener("click", function update() {
      b.removeEventListener("click", update);
      if (!result.win && logic.isStarted && boxes[index] === "") {
        !logic.turn ? (boxes[index] = "x") : (boxes[index] = "o");
        renderPlayArea();
        updateBoxes(index);
        if (logic.computerOn) {
          logic.isStarted = false;
          setTimeout(() => {
            computerMove();
          }, 500);
        }
      }
    });
  });
}

export function computerMove() {
  logic.isStarted = true;
  logic.computerOn = true;
  let j = 0;
  let computerBoxes = [];
  let playerBoxes = [];
  boxes.forEach((value, index) => {
    if (value === "x") computerBoxes.push(index);
    else if (value === "o") playerBoxes.push(index);
  });
  j = calculateBestMove(computerBoxes, playerBoxes);

  if (!result.win && logic.isStarted) {
    boxes[j] = "x";
    renderPlayArea();
    updateBoxes(j);
    playerMove();
  }
}

function updateBoxes(index) {
  let winner;

  box.boxPopUp(index);

  if (logic.turn) {
    winner = "Noughts";
    logic.turn = false;
  } else if (!logic.turn) {
    winner = "Crosses";
    logic.turn = true;
  }

  checkResult();
  if (result.win) {
    box.ticTacFlicker(winnerLine);
    setTimeout(() => {
      logic.anotherMode = true;
      renderMenu(result, winner);
      if (winner === "Crosses") score.x++;
      else score.o++;
      renderScore();
    }, 1200);
  } else if (result.tie) {
    box.ticTacFlicker(winnerLine);
    setTimeout(() => {
      logic.anotherMode = true;
      renderMenu(result, winner);
    }, 1200);
  } else if (!logic.computerOn) {
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

export function checkResult() {
  let i = 0;

  for (let comb of combs) {
    if (
      boxes[comb[0]] == boxes[comb[1]] &&
      boxes[comb[1]] == boxes[comb[2]] &&
      boxes[comb[0]] != ""
    ) {
      winnerLine = comb.slice();
      return (result.win = true);
    }
  }
  boxes.forEach((sign) => sign !== "" && i++);
  if (i === 9) return (result.tie = true);

  return false;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
