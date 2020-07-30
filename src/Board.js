import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';
import cloneDeep from 'lodash/cloneDeep';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
	const [ board, setBoard ] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit 
   * @returns randomly generated array of arrays with random true/false values
  */
	function createBoard() {
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
	}

	/**
   * checks board in state to determine whether player has won
   * 
   * @returns boolean 
   */
	function hasWon() {
		// check the board in state to determine whether the player has won.
		for (let y = 0; y < board.length; y++) {
			for (let x = 0; x < board.length; x++) {
				if (board[y][x] === true) return false;
			}
		}
		return true;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// Make a (deep) copy of the oldBoard
			let boardCopy = cloneDeep(oldBoard);

			// in the copy, flip this cell and the cells around it
			flipCell(y, x, boardCopy);
			flipCell(y + 1, x, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y, x + 1, boardCopy);
			flipCell(y, x - 1, boardCopy);

			// return the copy
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon()) {
		return (
			<div className="Board">
				<h1 className="Board-Title">Lights Out!</h1>
				<h2 className="Board-Win">YOU WON!!</h2>
			</div>
		);
	}

	let tableBody = [];
	for (let y = 0; y < nrows; y++) {
		let tableRow = [];
		for (let x = 0; x < ncols; x++) {
			let coord = `${y}-${x}`;
			tableRow.push(<Cell key={coord} isLit={board[y][x]} flipCellsAround={() => flipCellsAround(coord)} />);
		}
		tableBody.push(
			<tr key={y} className="Board-Row">
				{tableRow}
			</tr>
		);
	}

	return (
		<div className="Board">
			<h1 className="Board-Title">Lights Out!</h1>
			<table className="Board-Game">
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	);

	// {board.map((row, y) => (
	//   <trow className="Board-Row">
	//     {row.map((val, x) => (
	//       <Cell flipCellsAround={() => flipCellsAround(`${y}-${x}`)} isLit={val} />
	//     ))}
	//   </trow>
	// ))}
	// make table board

	// TODO
}

export default Board;