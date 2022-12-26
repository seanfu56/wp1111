type Message = {
  sender: string;
  body: string;
};

type MessageSend = {
  name: string;
  to: string;
  body: string;
};

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

type startChatType = {
  variables: {
    name1: string;
    name2: string;
  };
};

type returnChatBoxType = {
  data: {
    createChatBox: {
      name: string;
      messages: Message[];
    };
  };
};

export type {
  Message,
  MessageSend,
  StatusType,
  addChatBoxType,
  sendNewChatBoxType,
  chatBoxType,
  startChatType,
  returnChatBoxType,
};
