import express from "express";
import { getNumber, genNumber } from "../core/getNumber";

const router = express.Router();
router.post("/api/start", (_, res) => {
  genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
  res.json({ msg: "The game has started." });
});
router.get("/api/guess", (req, res) => {
  const guessnumber = Number(req.query.number);
  const isNumber = !isNaN(req.query.number);
  if (!isNumber || guessnumber < 1 || guessnumber > 100) {
    res.status(406).send({ msg: "Not a legal number." });
  } else {
    if (guessnumber === getNumber()) {
      //res.end("bingo");
      res.status(200).send({ msg: "Equal" });
    } else {
      if (guessnumber > getNumber()) {
        res.status(200).send({ msg: "Smaller" });
      } else {
        res.status(200).send({ msg: "Bigger" });
      }
    }
    res.status(200).send();
  }
});
router.get("/api/number", (_, res) => {
  const number = getNumber();
  res.status(200).send({ msg: number });
});

router.post("/restart", (_, res) => {
  //
});
export default router;
