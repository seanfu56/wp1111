import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import db from "./db";
import cors from "cors";
import express from "express";
import router from "./routes/scoreCard";
import bodyParser from "body-parser";
import path from "path";

const app = express();

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(bodyParser.json());
db.connect();
const dbs = mongoose.connection;
dbs.on("error", (err) => console.log(err));
// dbs.once("open", async () => {
//   await db.deleteAllScoreCards();
// });

app.use("/api", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
