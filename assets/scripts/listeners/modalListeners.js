export function addModaLListeners( mines ){
    const $modal =document.getElementById( 'modalBackground' );
    $modal.addEventListener( 'click', function() {
        removeMadalListeners();
        $modal.remove();
        mines.restartGame();
    });
}

function removeMadalListeners(){
    const $modal =document.getElementById( 'modalBackground' );
    $modal.removeEventListener( 'click', function() {
        $modal.remove();
        mines.restartGame();
        removeMadalListeners();
    });
}