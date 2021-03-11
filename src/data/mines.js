import { addModaLListeners } from "../listeners/modalListeners.js";

export class Mines{
    minesArray = [];
    positionsVisited = [];
    isPlaying;

    constructor(rows, mines ){
        this.rows = rows;
        this.mines = mines;
        this.createArray(rows);
    }

    createArray( rows ){
        for(let i = 0; i < rows; i++){
            let minesRow = [];
            let positionsRow=[];
            for(let j = 0; j < rows; j++){
                minesRow.push(0);
                positionsRow.push(false);
            }
            this.minesArray.push(minesRow);
            this.positionsVisited.push(positionsRow);
        }
        this.positionsLeft = Math.pow( rows, 2);
    }

    putMines( initialClickX , initialClickY ){
        for (let i = 0; i < this.mines; i++) {
            const x = Math.floor(Math.random() * this.rows);
            const y = Math.floor(Math.random() * this.rows);
            const emptyArea = (x >= initialClickX - 1 && x <= initialClickX + 1 && y >= initialClickY - 1 && y <= initialClickY + 1);

            if( !emptyArea){
                if( this.minesArray[ x ][ y ] != -1){
                    this.minesArray[ x ][ y ] = -1;
                    this.callFunctionOnPositionsAround(x, y, this.addOneOnPosition, this)
                }else {
                    i--;
                }
            }else {
                i--;
            }
        }
        this.minesLeft = this.mines;
    }

    addOneOnPosition(x, y, thisClass){

        if(x >- 1 && y > -1 && x < thisClass.rows && y < thisClass.rows){
            if( thisClass.minesArray[x][y] != -1 ){
                thisClass.minesArray[x][y] += 1;
            }
        }

    }

    printBoard(){
        let $board = '';
        let count =0;
        console.log( this.minesArray)
        this.minesArray.forEach((row, x) => {
            $board += '<article class="board__row">'
            row.forEach((position, y)=>{
                $board += `
                    <button class='board__row__square' id='square${x > 9 ? x : '0' + x }${ y > 9 ? y : '0' + y }' data-x='${x}' data-y='${y}'></button>
                `;
                count ++;
            });
            $board += '</article>'
        });
        return $board;

    }

    showContent( x, y, thisClass = this ){
        if( !thisClass.isPlaying ){
            thisClass.putMines( x, y );
            thisClass.isPlaying = true;
        }

        let isInside = x >=0 && x < thisClass.rows && y >=0 && y < thisClass.rows;

        if( isInside && thisClass.positionsVisited[x][y]==false && thisClass.isPlaying){
            let target = document.getElementById(`square${x > 9 ? x : '0' + x }${ y > 9 ? y : '0' + y }`);
            let content = thisClass.minesArray[x][y];

            thisClass.positionsVisited[x][y] = true;

            if ( content == -1 ) {
                target.classList.add('fas', 'fa-bomb');
                thisClass.isPlaying = false;
                this.showAllPositionsFromCenter( x, y, this.rows );
            }else if ( content == 0 ) {
                target.classList.add('empty');
                thisClass.callFunctionOnPositionsAround( x, y, thisClass.showContent, thisClass );
            }else if ( content == 1) {
                target.innerHTML = content;
                target.classList.add('one');
            }else if ( content == 2) {
                target.innerHTML = content;
                target.classList.add('two');
            }else if ( content == 3) {
                target.innerHTML = content;
                target.classList.add('three');
            }else {
                target.innerHTML = content;
                target.classList.add('more');
            }
            thisClass.positionsLeft--;
        }
        thisClass.checkEnd();
    }

    callFunctionOnPositionsAround( posX, posY, callback, thisClass){
        let x = -1;
        let y = -1;

        for(x; x < 1; x++){
            callback( posX + x , posY + y, thisClass );
        }
        for(y; y < 1; y++){
            callback( posX + x , posY + y, thisClass );
        }
        for(x; x > -1; x--){
            callback( posX + x, posY + y, thisClass );
        }
        for(y; y > -1; y--){
            callback( posX + x, posY + y, thisClass );
        }
    }

    putFlagOnPosition( x, y ){
        let target = document.getElementById(`square${x > 9 ? x : '0' + x }${ y > 9 ? y : '0' + y }`);
        if( this.positionsVisited[x][y] == false ){
            target.classList.add('fas', 'fa-flag');
            this.positionsVisited[x][y] = null;
            this.minesLeft--;
            this.positionsLeft--;
        }else if( this.positionsVisited[x][y] == null ){
            target.classList.remove('fas', 'fa-flag');
            this.positionsVisited[x][y] = false;
            this.minesLeft++;
            this.positionsLeft++;
        }
        this.checkEnd();
        console.log( 'positions: ', this.positionsLeft, 'mines: ', this.minesLeft );
    }

    showPosition( x, y, mineX, mineY ){
        let target = document.getElementById(`square${x > 9 ? x : '0' + x }${ y > 9 ? y : '0' + y }`);
        if( x < this.rows && x > -1 && y < this.rows && y > -1 && !this.positionsVisited[x][y]){
            const distance = Math.sqrt( Math.pow(( x - mineX ), 2) + Math.pow(( y - mineY ), 2));
            const color = this.calculateColor( x, y, mineX, mineY );
            setTimeout(function(){
                target.style.backgroundColor = color;
            }, distance * 50)
            
        }
    }

    showAllPositionsFromCenter( initialX, initialY, rows){
        let x = 0;
        let y = 0;
        let i = 0;
        let mainIteration = 1;
        let corners = 0;
        while ( corners != 4 ) {
            while (x != y) {
                if (x < y) {
                    y--;
                } else {
                    y++;
                }
                this.showPosition( initialX + x, initialY + y , initialX, initialY);
                checkCorners( initialX + x, initialY + y );
            }
            if (mainIteration % 2 == 0) {
                while (x > y - mainIteration) {
                    x--;
                    this.showPosition( initialX + x, initialY + y , initialX, initialY);
                    checkCorners( initialX + x, initialY + y );
                }
            } else {
                while (x < y + mainIteration) {
                    x++;
                    this.showPosition( initialX + x, initialY + y , initialX, initialY);
                    checkCorners( initialX + x, initialY + y );
                }
            }
            mainIteration++;
            
        }
        const maxDistance = Math.sqrt( Math.pow(this.rows, 2) * 2);
        setTimeout(()=>{printModal( 'You lose!')}, maxDistance * 50 + 200);

        function checkCorners( x, y ){
            if(x == 0 && y == 0 || x == 0 && y == rows || x == rows && y == 0 || x == rows && y == rows){
                corners++;
            }
        }
    }

    calculateColor( x , y, mineX, mineY){
        const distance = Math.sqrt( Math.pow(( x - mineX ), 2) + Math.pow(( y - mineY ), 2));
        const maxDistance = Math.sqrt( Math.pow(this.rows, 2) * 2);
        const initialColor = hex_to_RGB( '#000000' );
        const finalColor = hex_to_RGB( '#62E0F6' );

        const red = ( maxDistance - distance ) / maxDistance *initialColor.r + distance / maxDistance * finalColor.r;
        const green = ( maxDistance - distance ) / maxDistance *initialColor.g + distance / maxDistance * finalColor.g;
        const blue = ( maxDistance - distance ) / maxDistance *initialColor.b + distance / maxDistance * finalColor.b;

        const result="rgb(" + red + "," + green + "," + blue + ")";
        return result;
    }

    checkEnd(){
        if(this.minesLeft == this.positionsLeft){
            printModal( 'You win!');
        }
    }

}



function hex_to_RGB(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
}


function printModal( text){
    const $modal = `
        <div class='modal__background' id='modalBackground'>
            <div class='modal'>
                <p class='modal__text'> ${ text } </p>
                <button>Ok</button>
            </div>
        </div>
    `;

    document.querySelector('body').innerHTML += $modal;
    addModaLListeners();
}

