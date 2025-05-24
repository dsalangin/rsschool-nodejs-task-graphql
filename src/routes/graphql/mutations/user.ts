import { GraphQLNonNull, GraphQLInputObjectType, GraphQLString, GraphQLFloat } from 'graphql';

export const CreateUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    },
});
