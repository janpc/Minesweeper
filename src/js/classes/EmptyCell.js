import { Cell } from "./Cell.js";

export class EmptyCell extends Cell {
  constructor(x, y) {
    super(x, y, "empty");
  }

  showContent() {
    if (this.visited == false) {
      $(`#${this.id}`).addClass("empty");
      this.visited = true;
      return this.type;
    } else {
      return null;
    }
  }
}
