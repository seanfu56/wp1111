/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useState } from "react";
//import { props } from "cypress/types/bluebird";

const HomePage = ({
  startGameOnClick,
  mineNumOnChange,
  boardSizeOnChange,
  mineNum,
  boardSize /* -- something more... -- */,
}) => {
  const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const handleClick = () => {
    setShowPanel(!showPanel);
  };

  const handleMinesChange = (event) => {
    //炸彈數量改變
    mineNumOnChange(event.target.value);
    checkError(event.target.value, "mines");
  };
  const handleBoardChange = (event) => {
    //地圖大小改變
    boardSizeOnChange(event.target.value);
    checkError(event.target.value, "board");
  };
  const checkError = (num, mode) => {
    //偵測錯誤
    let m = mineNum;
    let b = boardSize;
    if (mode === "mines") {
      m = num;
    } else if (mode === "board") {
      b = num;
    }
    if (m > b * b) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const start = () => {
    //按下開始
    startGameOnClick();
    console.log("start");
  };
  /* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */

  return (
    <div className="HomeWrapper">
      <p className="title">MineSweeper</p>
      <button className="btn" onClick={start} disabled={error}>
        Start Game
      </button>
      <div className="controlContainer">
        <button className="btn" onClick={handleClick}>
          Difficulty Adjustment
        </button>
        {showPanel ? (
          <div className="controlWrapper">
            {error ? (
              <div className="error" style={{ color: "#880000" }}>
                ERROR: Mines number and board size are invalid
              </div>
            ) : null}
            <div className="controlPanel">
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input
                  type="range"
                  step="1"
                  min="10"
                  max="200"
                  defaultValue={mineNum}
                  onChange={handleMinesChange}
                ></input>
                <p className="controlNum" style={{ color: error ? "#880000" : "#0f0f4b" }}>
                  {mineNum}
                </p>
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size (n*n)</p>
                <input
                  type="range"
                  step="1"
                  min="8"
                  max="30"
                  defaultValue={boardSize}
                  onChange={handleBoardChange}
                ></input>
                <p className="controlNum" style={{ color: error ? "#880000" : "#0f0f4b" }}>
                  {boardSize}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* Basic TODO:  Implemen start button */}

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
    </div>
  );
};
export default HomePage;
