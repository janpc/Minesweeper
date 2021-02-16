import { Mines } from './data/mines.js';
import { addBoardListeners } from './listeners/boardListeners.js';

let  mines;
const $main = document.getElementById( 'main' );

window.onload= function(){
    mines = new Mines( 30, 10, $main );
    mines.printBoard();
    addBoardListeners( $main );
}
export { mines }

