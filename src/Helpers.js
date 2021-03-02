/** create a board nrows high/ncols wide, each cell randomly lit or unlit 
   * @returns randomly generated array of arrays with random true/false values
  */
export const createBoard = (nrows, ncols, chanceLightStartsOn) => {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let x = 0; x < nrows; x++) {
        let newRow = [];
        for (let y = 0; y < ncols; y++) {
            if (Math.random() < chanceLightStartsOn) {
                newRow.push(true);
            } else {
                newRow.push(false);
            }
        }
        initialBoard.push(newRow);
    }

    return initialBoard;
};

/**
   * checks board in state to determine whether player has won
   * 
   * @returns boolean 
   */
export const hasWon = (nrows, ncols, board) => {
    // check the board in state to determine whether the player has won.
    for (let y = 0; y < nrows; y++) {
        for (let x = 0; x < ncols; x++) {
            if (board[y][x] === true) return false;
        }
    }
    return true;
};