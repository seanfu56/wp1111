/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import "./css/Board.css";
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
  console.log(guesses);
  const board = [0, 1, 2, 3, 4, 5];
  return (
    <div className="Board-container">
      {board.map((ele, index) =>
        index !== turn ? (
          <Row id={`row_${index}`} key={`row_${index}`} guess={guesses[index]} rowIdx={index} />
        ) : (
          <CurRow id={`row_${index}`} key={`row_${index}`} curGuess={curGuess} rowIdx={index} />
        )
      )}
      {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
    </div>
  );
};
export default Board;
