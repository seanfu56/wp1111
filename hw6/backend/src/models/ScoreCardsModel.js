import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({ name: String, subject: String, score: Number });
const ScoreCardModel = mongoose.model("ScoreCards", ScoreCardSchema);
export { ScoreCardModel };
