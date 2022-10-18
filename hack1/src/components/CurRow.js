/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const CurRow = ({ curGuess, rowIdx }) => {
  let letter = curGuess.split("");

  return (
    <div className="Row-container">
      {/* TODO 3: Row Implementation -- CurRow */}

      {/* ↓ Default row, you should modify it. ↓ */}
      <div className="Row-wrapper current">
        <div
          className={`Row-wordbox ${letter[0] ? "filled" : ""}`}
          id={`${rowIdx}-0`}
          key={`${rowIdx}-0`}
        >
          {letter[0]}
        </div>
        <div
          className={`Row-wordbox ${letter[1] ? "filled" : ""}`}
          id={`${rowIdx}-1`}
          key={`${rowIdx}-1`}
        >
          {letter[1]}
        </div>
        <div
          className={`Row-wordbox ${letter[2] ? "filled" : ""}`}
          id={`${rowIdx}-2`}
          key={`${rowIdx}-2`}
        >
          {letter[2]}
        </div>
        <div
          className={`Row-wordbox ${letter[3] ? "filled" : ""}`}
          id={`${rowIdx}-3`}
          key={`${rowIdx}-3`}
        >
          {letter[3]}
        </div>
        <div
          className={`Row-wordbox ${letter[4] ? "filled" : ""}`}
          id={`${rowIdx}-4`}
          key={`${rowIdx}-4`}
        >
          {letter[4]}
        </div>
      </div>
      {/* ↑ Default row, you should modify it. ↑ */}
    </div>
  );
};

export default CurRow;
