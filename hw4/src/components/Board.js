/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useState } from "react";

const Board = ({ boardSize, mineNum, backToHome }) => {
  const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
  const [nonMineCount, setNonMineCount] = useState(boardSize * boardSize - mineNum); // An integer variable to store the number of cells whose value are not '💣'.
  const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
  const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
  const [remainFlagNum, setRemainFlagNum] = useState(mineNum); // An integer variable to store the number of remain flags.
  const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

  useEffect(() => {
    // Calling the function
    freshBoard();
  }, []);

  // Creating a board
  const freshBoard = () => {
    const newBoard = createBoard(boardSize, mineNum);
    setBoard(newBoard.board);
    setMineLocations(newBoard.mineLocations);
    setNonMineCount(boardSize * boardSize - mineNum);
    setRemainFlagNum(mineNum);
    // Basic TODO: Use `newBoard` created above to set the `Board`.
    // Hint: Read the definition of those Hook useState functions and make good use of them.
  };

  const restartGame = () => {
    freshBoard();
    setGameOver(false);
    setWin(false);
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    // To not have a dropdown on right click
    e.preventDefault();
    // Deep copy of a state
    let newBoard = JSON.parse(JSON.stringify(board));
    let newFlagNum = remainFlagNum;
    if ((remainFlagNum === 0 && !board[x][y].flagged) || board[x][y].revealed) {
      return;
    }
    if (board[x][y].flagged) {
      newBoard[x][y].flagged = false;
      newFlagNum += 1;
    } else {
      newBoard[x][y].flagged = true;
      newFlagNum -= 1;
    }
    setBoard(newBoard);
    setRemainFlagNum(newFlagNum);
    // Basic TODO: Right Click to add a flag on board[x][y]
    // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
    // Update board and remainFlagNum in the end
  };

  const revealCell = (x, y) => {
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return;
    if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
    let newBoard = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = { num: nonMineCount };
    /*
    flagged: false
    revealed: false
    value: 2
    x: 7
    y: 7*/
    if (board[x][y].value === "💣") {
      console.log("gameover");
      setGameOver(true);
      return;
    }

    newBoard[x][y].revealed = true;
    newNonMinesCount.num -= 1;

    if (board[x][y].value === 0) {
      revealSmartCell(x, y - 1, newBoard, newNonMinesCount);
      revealSmartCell(x - 1, y, newBoard, newNonMinesCount);
      revealSmartCell(x + 1, y, newBoard, newNonMinesCount);
      revealSmartCell(x, y + 1, newBoard, newNonMinesCount);
    }

    setBoard(newBoard);
    setNonMineCount(newNonMinesCount.num);

    if (nonMineCount === 1) {
      setWin(true);
      setGameOver(true);
      return;
    }
  };

  const revealSmartCell = (x, y, newBoard, newNonMinesCount) => {
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return;
    if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
    if (newBoard[x][y].revealed === true) return;

    if (board[x][y].value !== "💣") {
      newBoard[x][y].revealed = true;
      console.log(newNonMinesCount);
      newNonMinesCount.num -= 1;
    }

    if (board[x][y].value === 0) {
      revealSmartCell(x, y - 1, newBoard, newNonMinesCount);
      revealSmartCell(x - 1, y, newBoard, newNonMinesCount);
      revealSmartCell(x + 1, y, newBoard, newNonMinesCount);
      revealSmartCell(x, y + 1, newBoard, newNonMinesCount);
    }
  };

  const print = () => {
    board.map((row, index) => {
      row.map((ele, i) => {
        console.log(ele);
      });
    });
  };

  return (
    <div className="boardPage">
      <div className="boardWrapper">
        <div className="boardContainer">
          <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
          {board.map((row, rowIndex) => (
            <div id={"row" + rowIndex} style={{ display: "flex" }}>
              {row.map((ele, index) => (
                <Cell
                  rowIdx={rowIndex}
                  colIdx={index}
                  detail={ele}
                  updateFlag={updateFlag}
                  revealCell={revealCell}
                />
              ))}
            </div>
          ))}
        </div>
        {/*<button onClick={print}></button>*/}
        {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
        {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
      </div>
      {gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : null}
    </div>
  );
};

export default Board;
