import { PrismaClient, User } from "@prisma/client";

export const getUsers = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findMany();
}

export const getUser = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findUnique({ where: { id: args.id } });
}

export const getProfileByUser = async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.profile.findFirst({
        where: {
            userId: parent.id
        }
    });
}

export const getPostsByUser = async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.post.findMany({
        where: {
            authorId: parent.id
        }
    })
}

export const getSubscribersByUser = async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
    return (await prisma.subscribersOnAuthors.findMany({
        where: {
            subscriberId: parent.id
        },
        select: {
            author: true,
        },
    })).map(subscribersOnAuthors => subscribersOnAuthors.author);
}

export const getAuthorsByUser = async (parent: User, args, { prisma }: { prisma: PrismaClient }) => {
    return (await prisma.subscribersOnAuthors.findMany({
        where: {
            authorId: parent.id
        },
        select: {
            subscriber: true,
        },
    })).map(subscribersOnAuthors => subscribersOnAuthors.subscriber);
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
