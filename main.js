const matrice = [
  [0, 4, 0, 0, 0, 6, 5, 1, 0],
  [0, -1, 2, 0, -1, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0],

  [0, 0, -1, -1, -1, 0, 0, 0, 0],
  [2, 0, -1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, -1, 1, 0, -1, 5],

  [6, -1, 4, -1, 2, -1, -1, 1, 0],
  [0, 0, 0, 0, 0, -1, 2, 0, 0],
  [-1, -1, 0, 0, -1, 0, 0, 0, -1],
];

console.log(matrice.reduce((prev, row) => prev + row.length, 0) == 9 * 9);

function checkIfNotPresentHorizontaly(x, y, value) {
  //Check left
  for (let xL = x; xL >= 0; xL--) {
    if (matrice[y][xL] == -1) {
      break;
    }
    if (matrice[y][xL] == value) {
      return false;
    } //Found on left
  }
  //Check rigth
  for (let xR = x; xR < 9; xR++) {
    if (matrice[y][xR] == -1) {
      break;
    }
    if (matrice[y][xR] == value) {
      return false;
    } //Found on right
  }
  return true;
}
function checkIfNotPresentVerticaly(x, y, value) {
  //Check Top
  for (let yT = y; yT >= 0; yT--) {
    if (matrice[yT][x] == -1) {
      break;
    }
    if (matrice[yT][x] == value) {
      return false; //Found on top
    }
  }
  //Check Bottom
  for (let yB = y; yB < 9; yB++) {
    if (matrice[yB][x] == -1) {
      break;
    }
    if (matrice[yB][x] == value) {
      return false; //Found on bottm
    }
  }
  return true;
}
function getAvailableVerticalSpace(x, y) {
  let topSpace = 0;
  let bottomSpace = 0;
  let yT, yB;

  //Check Top
  for (yT = y; yT >= 0; yT--) {
    if (matrice[yT][x] == -1) {
      break;
    }
  }
  yT++;
  topSpace = y - yT;

  //Check Bottom
  for (yB = y; yB < 9; yB++) {
    if (matrice[yB][x] == -1) {
      break;
    }
  }
  bottomSpace = yB - y;
  return topSpace + bottomSpace;
}
function getAvailableHorizontalSpace(x, y) {
  let leftSpace = 0;
  let rightSpace = 0;
  let xL, xR;

  //Check left
  for (xL = x; xL >= 0; xL--) {
    if (matrice[y][xL] == -1) {
      break;
    }
  }
  xL++;
  leftSpace = x - xL;
  //Check rigth
  for (xR = x; xR < 9; xR++) {
    if (matrice[y][xR] == -1) {
      break;
    }
  }
  rightSpace = xR - x;
  return rightSpace + leftSpace;
}

function displayGrid(matrice) {
  console.table(matrice);
}

displayGrid(matrice);

let changed = true;
while (changed) {
  changed = false;
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrice[y][x] == 0) {
        let available = [];
        let maxH = getAvailableHorizontalSpace(x, y);
        let maxV = getAvailableVerticalSpace(x, y);
        for (let value = 1; value < 10; value++) {
          let notExistHorizontaly = checkIfNotPresentHorizontaly(x, y, value);
          let notExistVerticaly = checkIfNotPresentVerticaly(x, y, value);
          if (
            (maxH > 1 ? value <= maxH : true) &&
            (maxV > 1 ? value <= maxV : true) &&
            notExistHorizontaly &&
            notExistVerticaly
          ) {
            available.push(value);
          }
        }
        if (available.length == 1) {
          console.log("\n\n");
          matrice[y][x] = available.at(0);
          displayGrid(matrice);
          console.log("Found " + available.at(0) + " at x: " + x + " y: " + y);
          changed = true;
        }
      }
    }
  }
}

console.log("Can't do better");
displayGrid(matrice);
