import { BombCell } from "../classes/BombCell.js";
import { EmptyCell } from "../classes/EmptyCell.js";
import { NumberCell } from "../classes/NumberCell.js";
import { showAllPositionsFromCenter } from "../helpers/animations.js";
import {checkIfIsInside} from "../helpers/position.js";
import {printModal} from "../print/modal.js";
import { getPositionFromTerget } from "../helpers/getPositionFromTarget.js";

export class Mines {
  minesArray = [];
  isPlaying;

  constructor(rows, mines, $nodeToPrint) {
    this.rows = rows;
    this.mines = mines;
    this.createArray(rows);
    this.printBoard($nodeToPrint);
  }

  createArray(rows) {
    for (let i = 0; i < rows; i++) {
      let minesRow = [];
      for (let j = 0; j < rows; j++) {
        minesRow.push(new EmptyCell(i, j));
      }
      this.minesArray.push(minesRow);
    }
    this.positionsLeft = Math.pow(rows, 2);
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
    this.minesLeft = this.mines;
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
    let $board = "";
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
      $board += "</article>";
    });
    $nodeToPrint.innerHTML = '';
    $nodeToPrint.innerHTML = $board;
    this.addBoardListeners($nodeToPrint);
  }

  showContent(x, y, thisClass = this) {
    if (!thisClass.isPlaying) {
      thisClass.putMines(x, y);
      thisClass.isPlaying = true;
    }

    if (checkIfIsInside(x, y, thisClass.rows) && thisClass.isPlaying) {
      const content = thisClass.minesArray[x][y].showContent();

      if (content == "bomb") {
        thisClass.isPlaying = false;
        showAllPositionsFromCenter(x, y, this.rows, this.minesArray);
      } else if (content == "empty") {
        thisClass.callFunctionOnPositionsAround(
          x,
          y,
          thisClass.showContent,
          thisClass
        );
      }
      thisClass.positionsLeft--;
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
      this.minesLeft--;
      this.positionsLeft--;
    } else if(isFlag == false){
      this.minesLeft++;
      this.positionsLeft++;
    }
    this.checkEnd();
    console.log("positions: ", this.positionsLeft, "mines: ", this.minesLeft);
  }

  checkEnd() {
    if (this.minesLeft == this.positionsLeft) {
      printModal("You win!");
    }
  }

  addBoardListeners($nodeToPrint) {
    $nodeToPrint.addEventListener("click", (event) => this.leftClickFunction(event));
  
    $nodeToPrint.addEventListener("contextmenu", (event) => this.rightClickFunction(event));
  }
  
  removeBoardListeners($nodeToPrint) {
      $nodeToPrint.removeEventListener("click", (event) => this.leftClickFunction(event));
    
      $nodeToPrint.removeEventListener("contextmenu", (event) => this.rightClickFunction(event));
    }
  
  
  rightClickFunction(event) {
    event.preventDefault();
    const position = getPositionFromTerget(event.target)
  
    this.putFlagOnPosition(position.x, position.y);
  }
  
  leftClickFunction(event) {
    const position = getPositionFromTerget(event.target)
    this.showContent(position.x, position.y);
  }
}
