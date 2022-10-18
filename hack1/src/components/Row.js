/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const Row = ({ guess, rowIdx }) => {
  //let letters = guess.split("");
  return (
    <div className="Row-container">
      {/* TODO 3: Row Implementation -- Row */}

      {/* ↓ Default row, you should modify it. ↓ */}
      <div className="Row-wrapper ">
        <div
          className={`Row-wordbox ${
            guess !== undefined
              ? guess[0].color === "yellow"
                ? "yellow"
                : guess[0].color === "green"
                ? "green"
                : "grey"
              : ""
          }`}
          id={`${rowIdx}-0`}
          key={`${rowIdx}-0`}
        >
          {guess !== undefined ? guess[0].char : ""}
        </div>
        <div
          className={`Row-wordbox ${
            guess !== undefined
              ? guess[1].color === "yellow"
                ? "yellow "
                : guess[1].color === "green"
                ? "green "
                : "grey"
              : ""
          }`}
          id={`${rowIdx}-1`}
          key={`${rowIdx}-1`}
        >
          {guess !== undefined ? guess[1].char : ""}
        </div>
        <div
          className={`Row-wordbox ${
            guess !== undefined
              ? guess[2].color === "yellow"
                ? "yellow "
                : guess[2].color === "green"
                ? "green "
                : "grey"
              : ""
          }`}
          id={`${rowIdx}-2`}
          key={`${rowIdx}-2`}
        >
          {guess !== undefined ? guess[2].char : ""}
        </div>
        <div
          className={`Row-wordbox ${
            guess !== undefined
              ? guess[3].color === "yellow"
                ? "yellow "
                : guess[3].color === "green"
                ? "green "
                : "grey"
              : ""
          }`}
          id={`${rowIdx}-3`}
          key={`${rowIdx}-3`}
        >
          {guess !== undefined ? guess[3].char : ""}
        </div>
        <div
          className={`Row-wordbox ${
            guess !== undefined
              ? guess[4].color === "yellow"
                ? "yellow "
                : guess[4].color === "green"
                ? "green "
                : "grey"
              : ""
          }`}
          id={`${rowIdx}-4`}
          key={`${rowIdx}-4`}
        >
          {guess !== undefined ? guess[4].char : ""}
        </div>
      </div>
      {/* ↑ Default row, you should modify it. ↑ */}
    </div>
  );
};

export default Row;
