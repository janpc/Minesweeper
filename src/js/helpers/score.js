export function setMinesLeftScore( num ){
    $('#minesLeft').text(num);
}

export function setPositionsLeftScore( num ){
    $('#positionsLeft').text(num);
}

export function setTimeScore(str){
    $('#chronometer').text(str);
}

export function timeToString(value){
    const min = Math.floor(value/60);
    const sec = value%60;

    return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
}