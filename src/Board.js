import * as React from 'react';
import { useState } from 'react';
import { Cell } from './Cell';
import { Winner } from './Winner';
import { createBoard, hasWon } from './Helpers';
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

export const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.4 }) => {
	const [board, setBoard] = useState(() => createBoard(nrows, ncols, chanceLightStartsOn));

	const flipCellsAround = (coord) => {
		setBoard((oldBoard) => {
			const [y, x] = coord.split('-').map(Number);

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
	};

	/**
	 * Reset the game 
	 */
	const resetGame = () => setBoard(createBoard(nrows, ncols, chanceLightStartsOn));

	let tableBody = [];
	for (let y = 0; y < nrows; y++) {
		let tableRow = [];
		for (let x = 0; x < ncols; x++) {
			let coord = `${y}-${x}`;
			let isLit = board[y][x];
			tableRow.push(<Cell key={coord} isLit={isLit} flipCellsAround={() => flipCellsAround(coord)} />);
		}
		tableBody.push(
			<tr key={y} className="Board-Row">
				{tableRow}
			</tr>
		);
	};

	return (
		hasWon(nrows, ncols, board)
			? <Winner resetGame={resetGame} />
			: <div className="Board">

				<p className="Board-Directions">
					<em>
						Turn off all the lights!
					<br />
					Clicking a button will toggle the lights above, below, left, and
					right.
					</em>
				</p>

				<table className="Board-Game">
					<tbody>{tableBody}</tbody>
				</table>

				<button className="Board-Reset " onClick={resetGame}>
					Reset
				</button>
			</div>
	);
};
