/****************************************************************************
  FileName      [ useWordle.js ]
  PackageName   [ src/components/hook ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file handles each action in the Wordle game. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useState } from "react";
const $id = (element) => document.getElementById(element);
let refguess = [];
for (let i = 0; i < 6; i += 1) {
  let r = [];
  for (let j = 0; j < 5; j += 1) {
    let ele = { char: "", color: "" };
    r.push(ele);
  }
  refguess.push(r);
}

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // An integer whose default is 0. 0 <= turn <= 5.
  const [usedChars, setUsedChars] = useState({}); // A dictionary object which store characters' color that showed on the keyboard. (Ex: {e: 'yellow', c:'grey'})
  const [curGuess, setCurGuess] = useState(""); // A string whose default is "". 0 <= curGuess.length <= 5.
  const [isCorrect, setIsCorrect] = useState(false); // A bool whose default is false. It will be set true only when curGuess === solution.
  const [guesses, setGuesses] = useState([...Array(6)]); // An array whose length is 6. (Ex: [[{char:'c', color:'grey'},{char:'o', color:'grey'},{char:'d', color:'grey'},{char:'e', color:'yellow'},{char:'s', color:'grey'}],[],[],[],[],[]])

  console.log(guesses);
  // You can use this function to print all the parameters you want to know.
  const printTest = () => {
    console.log("*-----------------------*");
    console.log("solution: ", solution);
    console.log("turn: ", turn);
    console.log("usedChars:", usedChars);
    console.log("curGuess: ", curGuess);
    console.log("isCorrect: ", isCorrect);
    console.log("guesses: ", guesses);
  };

  // Handle the actions of `Enter`
  const handleEnter = () => {
    // (1) Enter is invalid if turn > 5
    if (turn > 5) {
      console.log("Error: You have used all your guesses");
      return;
    }
    // (2) Enter is invalid if curGuess is not a 5-character string
    if (curGuess.length !== 5) {
      console.log("Error: Only ", curGuess.length, " characters are entered!");
      return;
    }
    // (3) Press Enter, store curGuess to guesses, reset curGuess and update parameters .

    // console.log("Press Enter!!!! Store and reset curGuess!");
    // TODO 4: Check each wordbox's color in `curGuess` and update `guess`, `turn` and `curGuess`

    // Hint: check green first, and then check yellow.
    let solset = Array(26);
    for (let x = 0; x < 26; x += 1) {
      solset[x] = 0;
    }
    console.log(solset);
    let refguess = guesses;
    let refused = usedChars;
    let newGuess = [];

    for (let k = 0; k < 5; k++) {
      let ele = { char: curGuess.split("")[k], color: "grey" };
      newGuess.push(ele);
    }

    /*
    for (var key in refused) {
    }*/

    for (let i = 0; i < 5; i += 1) {
      console.log(curGuess[i].charCodeAt() - 97);
      if (solution[i] !== curGuess[i]) {
        solset[solution[i].charCodeAt() - 97] += 1;
      } else {
        console.log("hahaha");
        newGuess[i].color = "green";
        refused[curGuess[i]] = "green";
      }
    }

    for (let i = 0; i < 5; i += 1) {
      if (solset[curGuess[i].charCodeAt() - 97] > 0 && solution[i] !== curGuess[i]) {
        solset[curGuess[i].charCodeAt() - 97] -= 1;
        console.log("number:" + solset[curGuess[i].charCodeAt() - 97]);
        newGuess[i].color = "yellow";
        refused[curGuess[i]] = "yellow";
      }
    }

    // add the formatted guess generated into guesses.

    refguess[turn] = newGuess;
    setGuesses(refguess);
    // turn += 1
    setTurn(turn + 1);
    // set curGuess to default
    setCurGuess("");
    setUsedChars(refused);
    // TODO 5: update parameters, check each char usage and show in `Keyboard` and reset `curGuess`.
    // 5-1) check if curGuess === solution, if true, set `isCorrect` to true.
    if (curGuess === solution) {
      setIsCorrect(true);
      console.log(true);
    }
    // 5-2) usedChars update
  };

  // Handle the action of `Backspace`
  const handleBackspace = () => {
    setCurGuess(curGuess.substring(0, curGuess.length - 1));
  };

  // Handle the action of pressing a character.
  const handleCharacter = (key) => {
    // If curGuess's length is longer than 5, do nothing
    if (curGuess.length < 5) {
      setCurGuess(curGuess + key);
    }
  };
  const handleKeyup = ({ key }) => {
    // console.log("You just press: ", key);
    if (key === "Enter") handleEnter();
    else if (key === "Backspace") handleBackspace();
    else if (/^[A-Za-z]$/.test(key)) handleCharacter(key);
  };
  return { turn, curGuess, guesses, isCorrect, usedChars, handleKeyup, printTest };
};

export default useWordle;
