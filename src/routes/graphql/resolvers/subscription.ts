import { PrismaClient } from "@prisma/client";

export const subscribeTo = async (parent, args: { userId: string, authorId: string }, { prisma }: { prisma: PrismaClient }) => {
    const { userId, authorId } = args;

    try {
        await prisma.subscribersOnAuthors.create({
            data: {
                subscriberId: userId,
                authorId,
            }
        })
        return 'Subscription successful'
    } catch (err) {
        return err;
    }
}