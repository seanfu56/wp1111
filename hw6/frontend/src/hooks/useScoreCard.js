import { createContext, useContext, useState } from "react";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearMessage: () => {},
});

const makeMessage = (message, color, property) => {
  return { message, color, property };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (property, message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR, property)]);
  };

  const addRegularMessage = (property, ...ms) => {
    console.log(property);
    setMessages([...messages, ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR, property))]);
  };

  const addErrorMessage = (property, message) => {
    console.log("error");
    console.log(messages);
    console.log(message);
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR, property)]);
  };
  const clearMessage = (message) => {
    console.log(messages);
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR, "add")]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
