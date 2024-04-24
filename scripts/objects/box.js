import { boxes, result } from "../data/dataArrays.js";

const box = {
  get $box() {
    return document.querySelectorAll(".play-area__boxes");
  },

  addSign(sign, i) {
    let string;
    let style = "";
    if (this.$box.length === 9) {
      if (this.$box[i].hasChildNodes())
        style = 'style = "display: block; -webkit-transform: scale(2)"';
    }
    if (!sign) return "";
    else if (sign === "x") string = "cross";
    else string = "circle";
    return `<img src="img/${string}.png" class="${string}-img" ${style}>`;
  },

  clearAll() {
    this.$box.forEach((el) => (el.innerHTML = ""));
    boxes.forEach((b, i) => {
      boxes[i] = "";
    });
  },

  boxPopUp(index) {
    let el = this.$box[index].firstElementChild;
    el.style = "display: block; -webkit-transform: scale(2)";
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

    function hide(shape) {
      shape.style = "display: none; -webkit-transform: scale(1)";
    }

    function show(shape) {
      shape.style = "display: block; -webkit-transform: scale(2)";
    }
  },
};

export default box;
