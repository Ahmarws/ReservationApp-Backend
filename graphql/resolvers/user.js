const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const userResolvers = {
  // ----- QUERIES -----
  users: async () => {
    return await User.find().select("-password");
  },

  

  // ----- MUTATIONS -----
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
  login:async ({email,password}) => {
    const user= await User.findOne({email:email});
    if (!user) {
      throw new Error("User not exist");
      
    }
   const isEqual= await bcrypt.compare(password,user.password);
   if (!isEqual) {
    throw new Error("Wrong Password");
   }
   const token = jwt.sign({ userId: user.id,email:user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return {userId:user.id,token:token,tokenExpiration:1};
  }

};

module.exports = userResolvers;



