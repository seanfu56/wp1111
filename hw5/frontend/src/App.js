import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Homepage from "./homepage";
import Gamepage from "./gamepage";
import { guess, startGame, restart, getNum } from "./axios";
import Finish from "./finish";
const $id = (element) => document.getElementById(element);
const $class = (element) => document.getElementsByClassName(element);
function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(1);
  const handleGuess = async () => {
    const response = await guess(number);
    if (response === "Equal") {
      setHasWon(true);
    } else {
      setStatus(response);
      setNumber("");
      $id("inputNum").value = "";
      $id("suggest").textContent = response;
      if (response === "Bigger") {
        setMin(number);
      } else {
        setMax(number);
      }
    }
  };
  const handleStart = async () => {
    console.log("start");
    setMax(100);
    setMin(1);
    setHasStarted(true);
    setHasWon(false);
    const msg = await startGame();
    console.log(msg);
    if (msg === "error") {
      alert("Server Error");
    }
  };
  return (
    <div className="App">
      {!hasStarted ? (
        <Homepage start={handleStart} />
      ) : hasWon ? (
        <Finish restart={handleStart} />
      ) : (
        <Gamepage
          handleGuess={handleGuess}
          setNumber={setNumber}
          restart={handleStart}
          max={max}
          min={min}
        />
      )}
    </div>
  );
}

export default App;
