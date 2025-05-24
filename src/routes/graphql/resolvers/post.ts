import { PrismaClient } from "@prisma/client";

export const getPosts = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.post.findMany();
}

export const getPost = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.post.findUnique({ where: { id: args.id } });
}

export const createPost = async (parent, args: { dto: { title: string; content: string; authorId: string; } }, { prisma }: { prisma: PrismaClient }) => {
    const { title, content, authorId } = args.dto;

    return prisma.post.create({
        data: {
            title, content, authorId
        }
    })
}
