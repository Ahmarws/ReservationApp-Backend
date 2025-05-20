const Group = require("../../models/group");


const groupResolver = {
  // ----- QUERIES -----
  groups: async () => {
    return await Group.find();
  },

  // ----- MUTATIONS -----
  createGroup: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const group = new Group({ name: args.groupInput.name });
    await group.save();
    return group;
  },

  UpdateGroup: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id, groupInput } = args;
    return await Group.findByIdAndUpdate(id, { name: groupInput.name }, { new: true });
  },

  DeleteGroup: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id } = args;
    await Group.findByIdAndDelete(id);
    return true;
  },

 
};

module.exports = groupResolver;



