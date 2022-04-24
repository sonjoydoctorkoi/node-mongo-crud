const graphql = require('graphql');
const Users = require('./users');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
} = graphql;
const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(User),
      resolve(parent, args) {
        return Users.find();
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUsers: {
      type: User,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = new Users({
          name: args.name,
          email: args.email,
        });
        return user.save();
      },
    },
    editUsers: {
      type: User,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Users.findByIdAndUpdate({
          _id: args.id,
          name: args.name,
          email: args.email,
        });
      },
    },
    deleteUsers: {
      type: User,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Users.findByIdAndDelete({
          _id: args.id,
        });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
