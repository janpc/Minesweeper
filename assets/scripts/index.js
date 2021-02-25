import { Mines } from './data/mines.js';
import { addBoardListeners } from './listeners/boardListeners.js';

var  mines;
const $main = document.getElementById( 'main' );

window.onload= function(){
    mines = new Mines( 30, 200 );
    $main.innerHTML = mines.printBoard();
    addBoardListeners( $main );
}

export { mines, $main }

