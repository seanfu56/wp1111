import { makeName } from "../utils";
const Subscription = {
  message: {
    subscribe: async (parent, { user }, { pubsub }) => {
      console.log(user);
      return await pubsub.subscribe(`user ${user}`);
    },
  },
};

export { Subscription as default };
