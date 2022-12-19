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
import { useMutation } from "@apollo/client";

import { CREATE_MESSAGE_MUTATION, CREATE_CHATBOX_MUTATION } from "../../graphql/index";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

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
        displayStatus,
        startChat,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
