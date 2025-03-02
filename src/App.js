import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [moves, setMoves] = useState([]);
  const MOVE_LIMIT = 5;

  const handleClick = (index) => {
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    const newMoves = [...moves, index];
    if (newMoves.length > MOVE_LIMIT) {
      const oldestMove = newMoves.shift();
      newBoard[oldestMove] = null;
    }

    setBoard(newBoard);
    setMoves(newMoves);
    setIsXNext(!isXNext);
  };

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setMoves([]);
    setIsXNext(true);
  };

  const winner = checkWinner();

  return (
    <div className="game">
      <h1>Tic-Tac-Toe <span>(Hard Mode)</span></h1>
      <p className={`status ${winner ? (winner === "X" ? "winner-x" : "winner-o") : (isXNext ? "next-x" : "next-o")}`}>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </p>

      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className={`cell ${winner && winner === cell ? "winner" : ""}`} 
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className="reset">Reset</button>
    </div>
  );
}

export default App;