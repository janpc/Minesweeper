import { mines } from "../index.js";


export function addBoardListeners( $nodeToPrint ){
    $nodeToPrint.addEventListener('click', function(event){
        let x = event.target.dataset.x;
        let y = event.target.dataset.y;
        x = parseInt(x);
        y = parseInt(y);

        mines.showContent( x, y );
    });

    $nodeToPrint.addEventListener('contextmenu', function(event){
        event.preventDefault();
        let x = event.target.dataset.x;
        let y = event.target.dataset.y;
        x = parseInt(x);
        y = parseInt(y);

        mines.putFlagOnPosition( x, y );
    });
}
