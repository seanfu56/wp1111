import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const gamepage = ({ handleGuess, setNumber, restart, min, max }) => {
  return (
    <>
      <p>{`Guess a number between ${min} to ${max}`}</p>
      <input
        id="inputNum"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      ></input>
      <button // Send number to backend
        onClick={handleGuess}
        //disabled={!number}
      >
        guess!
      </button>

      <p id="suggest"></p>
    </>
  );
};

export default gamepage;
