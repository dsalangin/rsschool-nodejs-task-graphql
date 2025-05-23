import { PrismaClient } from "@prisma/client";

export const getUsers = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findMany();
}

export const getUser = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findUnique({ where: { id: args.id } });
}