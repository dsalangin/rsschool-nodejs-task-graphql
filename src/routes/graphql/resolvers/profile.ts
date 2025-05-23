import { PrismaClient } from "@prisma/client";

export const getProfiles = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.profile.findMany();
}

export const getProfile = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.profile.findUnique({ where: { id: args.id } });
}