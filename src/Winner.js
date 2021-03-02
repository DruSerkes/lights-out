import * as React from 'react';

export const Winner = ({ resetGame }) => {
    const handleClick = () => resetGame();
    return (
        <div className="Board">
            <h2 className="Board-Win">YOU WON!!</h2>
            <button className="Board-Reset " onClick={handleClick}>
                Reset
            </button>
        </div>
    );
}