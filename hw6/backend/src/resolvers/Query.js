const Query = {
  getScoreCardsByName: async (parent, { name }, { ScoreCardModel }) => {
    try {
      const data = await ScoreCardModel.find({ name: name });
      return data;
    } catch (e) {
      console.log("getScoreCardsByName error: " + e.message);
    }
  },
  getScoreCardsBySubject: async (parent, { subject }, { ScoreCardModel }) => {
    try {
      const data = await ScoreCardModel.find({ subject: subject });
      return data;
    } catch (e) {
      console.log("getScoreCardsBySubject error: " + e.message);
    }
  },
};

export default Query;
