import { GraphQLObjectType } from 'graphql';
import { Test } from './test.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        testEndpoint: {
            type: Test,
            resolve: async () => {}
        }
    }
});