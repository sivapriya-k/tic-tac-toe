import {useEffect, useRef, useState} from "react";
import './Game.css';

const initBoard = (size) => {
    const board = [];
    for(let i=0; i<size;i++) {
        board[i] = [];
        for(let j=0; j<size; j++) {
            board[i][j] = null;
        }
    }
    return board;
}
export const Game = ({ size, marks}) => {
    const [board, setBoard] = useState(initBoard(size));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const position = useRef({i: null, j: null});
    const [gameOver, setGameOver] = useState(false);
    console.log(board);

    const playGame = (i, j) => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O': 'X');
        const updatedBoard = [...board];
        updatedBoard[i][j] = currentPlayer === 'X' ? 'O': 'X'
        position.current.i = i;
        position.current.j = j;
        setBoard(updatedBoard);
    }

    const checkWin = (i, j) => {
        const directions = [
            [1,0],
            [0,1],
            [1,1],
            [-1,1]
        ];

        for(const[x,y] of directions) {
            let count = 1;
            count+= checkCount(i, j, x,y);
            count+= checkCount(i, j, -x, -y);

            console.log('count after move', count);
            if(count === marks) {
                setGameOver(true);
                return;
            }
        }
    }

    const checkCount = (row, col, dx, dy) => {
        let count = 0;
        const player = board[row][col];

        console.log('dx,dy', dx, dy);
        while (true) {
            row += dx;
            col += dy;

            console.log('row', row)
            console.log('col', col)
            if (row < 0 || row >= size || col < 0 || col >= size || board[row][col] !== player) {
                break;
            }

            count++;
        }

        return count;
    };

    useEffect(() => {
        if(position.current.i !== null && position.current.j !== null) checkWin(position.current.i, position.current.j)
    }, [board])

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <span aria-live="polite">{`${currentPlayer}'s turn`}</span>
            <span>{`game over: ${gameOver}`}</span>
            <div className="game-board"
                 style={{gridTemplateColumns: `repeat(${size}, 1fr)` }}
            >
                { board.map((row, rowIndex)=> {
                    return row.map((cell, cellIndex) => {
                        return (
                            <button
                                aria-label={`Marked as ${cell}`}
                                onClick={() => playGame(rowIndex, cellIndex)}
                                className="game-board-cell">
                                {cell}
                            </button>)
                    })
                })}
            </div>
        </div>
    )
}