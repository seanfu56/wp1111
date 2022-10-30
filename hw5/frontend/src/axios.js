import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/api" });
const startGame = async () => {
  try {
    const {
      data: { msg },
    } = await instance.post("/start");
    console.log("start");
    return msg;
  } catch (error) {
    console.log(error);
    console.log("error catched");
    return "error";
  }
};
const guess = async (number) => {
  try {
    const {
      data: { msg },
    } = await instance.get("/guess", { params: { number: number } });
    console.log(msg);
    return msg;
  } catch (error) {
    console.log(error.message);
    if (error.message === "Network Error") {
      console.log(error);
      console.log("error catched");
      alert("Network Error");
    } else {
      alert(`${number} is not a valid number.`);
    }
  }
};
const getNum = async () => {
  const {
    data: { msg },
  } = await instance.get("/number");
  return msg;
};
const restart = async () => {
  const {
    data: { msg },
  } = await instance.post("/start");
  console.log("restart");
  return msg;
};
export { startGame, guess, getNum, restart };
