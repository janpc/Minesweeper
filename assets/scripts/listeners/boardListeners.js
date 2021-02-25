import { mines } from "../index.js";

export function addBoardListeners($nodeToPrint) {
  $nodeToPrint.addEventListener("click", leftClickFunction);

  $nodeToPrint.addEventListener("contextmenu", rightClickFunction);
}

export function removeBoardListeners($nodeToPrint) {
    $nodeToPrint.removeEventListener("click", leftClickFunction);
  
    $nodeToPrint.removeEventListener("contextmenu", rightClickFunction);
  }


function rightClickFunction(event) {
  event.preventDefault();
  let x = event.target.dataset.x;
  let y = event.target.dataset.y;
  x = parseInt(x);
  y = parseInt(y);

  mines.putFlagOnPosition(x, y);
}

function leftClickFunction(event) {
  let x = event.target.dataset.x;
  let y = event.target.dataset.y;
  x = parseInt(x);
  y = parseInt(y);

  mines.showContent(x, y);
}
