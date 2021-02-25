import { mines, $main } from "../index.js";
import { Mines } from '../data/mines.js';
import { addBoardListeners, removeBoardListeners } from '../listeners/boardListeners.js';



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
    const $main = document.getElementById( 'main' );

    removeBoardListeners( $main );
    removeMadalListeners();
    $modal.remove();
    Object.assign(mines, new Mines(30, 200));
    $main.innerHTML = mines.printBoard();
    addBoardListeners( $main );
}
