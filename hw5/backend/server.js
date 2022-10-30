import express from "express";
import cors from "cors";
import router from "./routes/guess";
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
app.get("/", function (req, res) {
  res.end("hello world?"); // change the path to your index.html
});
app.use("/", router);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
