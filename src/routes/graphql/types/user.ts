import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PrismaClient, User } from "@prisma/client";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        profile: {
            type: ProfileType,
            resolve: async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
                return await prisma.profile.findFirst({
                    where: {
                        userId: parent.id
                    }
                });
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
                return await prisma.post.findMany({
                    where: {
                        authorId: parent.id
                    }
                })
            }
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
                return (await prisma.subscribersOnAuthors.findMany({
                    where: {
                        subscriberId: parent.id
                    },
                    select: {
                        author: true,
                    },
                })).map(subscribersOnAuthors => subscribersOnAuthors.author);
            }
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
                return (await prisma.subscribersOnAuthors.findMany({
                    where: {
                        authorId: parent.id
                    },
                    select: {
                        subscriber: true,
                    },
                })).map(subscribersOnAuthors => subscribersOnAuthors.subscriber);
            }
        }
    })
});
