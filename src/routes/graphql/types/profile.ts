import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberTypeType } from "./member-type.js";
import { PrismaClient, Profile } from "@prisma/client";

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
            resolve: async (parent: Profile, args, { prisma }: { prisma: PrismaClient }) => {
                return prisma.memberType.findFirst({where: {
                    profiles: {
                        some: {
                            id: parent.id
                        }
                    }
                }});
            }
        },
    })
});

