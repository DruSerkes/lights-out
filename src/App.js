import React from 'react';
import Board from './Board';
import Footer from './Footer';
import './App.css';

/** Simple app that just shows the LightsOut game. */

function App() {
	return (
		<div className="App">
			<Board />
			<Footer year={2020} />
		</div>
	);
}

export default App;
