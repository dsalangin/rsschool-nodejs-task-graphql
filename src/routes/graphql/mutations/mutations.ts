import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ProfileType } from "../queries/profile.js";
import { CreateProfileInputType } from "./profile.js";
import { createProfile } from "../resolvers/profile.js";
import { PostType } from "../queries/post.js";
import { CreatePostInputType } from "./post.js";
import { createPost } from "../resolvers/post.js";



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
        },
        createPost: {
            type: PostType,
            args: {
                dto: {
                    type: new GraphQLNonNull(CreatePostInputType),
                }
            },
            resolve: createPost,
        }
    }
});
