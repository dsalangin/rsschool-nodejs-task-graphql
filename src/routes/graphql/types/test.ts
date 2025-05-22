import { GraphQLObjectType, GraphQLString } from "graphql";

export const Test = new GraphQLObjectType({
    name: 'testEndpoint',
    fields: {
        testField: {
            type: GraphQLString,
            resolve: async() => 'testFieldAnswer'
        }
    }
});