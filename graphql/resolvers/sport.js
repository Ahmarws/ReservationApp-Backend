const Sport = require("../../models/sport");


const sportResolver = {
  // ----- QUERIES -----
  sports: async () => {
    return await Sport.find();
  },

  // ----- MUTATIONS -----
  createSport: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const sport = new Sport({ name: args.sportInput.name });
    await sport.save();
    return sport;
  },

  UpdateSport: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id, sportInput } = args;
    return await Sport.findByIdAndUpdate(id, { name: sportInput.name }, { new: true });
  },

  DeleteSport: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id } = args;
    await Sport.findByIdAndDelete(id);
    return true;
  },

 
};

module.exports = sportResolver;



