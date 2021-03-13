import "../style/main.scss";
import $ from 'jquery';

import { App } from "./classes/App.js";

const $board = document.getElementById( 'board' );

window.onload= function(){
    const app = new App( $board );
}
