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
    $("#home").css("display", "block");
    $("#game").css("display", "none");
  }

  showGame() {
    $("#game").css("display", "block");
    $("#home").css("display", "none");
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
      this.mines = $(event.target).val();
    });
    $("#nRows").on("change", (event) => {
      this.rows = $(event.target).val();
    });
    $("#goHome").on("click", () => {
      this.stopGame();
      this.showHome();
    });
  }
}
