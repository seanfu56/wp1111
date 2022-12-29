import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import db from "../db";
const router = Router();
router.delete("/cards", async (req, res) => {
  await db.deleteAllScoreCards();
  res.status(200).send({ message: "database cleared" });
});
router.post("/card", async (req, res) => {
  const name = req.body.name;
  const subject = req.body.subject;
  const score = req.body.score;
  const update = await db.newScoreCard(name, subject, score);
  res.status(200).send({
    message:
      update === 1
        ? `Updating(${name},${subject},${score})`
        : `Adding(${name},${subject},${score})`,
    card: 1,
  });
});
router.get("/cards", async (req, res) => {
  console.log("router get cards");
  const name = req.query.queryString;
  const type = req.query.type;
  let data;
  if (type === "name") {
    data = await db.getScoreCardsByName(name);
  } else {
    data = await db.getScoreCardsBySubject(name);
  }
  let messages = [];
  console.log("data=", data);
  data.forEach((ele, index) => {
    messages.push(`Found card with ${type}: (${ele.name}, ${ele.subject}, ${ele.score})`);
  });
  console.log(messages);
  res.status(200).send({ messages: messages, message: `${type} (${name}) not found!` });
});
export default router;
