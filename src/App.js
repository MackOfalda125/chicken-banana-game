import React, { useState } from 'react';
import './App.css';

const CHICKEN_IMG = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const BANANA_IMG = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';

const gridSize = 6;
const totalCells = gridSize * gridSize;

// Helper to shuffle an array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a random grid with half chicken, half banana (equal number)
function generateRandomGrid() {
  const half = Math.floor(totalCells / 2);
  let types = Array(half).fill('chicken').concat(Array(half).fill('banana'));
  // If totalCells is odd, randomly add one more chicken or banana
  if (types.length < totalCells) {
    types.push(Math.random() < 0.5 ? 'chicken' : 'banana');
  }
  const shuffled = shuffle(types);
  return shuffled.map(type => ({ type, revealed: false }));
}

function App() {
  const [cells, setCells] = useState(generateRandomGrid());
  const [winner, setWinner] = useState(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [userChoice, setUserChoice] = useState(null); // 'chicken' or 'banana'

  const handleCellClick = (index) => {
    if (cells[index].revealed || winner || !userChoice) return;

    const newCells = [...cells];
    newCells[index].revealed = true;
    setCells(newCells);

    const newRevealedCount = revealedCount + 1;
    setRevealedCount(newRevealedCount);

    // If user clicks on the opposite type, they lose
    if (cells[index].type !== userChoice) {
      setWinner('You lost!');
      return;
    }

    // Optional: declare winner when all are revealed
    if (newRevealedCount === totalCells) {
      setWinner('All revealed!');
    }
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setWinner(null);
    setCells(generateRandomGrid());
    setRevealedCount(0);
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>
      <div className="character-select">
        <button
          className={`character-btn${userChoice === 'chicken' ? ' selected' : ''}`}
          onClick={() => handleChoice('chicken')}
        >
          🐔 Chicken
        </button>
        <button
          className={`character-btn${userChoice === 'banana' ? ' selected' : ''}`}
          onClick={() => handleChoice('banana')}
        >
          🍌 Banana
        </button>
      </div>
      <h2>
        {!userChoice
          ? 'Choose your character!'
          : winner
          ? winner
          : `You are: ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}`}
      </h2>
      <div className="grid">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`square${cell.revealed ? ' revealed' : ''}${cell.revealed && cell.type ? ` ${cell.type}` : ''}${cell.revealed || winner || !userChoice ? ' inactive' : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {cell.revealed ? (
              <img
                src={cell.type === 'chicken' ? CHICKEN_IMG : BANANA_IMG}
                alt={cell.type}
              />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
      {/* Restart Button */}
      <div className="restart-container">
        <button
          className="restart-btn"
          onClick={() => {
            setCells(generateRandomGrid());
            setWinner(null);
            setRevealedCount(0);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;