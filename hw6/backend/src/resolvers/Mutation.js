const Mutation = {
  newScoreCard: async (parent, { name, subject, score }, { ScoreCardModel }) => {
    console.log("newScoreCard");
    const existing = await ScoreCardModel.findOne({ name: name, subject: subject });
    try {
      if (existing) {
        await ScoreCardModel.updateOne({ name: name, subject: subject }, { set: { score: score } });
        return `Updating(${name},${subject},${score})`;
      } else {
        const newScore = new ScoreCardModel({ name, subject, score });
        newScore.save();
        return `Adding(${name},${subject},${score})`;
      }
    } catch (e) {
      console.log("scorecard creation error: " + e.message);
    }
  },

  deleteAllScoreCards: async (parent, {}, { ScoreCardModel }) => {
    try {
      await ScoreCardModel.deleteMany({});
      console.log("database cleared");
      return "database cleared";
    } catch (e) {
      console.log("deleteAllScoreCards error: " + e.message);
      return "database error";
    }
  },
};
export default Mutation;
