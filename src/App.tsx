import { useState } from "react";
import "./index.css";

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Player = "X" | "O";
type Cell = Player | null;

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>("X");

  const winner: Player | null = checkWinner(board);
  const isDraw: boolean = !winner && board.every(Boolean);

  function checkWinner(board: Cell[]): Player | null {
    for (const [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleClick(index: number): string | null | void {
    if (board[index] || winner || isDraw) return;

    const updatedBoard: Cell[] = [...board];
    updatedBoard[index] = player;

    setBoard(updatedBoard);
    setPlayer(player === "X" ? "O" : "X");
  }

  function handleReset(): void {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  }

  return (
    <main className="h-dvh w-dvw flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-gray-300 mb-2 font-bold">Tic-tac-toe</h1>
      <p className="text-2xl text-gray-300">
        {winner
          ? `${winner} is the winner`
          : isDraw
            ? "This is a draw"
            : `${player}'s turn`}
      </p>
      <div className="h-3/5 w-2/7 rounded-xl grid grid-cols-3 gap-3 p-3">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="bg-[#2a2a2a] rounded-xl text-gray-300 hover:border-gray-600 cursor-pointer aspect-square"
          >
            {value}
          </button>
        ))}
      </div>
      <button
        className="text-gray-300 bg-blue-700 px-4 py-2 rounded-xl hover:cursor-pointer"
        onClick={handleReset}
      >
        Reset
      </button>
    </main>
  );
}

export default App;
