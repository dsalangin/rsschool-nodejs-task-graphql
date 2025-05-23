import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberTypeIdEnum, MemberTypeType } from './member-type.js';
import { getMemberType, getMemberTypes } from '../resolvers/member-type.js';
import { getProfile, getProfiles } from '../resolvers/profile.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';

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
                    type: MemberTypeIdEnum
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
                    type: UUIDType
                }
            },
            resolve: getProfile,
        },
    }
});