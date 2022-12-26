import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "./models/user";
import ScoreCard from "./models/ScoreCard";

dotenv.config();
export default {
  connect: () => {
    dotenv.config();
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  newScoreCard: async (name, subject, score) => {
    const existing = await ScoreCard.findOne({ name: name, subject: subject });
    try {
      if (existing) {
        await ScoreCard.updateOne({ name: name, subject: subject }, { $set: { score: score } });
        return 1;
      } else {
        const newScore = new ScoreCard({ name, subject, score });
        console.log(newScore);
        newScore.save();
        return 2;
      }
    } catch (e) {
      throw new Error("ScoreCard creation error");
    }
  },
  deleteAllScoreCards: async () => {
    try {
      await ScoreCard.deleteMany({});
      console.log("Database deleted");
    } catch (e) {
      throw new Error("Database deletion failed");
    }
  },
  getScoreCardsByName: async (name) => {
    try {
      const data = await ScoreCard.find({ name: name });
      return data;
    } catch (e) {
      throw new Error("Get scoreCards failed");
    }
  },
  getScoreCardsBySubject: async (subject) => {
    try {
      const data = await ScoreCard.find({ subject: subject });
      return data;
    } catch (e) {
      throw new Error("Get scoreCards failed");
    }
  },
};
