import { calculateColor, rgbToHex } from "../helpers/colors.js";

export class Cell {
  position = {
    x: null,
    y: null,
  };

  constructor(x, y, type) {
    this.position.x = x;
    this.position.y = y;
    this.type = type;
    this.id = `square${x > 9 ? x : "0" + x}${y > 9 ? y : "0" + y}`;
    this.visited = false;
  }

  getType() {
    return this.type;
  }

  setVisited() {
    this.visited = true;
  }

  getVisited() {
    return this.visited;
  }

  putFlag() {
    if (this.visited == false) {
      $(`#${this.id}`).addClass("fas fa-flag");
      this.visited = null;
      return true;
    } else if (this.visited == null) {
      $(`#${this.id}`).removeClass("fas fa-flag");
      this.visited = false;
      return false;
    }
  }

  showPositionEnd(distance, maxDistance) {
    if (!this.visited) {
      const color = calculateColor(distance, maxDistance);
      setTimeout(() => {
        if (this.type == "bomb" && this.visited != null) {
          this.showContent();
          $(`#${this.id}`).css({
            'color':' #fff',
            'box-shadow':` inset 0px 0px 10px ${rgbToHex(color)}`
        });
        } else if (this.type == "bomb" && this.visited == null) {
          $(`#${this.id}`).css("color", "#62e0f6");
        } else if (this.type != "bomb" && this.visited == null) {
          $(`#${this.id}`).css("color", "#cb0c59");
          $(`#${this.id}`).css("background-color", color);
        } else {
          $(`#${this.id}`).css("background-color", color);
        }
        this.visited = true;
      }, distance * 50);
    }
  }
}
