import { logic } from "../data/dataArrays.js";
import button from "../objects/button.js";
import renderButtons from "./renderButtons.js";

function renderMenu(result = {}, winner = "") {
  const menu = document.querySelector(".menu");
  button.updateButtons();
  const buttonHTML = renderButtons();
  let html = `
  <p class="menu__choose" ${menuStyle(winner)}>Choose a mode</p>
  <p class="menu__result" ${menuStyle(winner, "result")}>${endGame(
    result,
    winner
  )}</p>
  `;
  menu.firstElementChild.innerHTML = html + buttonHTML;
  button.turnBtnOn();

  if (logic.isStarted && !logic.anotherMode) {
    menu.style = "display: none";
  } else if (logic.anotherMode) {
    logic.anotherMode = false;
    menu.style = "display: flex";
  }
}

function menuStyle(winner, el = "") {
  let style = "";
  if (el === "result") {
    if (!winner) style = 'style = "display: none"';
  } else {
    if (winner) style = 'style = "display: none"';
  }
  return style;
}

function endGame(result, winner) {
  let text = "";
  if (result.tie) text = "It's a tie!";
  else if (result.win) text = `${winner} win!`;
  return text;
}

export default renderMenu;
