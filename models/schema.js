const graphql = require('graphql');
const Users = require('./users');
const Categories = require('./category');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = graphql;
const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});
const Category = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    parentCategoryId: {
      type: GraphQLString,
    },
    subCategory : {
      type: Category,
      resolve(parent,args){
          return Categories.findById({id: parent.id})
      }
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
    categories: {
      type: new GraphQLList(User),
      resolve(parent, args) {
        return Categories.find();
      },
    },
    user: {
      type: User,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Users.findById(args.id);
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
    createCategory: {
      type: Category,
      args: {
        name: { type: GraphQLString },
        parentId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const category = new Categories({
          name: args.name,
          parentCategoryId: args.parentId,
        });
        return category.save();
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
