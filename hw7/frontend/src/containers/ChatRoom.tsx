import styled from "styled-components";
import { Button, Input, Tag, message, InputRef } from "antd";
import { useState, useRef, useEffect, Ref } from "react";
import React from "react";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../messageType";
import "../App.css";
import { Tabs } from "antd";
import ChatModal from "../components/ChatModal";
import MessageTem from "../components/Message";

type chatBoxType = {
  label: string;
  children: JSX.Element;
  key: string;
};

const ChatBoxesWrapper = styled(Tabs)`
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
type ChatRoomProps = {
  me: string;
};
const ChatRoom = ({ me }: ChatRoomProps) => {
  const { status, messages, sendMessage, clearMessages, displayStatus, addChatBox } = useChat();
  const [body, setBody] = useState("");
  const bodyref = useRef<InputRef>(null);
  const msgFooter = useRef<HTMLDivElement>(null);
  const [chatBoxes, setChatBoxes] = useState<chatBoxType[]>([]);
  const [activeKey, setActiveKey] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //const [msgSent, setMsgSent] = useState<boolean>(false);
  const renderChat = (chat: Message[]) => {
    const children: JSX.Element =
      chat.length === 0 ? (
        <p style={{ color: "#ccc" }}>No messages...</p>
      ) : (
        <div>
          {chat.map(({ name, body }, i) => {
            console.log(name);
            return (
              <div key={i}>
                <MessageTem isMe={name === me} message={body} />
              </div>
            );
          })}
        </div>
      );
    return children;
  };

  const extractChat = (friend: string) => {
    return renderChat(
      messages.filter((message) => {
        return (
          (message.to === friend && message.name === me) ||
          (message.to === me && message.name === friend)
        );
      })
    );
  };

  useEffect(() => {
    displayStatus(status);
    scrollToBottom();
    console.log("status changed", status);
  }, [status]);

  useEffect(() => {
    let refChatBox = [...chatBoxes];
    refChatBox.forEach((e) => (e.children = extractChat(activeKey)));
    setChatBoxes(refChatBox);
  }, [messages]);

  useEffect(() => {
    let refChatBox = [...chatBoxes];
    refChatBox.forEach((e) => (e.children = extractChat(activeKey)));
    setChatBoxes(refChatBox);
    console.log("activeKey changed");
  }, [activeKey]);

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  /*
  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);*/
  //TODO: connect to the backend
  const removeChatBox = (targetKey: string, activeKey: string) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1].key
        : activeKey
      : "";
  };
  //TODO: connect to the backend
  const createChatBox = (friend: string) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    } else {
      const chat = extractChat(friend);
      setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
      //setMsgSent(true);
      addChatBox({ me: me, to: friend });
      return friend;
    }
  };
  return (
    <>
      <Title name={me} />
      <>
        <ChatBoxesWrapper
          type="editable-card"
          onChange={(key) => {
            setActiveKey(key);
            extractChat(key);
          }}
          activeKey={activeKey}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              setModalOpen(true);
            } else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey as string, activeKey));
            }
          }}
          items={chatBoxes}
        >
          {/* {displayMessages(messages)} */}
          <FootRef ref={msgFooter} />
        </ChatBoxesWrapper>
        <Input.Search
          ref={bodyref as React.RefObject<InputRef>}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          enterButton="Send"
          placeholder="Type a message here..."
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter a username and a message body.",
              });
              return;
            }
            //TODO: change the receiver
            console.log(me, activeKey, msg);
            sendMessage({ name: me, to: activeKey, body: msg });
            setBody("");
          }}
        ></Input.Search>
        <ChatModal
          open={modalOpen}
          onCreate={(name) => {
            setActiveKey(createChatBox(name));
            extractChat(name);
            setModalOpen(false);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />
      </>
    </>
  );
};

export default ChatRoom;
