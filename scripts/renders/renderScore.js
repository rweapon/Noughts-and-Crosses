import score from "../data/score.js";

function renderScore() {
  const scoreEl = document.querySelector(".score");
  let html = `
  <p class="score__crosses">${score.x}</p>
  <p class="score__noughts">${score.o}</p>
  `;
  scoreEl.innerHTML = html;
}

export default renderScore;
