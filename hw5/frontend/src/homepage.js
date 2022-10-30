import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const homepage = ({ start }) => {
  return (
    <div>
      <button onClick={() => start()}> start game </button>
    </div>
  );
};

export default homepage;
