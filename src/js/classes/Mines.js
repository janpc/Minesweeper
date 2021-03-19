import Chronometer from "./Chronometer.js";
import { BombCell } from "./BombCell.js";
import { EmptyCell } from "./EmptyCell.js";
import { NumberCell } from "./NumberCell.js";
import { showAllPositionsFromCenter } from "../helpers/animations.js";
import { checkIfIsInside } from "../helpers/position.js";
import { getPositionFromTerget } from "../helpers/getPositionFromTarget.js";
import { setMinesLeftScore, setPositionsLeftScore } from "../helpers/score.js";
import { Modal } from "./Modal.js";

export class Mines {
  minesArray = [];
  isPlaying;

  minesLeft = {
    valueInternal: null,
    valueListener: function (val) {},
    set value(val) {
      this.valueInternal = val;
      this.valueListener(val);
    },
    get value() {
      return this.valueInternal;
    },
    registerListener: function (listener) {
      this.valueListener = listener;
    },
  };

  positionsLeft = {
    valueInternal: null,
    valueListener: function (val) {},
    set value(val) {
      this.valueInternal = val;
      this.valueListener(val);
    },
    get value() {
      return this.valueInternal;
    },
    registerListener: function (listener) {
      this.valueListener = listener;
    },
  };

  constructor(app) {
    this.leftClickFunction = this.leftClickFunction.bind(this);
    this.rightClickFunction = this.rightClickFunction.bind(this);

    this.chronometer = new Chronometer();
    this.rows = app.rows;
    this.mines = app.mines;
    this.createArray(this.rows);
    this.printBoard(app.$board);
    this.minesLeft.registerListener((val) => {
      setMinesLeftScore(val);
    });
    this.positionsLeft.registerListener((val) => {
      setPositionsLeftScore(val);
    });

    this.minesLeft.value = this.mines;
    this.positionsLeft.value = Math.pow(this.rows, 2);
    this.app = app;
  }

  createArray(rows) {
    for (let i = 0; i < rows; i++) {
      let minesRow = [];
      for (let j = 0; j < rows; j++) {
        minesRow.push(new EmptyCell(i, j));
      }
      this.minesArray.push(minesRow);
    }
    this.positionsLeft.value = Math.pow(rows, 2);
  }

  putMines(initialClickX, initialClickY) {
    for (let i = 0; i < this.mines; i++) {
      const x = Math.floor(Math.random() * this.rows);
      const y = Math.floor(Math.random() * this.rows);
      const emptyArea =
        x >= initialClickX - 1 &&
        x <= initialClickX + 1 &&
        y >= initialClickY - 1 &&
        y <= initialClickY + 1;

      if (!emptyArea) {
        if (this.minesArray[x][y].getType() != "bomb") {
          this.minesArray[x][y] = new BombCell(x, y);
          this.callFunctionOnPositionsAround(x, y, this.addOneOnPosition, this);
        } else {
          i--;
        }
      } else {
        i--;
      }
    }
    this.minesLeft.value = this.mines;
  }

  addOneOnPosition(x, y, thisClass) {
    if (x > -1 && y > -1 && x < thisClass.rows && y < thisClass.rows) {
      if (thisClass.minesArray[x][y].getType() != "bomb") {
        if (thisClass.minesArray[x][y].getType() == "empty") {
          thisClass.minesArray[x][y] = new NumberCell(x, y, 1);
        } else {
          thisClass.minesArray[x][y].addOne();
        }
      }
    }
  }

  printBoard($nodeToPrint) {
    let $board = "<div>";
    let count = 0;
    this.minesArray.forEach((row, x) => {
      $board += '<article class="board__row">';
      row.forEach((position, y) => {
        $board += `
                    <button class='board__row__square' id='square${
                      x > 9 ? x : "0" + x
                    }${
          y > 9 ? y : "0" + y
        }' data-x='${x}' data-y='${y}'></button>
                `;
        count++;
      });
      $board += "</article></div>";
    });
    this.$board = $($board);
    $nodeToPrint.innerHTML = "";
    $($nodeToPrint).append(this.$board);
    this.addBoardListeners();
  }

  showContent(x, y, thisClass = this) {
    if (!thisClass.isPlaying) {
      thisClass.chronometer.start();
      thisClass.putMines(x, y);
      thisClass.isPlaying = true;
    }

    if (checkIfIsInside(x, y, thisClass.rows) && thisClass.isPlaying) {
      if (!thisClass.minesArray[x][y].getVisited()) {
        thisClass.positionsLeft.value--;
      }

      const content = thisClass.minesArray[x][y].showContent();

      if (content == "bomb") {
        thisClass.isPlaying = false;
        this.chronometer.stop();
        showAllPositionsFromCenter(x, y, this.rows, this.minesArray);
        const maxDistance = Math.sqrt(Math.pow(this.rows, 2) * 2);
        setTimeout(() => {
          this.stop();
          new Modal("You lose!", this.app.showHome);
        }, maxDistance * 50 + 200);
      } else if (content == "empty") {
        thisClass.callFunctionOnPositionsAround(
          x,
          y,
          thisClass.showContent,
          thisClass
        );
      }
    }
    thisClass.checkEnd();
  }

  callFunctionOnPositionsAround(posX, posY, callback, thisClass) {
    let x = -1;
    let y = -1;

    for (x; x < 1; x++) {
      callback(posX + x, posY + y, thisClass);
    }
    for (y; y < 1; y++) {
      callback(posX + x, posY + y, thisClass);
    }
    for (x; x > -1; x--) {
      callback(posX + x, posY + y, thisClass);
    }
    for (y; y > -1; y--) {
      callback(posX + x, posY + y, thisClass);
    }
  }

  putFlagOnPosition(x, y) {
    const isFlag = this.minesArray[x][y].putFlag();
    if (isFlag == true) {
      this.minesLeft.value--;
      this.positionsLeft.value--;
    } else if (isFlag == false) {
      this.minesLeft.value++;
      this.positionsLeft.value++;
    }
    this.checkEnd();
  }

  checkEnd() {
    if (this.minesLeft.value == this.positionsLeft.value) {
      this.stop();
      new Modal("You win!", this.app.showHome);
    }
  }

  addBoardListeners() {
    $(this.$board).on("click", this.leftClickFunction);

    $(this.$board).on("contextmenu", this.rightClickFunction);
  }

  removeBoardListeners() {
    $(this.$board).off("click", this.leftClickFunction);

    $(this.$board).off("contextmenu", this.rightClickFunction);
  }

  rightClickFunction(event) {
    event.preventDefault();
    const position = getPositionFromTerget(event.target);

    this.putFlagOnPosition(position.x, position.y);
  }

  leftClickFunction(event) {
    const position = getPositionFromTerget(event.target);
    this.showContent(position.x, position.y);
  }

  stop() {
    this.chronometer.stop();
    this.removeBoardListeners();
    this.minesArray = null;
  }
}
