import { PrismaClient } from "@prisma/client";

export const getProfiles = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.profile.findMany();
}

export const getProfile = async (parent, args: { id: string }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.profile.findUnique({ where: { id: args.id } });
}

export const createProfile = async (parent, args: { dto: { isMale: boolean; yearOfBirth: number; memberTypeId: string; userId: string } }, { prisma }: { prisma: PrismaClient }) => {
    const { isMale, yearOfBirth, memberTypeId, userId } = args.dto;

    return prisma.profile.create({
        data: {
            isMale, yearOfBirth, memberTypeId, userId
        }
    })
}

export const changeProfile = async (parent, args: { id: string, dto: { isMale: boolean; yearOfBirth: number; memberTypeId: string; } }, { prisma }: { prisma: PrismaClient }) => {
    const { isMale, yearOfBirth, memberTypeId } = args.dto;

    return prisma.profile.update({
        where: {
            id: args.id
        },
        data: {
            isMale, yearOfBirth, memberTypeId
        }
    })
}
