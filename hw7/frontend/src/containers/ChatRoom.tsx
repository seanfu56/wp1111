import styled from "styled-components";
import { Input, InputRef } from "antd";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import "../App.css";
import { Tabs } from "antd";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

type ChatRoomProps = {
  me: string;
};
const ChatRoom = ({ me }: ChatRoomProps) => {
  const {
    status,
    chatBoxes,
    friend,
    setFriend,
    sendMessage,
    displayStatus,
    addChatBox,
    setChatBoxes,
  } = useChat();
  const [body, setBody] = useState("");
  const bodyref = useRef<InputRef>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    displayStatus(status);
    console.log("status changed", status);
  }, [status, displayStatus]);

  const removeChatBox = (targetKey: string, friend: string) => {
    const index = chatBoxes.findIndex(({ key }) => key === friend);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return friend
      ? friend === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1].key
        : friend
      : "";
  };
  const createChatBox = (friend: string) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    } else {
      setChatBoxes([...chatBoxes, { label: friend, key: friend, children: <></>, messages: [] }]);
      console.log(chatBoxes.length);
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
          className="chatbox-wrapper"
          type="editable-card"
          onChange={(key) => {
            setFriend(key);
          }}
          activeKey={friend}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              setModalOpen(true);
            } else if (action === "remove") {
              setFriend(removeChatBox(targetKey as string, friend));
            }
          }}
          items={chatBoxes}
        ></ChatBoxesWrapper>
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
            sendMessage({ name: me, to: friend, body: msg });
            setBody("");
          }}
        ></Input.Search>
        <ChatModal
          open={modalOpen}
          onCreate={(name) => {
            setFriend(createChatBox(name));
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
