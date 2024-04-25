import renderPlayArea from "./scripts/renders/renderPlayArea.js";
renderPlayArea();

document.body.ontouchstart = (e) => e.preventDefault();
