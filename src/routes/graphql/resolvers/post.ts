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

export const changePost = async (parent, args: { id: string, dto: { title: string; content: string; } }, { prisma }: { prisma: PrismaClient }) => {
    const { title, content } = args.dto;

    return prisma.post.update({
        where: {
            id: args.id
        },
        data: {
            title, content
        }
    })
}

export const deletePost = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    try {
        await prisma.post.delete({
            where: {
                id: args.id
            }
        })
        return `Post with ${args.id} id deleted`;
    } catch (err) {
        return err;
    }
}
