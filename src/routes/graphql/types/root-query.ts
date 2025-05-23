import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberTypeIdEnum, MemberTypeType } from './member-type.js';
import { getMemberType, getMemberTypes } from '../resolvers/member-type.js';
import { getProfile, getProfiles } from '../resolvers/profile.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { getPosts, getPost } from '../resolvers/post.js';
import { UserType } from './user.js';
import { getUser, getUsers } from '../resolvers/user.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        memberTypes: {
            type: new GraphQLList(MemberTypeType),
            resolve: getMemberTypes
        },
        memberType: {
            type: MemberTypeType,
            args: {
                id: {
                    type: new GraphQLNonNull(MemberTypeIdEnum)
                }
            },
            resolve: getMemberType,
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: getProfiles,
        },
        profile: {
            type: ProfileType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: getProfile,
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: getPosts,
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: getPost,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: getUsers,
        },
        user: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: getUser,
        }
    }
});
