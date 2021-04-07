const usersResolvers = require("./users");

module.exports = {
  Mutation: {
    ...usersResolvers.Mutation,
  },
  Query: {
    ...usersResolvers.Query,
  },
};
