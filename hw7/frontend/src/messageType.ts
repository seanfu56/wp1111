type Message = {
  name: string;
  body: string;
};

type MessageSend = {
  name: string;
  to: string;
  body: string;
};

export type { Message, MessageSend };
