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

type addChatBoxType = {
  me: string;
  to: string;
};

type sendNewChatBoxType = {
  name: string;
  users: string[];
};

type ContextType = {
  status: StatusType | undefined;
  me: string;
  setMe: (s: string) => void;
  signedIn: boolean;
  setSignedIn: (s: boolean) => void;
  messages: Message[];
  sendMessage: (m: Message) => void;
  addChatBox: (u: addChatBoxType) => void;
  clearMessages: () => void;
  displayStatus: (s: StatusType | undefined | string) => void;
};

type sentDataType = {
  task: string;
  payload?: Message | sendNewChatBoxType;
};

const makeName = (name: string, to: string) => {
  return [name, to].sort().join("_");
};

const ChatContext = createContext<ContextType>({
  status: undefined,
  me: "",
  setMe: (s: string) => {},
  signedIn: false,
  setSignedIn: (s: boolean) => {},
  messages: [],
  sendMessage: (m: Message) => {},
  addChatBox: (u: addChatBoxType) => {},
  clearMessages: () => {},
  displayStatus: (s: StatusType | undefined | string) => {},
});
const ChatProvider = (props: any) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // const client = new WebSocket("ws://localhost:4000");
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);
  const sentData = async (data: sentDataType) => {
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
        console.log([...messages, ...payload]);
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
    sentData({ task: "clear" });
  };
  const sendMessage = ({ name, to, body }: Message) => {
    if (message || name || to) {
      sentData({ task: "MESSAGE", payload: { name, to, body } });
    }
  };

  const addChatBox = ({ me, to }: addChatBoxType) => {
    const name: string = makeName(me, to);
    if (me && to) {
      const payload: sendNewChatBoxType = {
        name: name,
        users: [me, to],
      };
      sentData({ task: "CHAT", payload: payload });
    }
  };

  const startChat = (name: string, to: string) => {
    sentData({ task: "chat" });
  };
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
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        addChatBox,
        clearMessages,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
