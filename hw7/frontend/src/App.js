import "./App.css";
import { Button, Input, Tag, message } from "antd";
import { useEffect, useState, useRef } from "react";
import React from "react";
import SignIn from "./containers/SignIn.tsx";
import ChatRoom from "./containers/ChatRoom.tsx";
import { useChat } from "./containers/hooks/useChat.tsx";
import { ChatProvider } from "./containers/hooks/useChat";
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
  const { signedIn } = useChat();
  return <Wrapper>{signedIn ? <ChatRoom /> : <SignIn />}</Wrapper>;
};

export default App;
