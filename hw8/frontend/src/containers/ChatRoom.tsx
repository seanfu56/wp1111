import styled from "styled-components";
import { Input, InputRef } from "antd";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import "../App.css";
import { Tabs } from "antd";
import ChatModal from "../components/ChatModal";
import { CREATE_MESSAGE_MUTATION, CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql/index";
import {
  Message,
  MessageSend,
  StatusType,
  addChatBoxType,
  sendNewChatBoxType,
  chatBoxType,
  startChatType,
  returnChatBoxType,
} from "../type";
import TabPane from "../components/TabPane";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: hidden;
`;

const makeName = (name: string, to: string) => {
  return [name, to].sort().join("_");
};

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
    startChat,
  } = useChat();
  const [body, setBody] = useState("");
  const bodyref = useRef<InputRef>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addPost] = useMutation(CREATE_MESSAGE_MUTATION as any);
  // const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY as any);
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { user: me },
  });
  const initialChatBox = async (friend: string) => {
    const newChatBoxData: returnChatBoxType = await startChat({
      variables: { name1: me, name2: friend },
    });
    const newChatBox: chatBoxType = {
      label: friend,
      key: friend,
      messages: newChatBoxData.data.createChatBox.messages,
      children: <TabPane message={newChatBoxData.data.createChatBox.messages} me={me} />,
    };
    console.log(newChatBoxData.data.createChatBox.messages);
    let newChatBoxes = [...chatBoxes, newChatBox];
    setChatBoxes(newChatBoxes);
  };
  useEffect(() => {
    console.log(data?.message);
    if (data !== undefined) {
      const index = chatBoxes.findIndex((e) => makeName(e.label, me) === data.message.name);
      let newChatBoxes: chatBoxType[] = [...chatBoxes];
      let newChatBox: chatBoxType = newChatBoxes[index];
      newChatBox.messages = [...newChatBox.messages, data?.message.message];
      newChatBox.children = <TabPane message={newChatBox.messages} me={me} />;
      newChatBoxes[index] = newChatBox;
      setChatBoxes(newChatBoxes);
    }
  }, [data]);
  const handleSubscription = (chatBoxName: string) => {};
  // useEffect(() => {
  //   console.log("subscribe");
  //   try {
  //     subscribeToMore({
  //       document: MESSAGE_SUBSCRIPTION,
  //       variables: { from: me, to: friend },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         console.log(subscriptionData);
  //         const newMessage = subscriptionData.data.message.message;
  //         return {
  //           chatBox: {
  //             messages: [...prev.chatBox.messages, newMessage],
  //           },
  //         };
  //       },
  //     });
  //   } catch (e) {}
  // }, [subscribeToMore]);

  const handleFormSubmit = useCallback(() => {
    console.log("handleFormSubmit");
    addPost({
      variables: {
        name: me,
        to: friend,
        body: body,
      },
    });
  }, [addPost, body, friend, me]);
  useEffect(() => {
    displayStatus(status);
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
      //setMsgSent(true);
      // addChatBox({ me: me, to: friend });
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
            //sendMessage({ name: me, to: friend, body: msg });
            handleFormSubmit();
            // handleSendMessage();
            setBody("");
          }}
        ></Input.Search>
        <ChatModal
          open={modalOpen}
          onCreate={(name) => {
            setFriend(createChatBox(name));
            setModalOpen(false);
            initialChatBox(name);
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
