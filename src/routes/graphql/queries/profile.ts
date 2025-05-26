import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeType } from "./member-type.js";
import { Profile } from "@prisma/client";
import { ProfileLoader } from "../loaders/profile.js";

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        memberType: {
            type: new GraphQLNonNull(MemberTypeType),
            resolve: async (parent: Profile, args, { loaders }: { loaders: { profile: ProfileLoader } }) => {
                return loaders.profile.memberTypeByProfileId.load(parent.id);
            },
        },
    })
});

