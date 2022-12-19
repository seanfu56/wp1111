import React, { useEffect } from "react";
import { Message } from "../type";
import MessageTem from "./Message";
import styled from "styled-components";
import { useRef } from "react";
const FootRef = styled.div`
  height: 0px;
`;

type TabPaneProps = {
  message: Message[];
  me: string;
};

const TabPane = ({ message, me }: TabPaneProps) => {
  const msgFooter = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message]);
  return message.length === 0 ? (
    <p style={{ color: "#ccc" }}>No messages...</p>
  ) : (
    <>
      <div style={{ overflowY: "auto", position: "relative", height: "30vh" }}>
        {message.map(({ sender, body }, i) => {
          return (
            <div key={i}>
              <MessageTem isMe={sender === me} message={body} />
            </div>
          );
        })}
        <FootRef className="footref" ref={msgFooter} />
      </div>
    </>
  );
};

export default TabPane;
