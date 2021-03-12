import { Cell } from "./Cell.js";

export class BombCell extends Cell {
  constructor(x, y) {
    super(x, y, "bomb");
  }

  showContent() {
    if (this.visited == false) {
      $(`#${this.id}`).addClass("fas fa-bomb");
      this.visited = true;
      return this.type;
    } else {
        return null;
    }
  }
}
