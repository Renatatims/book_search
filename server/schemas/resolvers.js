//import User model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      return await User.findOne({ _id: User._id });
    },
  },
  Mutation: {
    // Create a User
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPw = await user.isCorrectPassword(password);

      const token = signToken(user);
      return { token, user };
    },
    // Save a book
    saveBook: async (parent, { bookInput }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: User._id },
        { $addToSet: { savedBooks: bookInput } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    //Delete a book
    removeBook: async (parent, { bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId} } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
