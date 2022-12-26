const Query = {
  chatbox: async (parent, { name }, { ChatBoxModel }) => {
    // console.log(ChatBoxModel);
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name }).save();
    return await { message: { name: name, message: { sender: "", body: "" } } };
  },
};
export default Query;
