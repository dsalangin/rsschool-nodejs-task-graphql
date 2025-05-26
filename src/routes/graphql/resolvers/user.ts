import { PrismaClient, User } from "@prisma/client";
import { UserLoader } from "../loaders/user.js";

interface Context {
    loaders: {
        user: UserLoader;
    };
}

export const getUsers = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findMany();
}

export const getUser = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findUnique({ where: { id: args.id } });
}

export const getProfileByUser = async (parent: User, args, { loaders }: Context) => {
    return loaders.user.profileByUserId.load(parent.id)
}

export const getPostsByUser = async (parent: User, args, { loaders }: Context) => {
    return loaders.user.postsByUserId.load(parent.id)

}

export const getSubscribersByUser = async (parent: User, args, { loaders }: Context) => {
    return loaders.user.userSubscribedTo.load(parent.id)

}

export const getAuthorsByUser = async (parent: User, args, { loaders }: Context) => {
    return loaders.user.subscribedToUser.load(parent.id)

}

export const createUser = async (parent, args: { dto: { name: string; balance: number; } }, { prisma }: { prisma: PrismaClient }) => {
    const { name, balance } = args.dto;

    return prisma.user.create({
        data: {
            name, balance
        }
    })
}

export const changeUser = async (parent, args: { id: string, dto: { name: string; balance: number; } }, { prisma }: { prisma: PrismaClient }) => {
    const { name, balance } = args.dto;

    return prisma.user.update({
        where: {
            id: args.id
        },
        data: {
            name, balance
        }
    })
}

export const deleteUser = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    try {
        await prisma.user.delete({
            where: {
                id: args.id
            }
        })
        return `User with ${args.id} id deleted`;
    } catch (err) {
        return err;
    }
}
