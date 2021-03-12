export function getPositionFromTerget(target){
    let x = target.dataset.x;
    let y = target.dataset.y;
    x = parseInt(x);
    y = parseInt(y);
  
    return {'x': x, 'y': y };
  
  }