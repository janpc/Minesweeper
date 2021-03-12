import "../style/main.scss";
import $ from "jquery";

import { Mines } from './data/mines.js';

var  mines;
const $board = document.getElementById( 'board' );

window.onload= function(){
    mines = new Mines( 30, 200, $board );
}

export { mines, $board }
