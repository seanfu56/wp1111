import React, { useEffect, useState } from "react";
import { getNum } from "./axios";
const Finish = ({ restart }) => {
  const [number, setNumber] = useState(0);
  const getnumber = async () => {
    const newNum = await getNum();
    console.log(getNum());
    setNumber(newNum);
  };
  useEffect(() => {
    getnumber();
  }, []);
  return (
    <div>
      <p>{`You won!!! The answer is ${number}`}</p>
      <button onClick={() => restart()}>restart</button>
    </div>
  );
};

export default Finish;
