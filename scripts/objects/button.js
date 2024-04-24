import box from "./box.js";
import score from "../data/score.js";
import menuButtons from "../data/menuButtons.js";
import renderMenu from "../renders/renderMenu.js";
import renderScore from "../renders/renderScore.js";
import { result, logic } from "../data/dataArrays.js";
import { playerMove, computerMove } from "../utils/gameLogic.js";

const button = {
  get $buttons() {
    return document.querySelectorAll(".menu__button");
  },

  turnBtnOn() {
    this.$buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.hasAttribute("pvp")) this.startPVP();
        else if (btn.hasAttribute("pve")) this.startPVE();
        else if (btn.hasAttribute("restart")) this.restart();
        else if (btn.hasAttribute("change")) {
          this.refresh();
          score.x = 0;
          score.o = 0;
          renderScore();

          logic.computerOn = false;
        }
        this.updateButtons();

        renderMenu();
      });
    });
  },
  updateButtons() {
    if (logic.isStarted) {
      menuButtons[0].state = false;
      menuButtons[1].state = false;
      menuButtons[2].state = true;
      menuButtons[3].state = true;
    } else {
      menuButtons[0].state = true;
      menuButtons[1].state = true;
      menuButtons[2].state = false;
      menuButtons[3].state = false;
    }
  },
  restart() {
    this.refresh();
    logic.anotherMode = false;
    if (logic.computerOn) {
      this.startPVE();
    } else this.startPVP();
  },
  refresh() {
    box.clearAll();
    result.win = false;
    result.tie = false;
    logic.isStarted = false;
    logic.turn = false;
  },
  startPVP() {
    logic.isStarted = true;
    playerMove();
  },
  startPVE() {
    logic.isStarted = true;
    setTimeout(() => {
      computerMove();
    }, 500);
  },
};

export default button;
