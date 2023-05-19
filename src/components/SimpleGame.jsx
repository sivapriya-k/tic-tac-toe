import {useEffect, useRef, useState} from "react";
import './Game.css';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
export const SimpleGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const currentIndex = useRef(-1);
    const [isWon, setIsWon] = useState(false);

    const playGame = (index) => {
        const newBoard = [...board];
        newBoard[index] = currentPlayer === 'x' ? 'o': 'x';
        currentIndex.current = index;

        setCurrentPlayer((prev) => prev === 'x' ? 'o': 'x' );
        setBoard(newBoard);
    }

    const resetBoard = () => {
        const newBoard = Array(9).fill(null);
        setBoard(newBoard);
        setGameOver(false);
        setIsWon(false);
        setCurrentPlayer(null);
    }

    const isBoardFull = () => {
        return board.filter(cell => cell === null).length === 0;
    }

    const checkWinner = () => {
        const checkForWinnerCombinations = winningCombinations.filter(combination => combination.includes(currentIndex.current));

        for(let combination of checkForWinnerCombinations) {
            const [x, y, z] = combination;
            if(board[x]!== null && board[x] === board[y] && board[y] === board[z])
                return true;
        }
        return false;
    }

    useEffect(() => {
        if(checkWinner()) {
            setIsWon(true);
        }

        if(isBoardFull()) {
            setGameOver(true);
        }
    }, [board])

    return (
        <div className="game">
            {!gameOver && !isWon && <span aria-live="polite">{`${currentPlayer && currentPlayer === 'x' ? 'o': 'x'}'s turn`}</span>}
            {isWon && <span aria-live="polite">{`${currentPlayer} Won!!!`}</span>}
            <div className="game-board" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {board.map((cell, index) => (
                    <button
                        key={index}
                        aria-label={`Marked as ${cell}`}
                        className="game-board-cell"
                        disabled={isWon || gameOver} onClick={() => playGame(index)}>
                        {cell}
                    </button>
                ))}
            </div>
            <button onClick={resetBoard}>Reset</button>
        </div>
    )
}