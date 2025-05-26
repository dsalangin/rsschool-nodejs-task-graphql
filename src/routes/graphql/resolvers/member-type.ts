import { PrismaClient } from "@prisma/client";
import { MemberTypeId } from "../../member-types/schemas.js";

export const getMemberTypes = async (parent, args, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.memberType.findMany();
}

export const getMemberType = async (parent, args: { id: MemberTypeId }, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.memberType.findUnique({ where: { id: args.id } });
}