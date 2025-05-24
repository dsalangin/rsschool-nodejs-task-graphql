import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { RootQueryType } from './queries/root-query.js';
import { Mutations } from './mutations/mutations.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errors = validate(
        schema,
        parse(req.body.query),
        [depthLimit(5)]
      );

      if (errors.length > 0) {
        return { errors };
      }

      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma },
      });
    },
  });
};

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});

export default plugin;
