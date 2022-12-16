import { useState, useEffect, createContext, useContext } from "react";
import {
  Message,
  MessageSend,
  StatusType,
  addChatBoxType,
  sendNewChatBoxType,
  chatBoxType,
  startChatType,
  returnChatBoxType,
} from "../../type";
import { message } from "antd";
import { useQuery, useMutation } from "@apollo/client";

import {
  CREATE_MESSAGE_MUTATION,
  CREATE_CHATBOX_MUTATION,
  CHATBOX_QUERY,
  MESSAGE_SUBSCRIPTION,
} from "../../graphql/index";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
// const client = new WebSocket("ws://localhost:4000");

type ContextType = {
  friend: string;
  setFriend: (s: string) => void;
  status: StatusType | undefined;
  me: string;
  setMe: (s: string) => void;
  chatBoxes: chatBoxType[];
  setChatBoxes: (c: chatBoxType[]) => void;
  signedIn: boolean;
  setSignedIn: (s: boolean) => void;
  sendMessage: (m: MessageSend) => void;
  addChatBox: (u: addChatBoxType) => void;
  clearMessages: () => void;
  displayStatus: (s: StatusType | undefined | string) => void;
  startChat: (s: startChatType) => returnChatBoxType;
};

type sentDataType = {
  task: string;
  payload?: Message | sendNewChatBoxType | MessageSend;
};

const makeName = (name: string, to: string) => {
  return [name, to].sort().join("_");
};

const ChatContext = createContext<ContextType>({
  friend: "",
  setFriend: (S: string) => {},
  status: undefined,
  me: "",
  chatBoxes: [],
  setChatBoxes: (c: chatBoxType[]) => {},
  setMe: (s: string) => {},
  signedIn: false,
  setSignedIn: (s: boolean) => {},

  sendMessage: (m: MessageSend) => {},
  addChatBox: (u: addChatBoxType) => {},
  clearMessages: () => {},
  displayStatus: (s: StatusType | undefined | string) => {},
  startChat: (s: startChatType) => {
    return { data: { createChatBox: { name: "", messages: [] } } };
  },
});
const ChatProvider = (props: any) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [chatBoxes, setChatBoxes] = useState<chatBoxType[]>([]);
  const [friend, setFriend] = useState<string>("");
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION as any);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION as any);
  // useEffect(() => {
  //   try {
  //     subscribeToMore({
  //       document: MESSAGE_SUBSCRIPTION as any,
  //       variables: { from: me, to: friend },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
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
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  const displayStatus = (s: StatusType | undefined) => {
    if (s?.msg) {
      const { type, msg } = s;
      const content = { content: msg, duration: 0.5 };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    } else {
      console.log("param of displayStatus is undefined");
    }
  };
  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        chatBoxes,
        friend,
        setFriend,
        setMe,
        setSignedIn,
        setChatBoxes,
        // sendMessage,
        // addChatBox,
        // clearMessages,
        displayStatus,
        startChat,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
