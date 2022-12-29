const {User} = require('../models');

const resolvers = {
    Query: {
        me: async () => {
            return await User.findOne({_id: User._id});
        },

    },
     Mutation: {
            createUser: async (parent, args) => {
                return await User.create(args);
            }
            //login
    },
    //saveBook
    //deleteBook
        
 }

 module.exports = resolvers;