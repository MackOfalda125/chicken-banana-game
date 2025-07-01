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

// Generate a random grid with half chicken, half banana
function generateRandomGrid() {
  const half = totalCells / 2;
  const types = Array(half).fill('chicken').concat(Array(half).fill('banana'));
  const shuffled = shuffle(types);
  return shuffled.map(type => ({ type, revealed: false }));
}

function App() {
  const [cells, setCells] = useState(generateRandomGrid());
  const [winner, setWinner] = useState(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleCellClick = (index) => {
    if (cells[index].revealed || winner) return;

    const newCells = [...cells];
    newCells[index].revealed = true;
    setCells(newCells);

    const newRevealedCount = revealedCount + 1;
    setRevealedCount(newRevealedCount);

    // Optional: declare winner when all are revealed
    if (newRevealedCount === totalCells) {
      setWinner('All revealed!');
    }
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>
      <h2>
        {winner ? winner : null}
      </h2>
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 60px)`,
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        {cells.map((cell, index) => (
          <div
            key={index}
            className="square"
            style={{
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              fontSize: 18,
              userSelect: 'none',
              position: 'relative',
              overflow: 'hidden',
              cursor: cell.revealed || winner ? 'default' : 'pointer',
              opacity: 1,
            }}
            onClick={() => handleCellClick(index)}
          >
            {cell.revealed ? (
              <img
                src={cell.type === 'chicken' ? CHICKEN_IMG : BANANA_IMG}
                alt={cell.type}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;