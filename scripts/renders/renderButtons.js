import menuButtons from "../data/menuButtons.js";

function renderButtons() {
  let html = "";
  menuButtons.forEach((button) => {
    const { role, text, state } = button;
    let style = "";

    if (!state) style = 'style = "display: none"';
    html += `
    <button class="menu__button" ${role} type="button" ${style}>${text}</button>
    `;
  });

  return html;
}
export default renderButtons;
