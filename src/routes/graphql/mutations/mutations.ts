import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "../queries/profile.js";
import { ChangeProfileInputType, CreateProfileInputType } from "./profile.js";
import { changeProfile, createProfile, deleteProfile } from "../resolvers/profile.js";
import { PostType } from "../queries/post.js";
import { ChangePostInputType, CreatePostInputType } from "./post.js";
import { changePost, createPost, deletePost } from "../resolvers/post.js";
import { ChangeUserInputType, CreateUserInputType } from "./user.js";
import { UserType } from "../queries/user.js";
import { changeUser, createUser, deleteUser } from "../resolvers/user.js";
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
        changePost: {
            type: PostType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                },
                dto: {
                    type: new GraphQLNonNull(ChangePostInputType),
                }
            },
            resolve: changePost,
        },
        changeUser: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                },
                dto: {
                    type: new GraphQLNonNull(ChangeUserInputType),
                }
            },
            resolve: changeUser,
        },
        deleteProfile: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                }
            },
            resolve: deleteProfile,
        },
        deletePost: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                }
            },
            resolve: deletePost,
        },
        deleteUser: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType),
                }
            },
            resolve: deleteUser,
        },
    }
});
