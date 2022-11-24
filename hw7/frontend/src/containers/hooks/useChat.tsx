import { useState, useEffect, createContext, useContext, useRef } from "react";
import Message from "../../messageType";
import { message } from "antd";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const client = new WebSocket("ws://localhost:4000");
type StatusType = {
  type: string;
  msg: string;
};

type ContextType = {
  status: StatusType | undefined;
  me: string;
  setMe: (s: string) => void;
  signedIn: boolean;
  setSignedIn: (s: boolean) => void;
  messages: Message[];
  sendMessage: (m: Message) => void;
  clearMessages: () => void;
  displayStatus: (s: StatusType | undefined) => void;
};

const ChatContext = createContext<ContextType>({
  status: undefined,
  me: "",
  setMe: (s: string) => {},
  signedIn: false,
  setSignedIn: (s: boolean) => {},
  messages: [],
  sendMessage: (m: Message) => {},
  clearMessages: () => {},
  displayStatus: (s: StatusType | undefined) => {},
});
const ChatProvider = (props: any) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  // const client = new WebSocket("ws://localhost:4000");
  const sentData = async (data: [string, Message?]) => {
    await client.send(JSON.stringify(data));
  };
  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload]: [string, Message[]] = JSON.parse(data);
    switch (task) {
      case "init": {
        setMessages(payload);
        break;
      }
      case "output": {
        setMessages(() => [...messages, ...payload]);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      case "cleared": {
        setMessages([]);
        break;
      }
      default:
        break;
    }
  };
  const clearMessages = () => {
    sentData(["clear"]);
  };
  const sendMessage = (payload: Message) => {
    sentData(["input", payload]);
    /*
    const newMessage: Message[] = [...messages];
    newMessage.push(payload);
    setMessages(newMessage);
    setStatus({ type: "success", msg: "Message sent." });*/
    console.log(payload);
    //TODO : update messages and status
  };
  const displayStatus = (s: StatusType | undefined) => {
    //console.log(s);
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
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
