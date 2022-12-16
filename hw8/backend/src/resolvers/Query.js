const Query = {
  chatbox: async (parent, { name }, { ChatBoxModel }) => {
    // console.log(ChatBoxModel);
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name }).save();
    return await box.populate("messages");
  },
};
export default Query;
