import { boxes, result } from "../data/dataArrays.js";
import shapes from "../data/shapes.js";

const box = {
  get $box() {
    return document.querySelectorAll(".play-area__boxes");
  },

  addSign(sign, i) {
    let string;
    let style = "";
    let el;
    if (!sign) return "";
    else if (sign === "x") string = shapes.x;
    else string = shapes.o;
    if (this.$box.length === 9) {
      if (this.$box[i].hasChildNodes()) {
        string = string.replace("style", 'style = "display: block;" popped');
      }
    }
    return string;
  },

  clearAll() {
    this.$box.forEach((el) => (el.innerHTML = ""));
    boxes.forEach((b, i) => {
      boxes[i] = "";
    });
  },

  boxPopUp(i) {
    let el = this.$box[i].firstElementChild;
    el.style = "display: block;";
    setTimeout(() => {
      el.setAttribute("popped", "");
    }, 10);
  },

  ticTacFlicker(winnerLine) {
    let i = 0;
    if (result.tie) {
      let intervalId = setInterval(() => {
        i++;
        this.$box.forEach((sign) => {
          hide(sign.firstElementChild);
        });
        setTimeout(() => {
          this.$box.forEach((sign) => {
            show(sign.firstElementChild);
          });
        }, 150);
        if (i === 3) clearInterval(intervalId);
      }, 300);
    } else if (result.win) {
      let intervalId = setInterval(() => {
        i++;
        winnerLine.forEach((i) => {
          hide(this.$box[i].firstElementChild);
        });
        setTimeout(() => {
          winnerLine.forEach((i) => {
            show(this.$box[i].firstElementChild);
          });
        }, 150);
        if (i === 3) clearInterval(intervalId);
      }, 300);
    }

    function hide(el) {
      el.style = "display: none;";
      el.removeAttribute("popped");
    }

    function show(el) {
      el.style = "display: block;";
      el.setAttribute("popped", "");
    }
  },
};

export default box;
