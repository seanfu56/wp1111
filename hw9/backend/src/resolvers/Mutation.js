import { v4 as uuidv4 } from "uuid";
import { makeName } from "../utils";

const Mutation = {
  createChatBox: async (parent, { name1, name2 }, { ChatBoxModel, MessageModel, pubsub }) => {
    const name = makeName(name1, name2);
    console.log(name);
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name }).save();
    return await box.populate("messages");
  },
  createMessage: async (parent, { name, to, body }, { ChatBoxModel, MessageModel, pubsub }) => {
    const chatBoxName = makeName(name, to);
    console.log(chatBoxName);
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    const newMsg = { sender: name, body };
    const newMsgId = await new MessageModel(newMsg).save();
    console.log(chatBox);
    chatBox.messages.push(newMsgId);
    await chatBox.save();
    pubsub.publish(`user ${name}`, {
      message: { name: chatBoxName, message: newMsg },
    });
    pubsub.publish(`user ${to}`, { message: { name: chatBoxName, message: newMsg } });
  },
};
export { Mutation as default };
