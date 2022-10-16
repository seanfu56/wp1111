/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useCallback, useEffect, useState, useRef } from "react";
import "./css/Dashboard.css";

export default function Dashboard({ remainFlagNum, gameOver }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    if (gameOver === false) {
      console.log("gameover changed");
      setSTime(0);
    }
  }, [gameOver]);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
        console.log("change");
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      } else {
        setTime(0);
      }
    }, [delay]);
  };

  useInterval(
    () => {
      setTime(time + 1);
      setSTime(time + 1);
    },
    !gameOver ? 1000 : null
  );

  return (
    <div className="dashBoard">
      <div id="dashBoard_col1">
        <div className="dashBoard_col">
          <p className="icon">🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id="dashBoard_col2">
        <div className="dashBoard_col">
          <p className="icon">⏰</p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
