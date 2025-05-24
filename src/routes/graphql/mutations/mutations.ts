import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ProfileType } from "../queries/profile.js";
import { CreateProfileInputType } from "./profile.js";
import { createProfile } from "../resolvers/profile.js";



export const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createProfile: {
            type: ProfileType,
            args: {
                dto: {
                    type: new GraphQLNonNull(CreateProfileInputType),
                }
            },
            resolve: createProfile,
        }
    }
});
