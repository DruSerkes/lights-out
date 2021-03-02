import * as React from 'react';
import { useState } from 'react';
import { Difficulty } from './Difficulty';
import { Board } from './Board';
import { Footer } from './Footer';
import './App.css';

/** Simple app that just shows the LightsOut game. */

export const App = () => {
	const [difficulty, setDifficulty] = useState(5);

	return (
		<div className="App">
			<h1 className="Board-Title">Lights Out!</h1>
			<Board ncols={difficulty} nrows={difficulty} />
			<Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
			<Footer />
		</div>
	);
};
