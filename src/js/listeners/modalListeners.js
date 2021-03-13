import { mines, $board } from "../app.js";
import { Mines } from '../data/mines.js';



export function addModaLListeners() {

  const $modal = document.getElementById("modalBackground");
  $modal.addEventListener("click", restartGame);
}

function removeMadalListeners() {
  const $modal = document.getElementById("modalBackground");
  $modal.removeEventListener("click", restartGame);
}

function restartGame(){
    const $modal = document.getElementById("modalBackground");
    const $board = document.getElementById( 'board' );

    mines.removeBoardListeners( $board );
    removeMadalListeners();
    $modal.remove();
    Object.assign(mines, new Mines(30, 200, $board));
    addBoardListeners( $board );
}
