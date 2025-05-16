// graphql/resolvers.js

const bcrypt = require("bcryptjs");
const Group = require("../../models/group");
const User = require("../../models/user");
const Field = require("../../models/field");

const resolvers = {
  // ----- QUERIES -----
  groups: async () => {
    return await Group.find();
  },

  users: async () => {
    return await User.find().select("-password");
  },

  fields: async () => {
    return await Field.find();
  },

  // ----- MUTATIONS -----
  createGroup: async (args) => {
    const group = new Group({ name: args.groupInput.name });
    await group.save();
    return group;
  },

  UpdateGroup: async (args) => {
    const { id, groupInput } = args;
    return await Group.findByIdAndUpdate(id, { name: groupInput.name }, { new: true });
  },

  DeleteGroup: async (args) => {
    const { id } = args;
    await Group.findByIdAndDelete(id);
    return true;
  },

  createUser: async (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("Email already exists");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hash) => {
        const user = new User({
          email: args.userInput.email,
          name: args.userInput.name,
          password: hash,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },

  UpdateUser: async (args) => {
    const { id, userInput } = args;

    const updates = {
      name: userInput.name,
      email: userInput.email,
    };

    if (userInput.password) {
      const hash = await bcrypt.hash(userInput.password, 12);
      updates.password = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    return updatedUser;
  },

  DeleteUser: async (args) => {
    const { id } = args;
    await User.findByIdAndDelete(id);
    return true;
  },

  createField: async (args) => {
    const field = new Field({
      name: args.fieldInput.name,
      subFields: args.fieldInput.subFields,
      timeRanges: args.fieldInput.timeRanges,
    });

    await field.save();
    return field;
  },

  updateField: async (args) => {
    const { id, fieldInput } = args;

    const updatedField = await Field.findByIdAndUpdate(
      id,
      {
        name: fieldInput.name,
        subFields: fieldInput.subFields,
        timeRanges: fieldInput.timeRanges,
      },
      { new: true }
    );

    return updatedField;
  },

  deleteField: async (args) => {
    const { id } = args;
    await Field.findByIdAndDelete(id);
    return true;
  },
};

module.exports = resolvers;



