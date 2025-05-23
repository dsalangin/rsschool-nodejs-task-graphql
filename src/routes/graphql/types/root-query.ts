import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberTypeIdEnum, MemberTypeType } from './member-type.js';
import { getMemberType, getMemberTypes } from '../resolvers/member-type.js';
import { getProfile, getProfiles } from '../resolvers/profile.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { Post } from './post.js';
import { getPosts, getPost } from '../resolvers/post.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        MemberTypes: {
            type: new GraphQLList(MemberTypeType),
            resolve: getMemberTypes
        },
        MemberType: {
            type: MemberTypeType,
            args: {
                id: {
                    type: new GraphQLNonNull(MemberTypeIdEnum)
                }
            },
            resolve: getMemberType,
        },
        Profiles: {
            type: new GraphQLList(ProfileType),
            resolve: getProfiles,
        },
        Profile: {
            type: ProfileType,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: getProfile,
        },
        Posts: {
            type: new GraphQLList(Post),
            resolve: getPosts,
        },
        Post: {
            type: Post,
            args: {
                id: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: getPost,
        }
    }
});