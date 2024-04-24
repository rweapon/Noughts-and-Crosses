import box from "../objects/box.js";
import renderMenu from "./renderMenu.js";
import { boxes } from "../data/dataArrays.js";

renderMenu();

function renderPlayArea() {
  const playArea = document.querySelector(".play-area__grid");
  let html = "";
  boxes.forEach((sign, i) => {
    html += `
    <div class="play-area__boxes">${box.addSign(sign, i)}</div>
    `;
  });

  playArea.innerHTML = html;
}

export default renderPlayArea;
