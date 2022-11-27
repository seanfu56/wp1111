import { UserModel, MessageModel, ChatBoxModel } from "./models/message.js";
const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};
const broadcastMessage = (wss, data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

const constructUsers = async (name) => {
  let exist = await UserModel.findOne({ name: name });
  if (!exist) {
    let user = new UserModel({ name });
    user.save();
    return user;
  }
};

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

const validateChatBox = async (name, participants) => {
  const name1 = participants[0];
  let user1 = await UserModel.findOne({ name: name1 });
  if (!user1) {
    console.log("construct a user1");
    user1 = await constructUsers(name1);
  }
  const name2 = participants[1];
  let user2 = await UserModel.findOne({ name: name2 });
  if (!user2) {
    console.log("construct a user2");
    user2 = await constructUsers(name2);
  }
  let box = await ChatBoxModel.findOne({ name: name });
  if (!box) {
    console.log("construct a new chatbox");
    box = await new ChatBoxModel({ name: name, users: [user1, user2] }).save();
  }
  //console.log(box);
  return box.populate(["users", { path: "messages", populate: ["sender", "receiver"] }]);
};

export default {
  initData: (ws) => {
    Message.find()
      .sort({ created_at: -1 })
      .limit(100)
      .exec((err, res) => {
        if (err) throw err;
        // initialize app with existing messages
        sendData(["init", res], ws);
      });
  },
  onMessage: (wss, ws) => async (byteString) => {
    const { data } = byteString;
    const { task, payload } = JSON.parse(data);
    switch (task) {
      //輸入新的訊息
      case "MESSAGE": {
        const { name, to, body } = payload;
        const chatboxname = makeName(to, name);
        const chatbox = await ChatBoxModel.findOne({ name: chatboxname });
        const sender = await UserModel.findOne({ name: name });
        const receiver = await UserModel.findOne({ name: to });
        const message = new MessageModel({
          chatBox: chatbox,
          sender: sender,
          receiver: receiver,
          body: body,
        });
        //console.log(message);
        try {
          await message.save();
          console.log("success save new message");
          const chatBox = await validateChatBox(chatboxname, [name, to]);
          const messages = [...chatBox.messages, message];
          await ChatBoxModel.updateOne({ name: chatboxname }, { $set: { messages: messages } });
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        broadcastMessage(wss, ["output", [payload]], { type: "success", msg: "Message sent" });
        break;
      }

      //開啟新的聊天室
      case "CHAT": {
        const { name, users } = payload;
        const validChatBox = await validateChatBox(name, users);
        try {
          console.log("success save validChatBox");
        } catch (e) {
          throw new Error("ChatBox DB save error: " + e);
        }
        let messagesReturn = [];
        validChatBox.messages.forEach((message) => {
          messagesReturn.push({
            name: message.sender.name,
            to: message.receiver.name,
            body: message.body,
          });
        });
        //console.log(messagesReturn);
        sendData(["output", messagesReturn], ws);
        sendStatus({ type: "success", msg: "Message sent" }, ws);
        break;
      }

      //清除聊天訊息
      case "CLEAR": {
        MessageModel.deleteMany({}, () => {
          broadcastMessage(wss, ["output"], { type: "info", msg: "Message cache cleared." });
          /*
          sendData(["cleared"], ws);
          sendStatus({ type: "info", msg: "Message cache cleared." }, ws);*/
        });
        break;
      }
      default:
        break;
    }
  },
};
