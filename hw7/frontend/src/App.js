import "./App.css";
import React from "react";
import SignIn from "./containers/SignIn.tsx";
import ChatRoom from "./containers/ChatRoom.tsx";
import { useChat } from "./containers/hooks/useChat.tsx";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const App = () => {
  const { me, signedIn } = useChat();
  return <Wrapper>{signedIn ? <ChatRoom me={me} /> : <SignIn />}</Wrapper>;
};

export default App;
