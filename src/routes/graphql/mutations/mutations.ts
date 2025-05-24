import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ProfileType } from "../queries/profile.js";
import { ChangeProfileInputType, CreateProfileInputType } from "./profile.js";
import { changeProfile, createProfile } from "../resolvers/profile.js";
import { PostType } from "../queries/post.js";
import { CreatePostInputType } from "./post.js";
import { createPost } from "../resolvers/post.js";
import { CreateUserInputType } from "./user.js";
import { UserType } from "../queries/user.js";
import { createUser } from "../resolvers/user.js";
import { UUIDType } from "../types/uuid.js";



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
        },
        createUser: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: {
                dto: {
                    type: new GraphQLNonNull(CreateUserInputType),
                }
            },
            resolve: createUser,
        },
        changeProfile: {
            type: ProfileType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                },
                dto: {
                    type: new GraphQLNonNull(ChangeProfileInputType),
                }
            },
            resolve: changeProfile,
        },
    }
});
