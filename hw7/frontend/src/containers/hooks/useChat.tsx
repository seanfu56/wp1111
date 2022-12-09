import { useState, useEffect, createContext, useContext } from "react";
import { Message, MessageSend } from "../../messageType";
import { message } from "antd";
import TabPane from "../../components/TabPane";

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

type chatBoxType = {
  label: string;
  messages: Message[];
  key: string;
  children: JSX.Element;
};

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
});
const ChatProvider = (props: any) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [chatBoxes, setChatBoxes] = useState<chatBoxType[]>([]);
  const [friend, setFriend] = useState<string>("");
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
    const [task, payload]: [string, Array<Message>] = JSON.parse(data);
    switch (task) {
      case "output": {
        let index = -1;
        for (let i = 0; i < chatBoxes.length; i++) {
          if (chatBoxes[i].label === friend) {
            index = i;
          }
        }
        let chatBoxes_R = [...chatBoxes];
        const newMessage = [...chatBoxes[index].messages, ...payload];
        chatBoxes_R[index].messages = newMessage;
        chatBoxes_R[index].children = <TabPane message={newMessage} me={me} />;
        setChatBoxes(chatBoxes_R);
        break;
      }
      case "newchat": {
        let chatBoxes_R: chatBoxType[] = [...chatBoxes];
        chatBoxes_R = chatBoxes_R.slice(0, -1);
        let newChatBox: chatBoxType = chatBoxes[chatBoxes.length - 1];
        newChatBox.messages = [...payload];
        newChatBox.children = <TabPane message={payload} me={me} />;
        chatBoxes_R.push(newChatBox);
        setChatBoxes(chatBoxes_R);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      case "cleared": {
        break;
      }
      default:
        break;
    }
  };
  const clearMessages = () => {
    sentData({ task: "clear" });
  };

  const sendMessage = ({ name, to, body }: MessageSend) => {
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
