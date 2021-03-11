import "./style/main.scss";

import { Mines } from './data/mines.js';
import { addBoardListeners } from './listeners/boardListeners.js';

var  mines;
const $board = document.getElementById( 'board' );

window.onload= function(){
    mines = new Mines( 30, 200 );
    $board.innerHTML = mines.printBoard();
    addBoardListeners( $board );
}

export { mines, $board }
