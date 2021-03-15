import { Mines } from "./Mines";

export class App {
  constructor(board) {
    this.$board = board;
    this.mines = 200;
    this.rows = 30;
    this.showHome();
    this.addListeners();
  }

  showHome() {
    $("#home").removeClass("displayNone");
    $("#game").addClass("displayNone");
  }

  showGame() {
    $("#game").removeClass("displayNone");
    $("#home").addClass("displayNone");
  }

  startGame() {
    this.showGame();
    this.game = new Mines(this);
  }

  stopGame() {
    this.game.stop();
    this.game = null;
  }

  addListeners() {
    $("#startGame").on("click", (event) => {
      event.preventDefault();
      this.startGame();
    });
    $("#nMines").on("change", (event) => {
      const value = $(event.target).val();
      this.changeMines(value);
    });
    $("#nRows").on("change", (event) => {
      let value = $(event.target).val();
      if (value < 15) {
        value = 15;
      } else if (value > 99) {
        value = 99;
      }
      $(event.target).val(value);
      this.rows = value;
      this.changeMines(this.mines);
    });
    $("#goHome").on("click", () => {
      this.stopGame();
      this.showHome();
    });
  }

  changeMines(value) {
    const max = Math.pow(this.rows, 2) / 2;
    if (value > max) {
      value = Math.floor(max);
      $("#nMines").val(value);
    }

    this.mines = value;
  }
}
