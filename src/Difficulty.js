import * as React from 'react';
import './Difficulty.css';

export const Difficulty = ({ difficulty, setDifficulty }) => {
    const handleChange = (e) => setDifficulty(Number(e?.target?.value));
    return (
        <div className="Difficulty">
            <label htmlFor="difficulty">Choose Difficulty</label>
            <input
                type="range"
                id="difficulty"
                min={3}
                max={5}
                step={1}
                value={difficulty}
                onChange={handleChange}
            />
        </div>
    )
};