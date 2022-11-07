import { createContext, useContext, useState } from "react";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const QueryCardContext = createContext({
  qmessages: [],

  qaddCardMessage: () => {},
  qaddRegularMessage: () => {},
  qaddErrorMessage: () => {},
  qclearMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const QueryCardProvider = (props) => {
  const [qmessages, setQmessages] = useState([]);

  const qaddCardMessage = (message) => {
    setQmessages([...qmessages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const qaddRegularMessage = (...ms) => {
    console.log("query");
    setQmessages([...qmessages, ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR))]);
  };

  const qaddErrorMessage = (message) => {
    console.log("query");
    setQmessages([...qmessages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };
  const qclearMessage = (message) => {
    console.log(qmessages);
    setQmessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };

  return (
    <QueryCardContext.Provider
      value={{
        qmessages,
        qaddCardMessage,
        qaddRegularMessage,
        qaddErrorMessage,
        qclearMessage,
      }}
      {...props}
    />
  );
};

function useQueryCard() {
  return useContext(QueryCardContext);
}

export { QueryCardProvider, useQueryCard };
