import { checkIfIsInside } from "./position.js";

function showPosition(x, y, distance, maxDistance, minesArray, rows) {
  if (checkIfIsInside(x, y, rows)) {
    minesArray[x][y].showPositionEnd(distance, maxDistance);
  }
}

export function showAllPositionsFromCenter(
  initialX,
  initialY,
  rows,
  minesArray
) {
  const maxDistance = Math.sqrt(Math.pow(rows, 2) * 2);

  let x = 0;
  let y = 0;
  let i = 0;
  let mainIteration = 1;
  let corners = 0;
  while (corners != 4) {
    while (x != y) {
      if (x < y) {
        y--;
      } else {
        y++;
      }
      const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      showPosition(
        initialX + x,
        initialY + y,
        distance,
        maxDistance,
        minesArray,
        rows
      );
      checkCorners(initialX + x, initialY + y);
    }
    if (mainIteration % 2 == 0) {
      while (x > y - mainIteration) {
        x--;
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        showPosition(
          initialX + x,
          initialY + y,
          distance,
          maxDistance,
          minesArray,
          rows
        );
        checkCorners(initialX + x, initialY + y);
      }
    } else {
      while (x < y + mainIteration) {
        x++;
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        showPosition(
          initialX + x,
          initialY + y,
          distance,
          maxDistance,
          minesArray,
          rows
        );
        checkCorners(initialX + x, initialY + y);
      }
    }
    mainIteration++;
  }

  function checkCorners(x, y) {
    if (
      (x == 0 && y == 0) ||
      (x == 0 && y == rows) ||
      (x == rows && y == 0) ||
      (x == rows && y == rows)
    ) {
      corners++;
    }
  }
}
