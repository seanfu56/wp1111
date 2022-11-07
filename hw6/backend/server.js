import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import db from "./db";
import cors from "cors";
import express from "express";
import router from "./routes/scoreCard";
import bodyParser from "body-parser";
const app = express();
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
dbs.once("open", async () => {
  await db.deleteAllScoreCards();
});

app.use("/", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
