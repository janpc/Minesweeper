import { Cell } from "./Cell.js";

export class NumberCell extends Cell {
  numberToClass = ["empty", "one", "two", "three", "more"];
  constructor(x, y, number) {
    super(x, y, "number");
    this.number = number;
  }

  addOne() {
    this.number++;
  }

  getNumber() {
    return this.number;
  }

  showContent() {
    if (this.visited == false) {
      $(`#${this.id}`).text(this.number);
      if (this.number < 4) {
        $(`#${this.id}`).addClass(this.numberToClass[this.number]);
      } else {
        $(`#${this.id}`).addClass(this.numberToClass[4]);
      }
      this.visited = true;
      return this.type;
    } else {
      return null;
    }
    c;
  }
}
