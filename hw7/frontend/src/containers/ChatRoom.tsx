import styled from "styled-components";
import { Button, Input, Tag, message, InputRef } from "antd";
import { useState, useRef, useEffect, Ref } from "react";
import React from "react";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../messageType";
import "../App.css";

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 0px;
`;

const StyledMessage = styled.div`
  margin: 5px;
`;

type ChatRoomProps = {
  me: string;
};
const ChatRoom = ({ me }: ChatRoomProps) => {
  const { status, messages, sendMessage, clearMessages, displayStatus } = useChat();
  const [userName, setUserName] = useState("");
  const [body, setBody] = useState("");
  const bodyref = useRef<InputRef>(null);
  const msgFooter = useRef<HTMLDivElement>(null);
  const chatBoxes = useState<string[]>([]);
  //const [msgSent, setMsgSent] = useState<boolean>(false);

  useEffect(() => {
    displayStatus(status);
    scrollToBottom();
    console.log("status changed", status);
  }, [status]);

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  /*
  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);*/

  const displayMessages = (messages: Message[]) => {
    return messages.length === 0 ? (
      <p style={{ color: "#ccc" }}>No messages...</p>
    ) : (
      messages.map(({ name, body }, i) => (
        <StyledMessage key={i}>
          <Tag color="blue">{name}</Tag>
          {body}
        </StyledMessage>
      ))
    );
  };
  return (
    <>
      <Title name={userName} />
      <ChatBoxesWrapper>
        {displayMessages(messages)}
        <FootRef ref={msgFooter} />
      </ChatBoxesWrapper>
      <Input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (bodyref.current !== null && typeof bodyref.current !== null)
              bodyref.current.focus();
          }
        }}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        ref={bodyref as React.RefObject<InputRef>}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !userName) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          }
          sendMessage({ name: userName, body: msg });
          setBody("");
        }}
      ></Input.Search>
    </>
  );
};

/*
<ChatBoxesWrapper>
 {displayMessages()}
 <FootRef ref={msgFooter} />
 </ChatBoxesWrapper>
*/

export default ChatRoom;
