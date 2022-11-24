import Message from "./models/message.js";
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

export default {
  initData: (ws) => {
    //console.log("initData");
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
    const [task, payload] = JSON.parse(data);

    console.log(task, payload);
    switch (task) {
      case "input": {
        const { name, body } = payload;
        // Save payload to DB
        const message = new Message({ name, body });
        try {
          await message.save();
          console.log("success save");
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        // Respond to client
        broadcastMessage(wss, ["output", [payload]], { type: "success", msg: "Message sent" });
        /*
        sendData(["output", [payload]], ws);
        sendStatus(
          {
            type: "success",
            msg: "Message sent.",
          },
          ws
        );
        */
        break;
      }
      case "clear": {
        Message.deleteMany({}, () => {
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
