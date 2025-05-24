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

export const unsubscribeFrom = async (parent, args: { userId: string, authorId: string }, { prisma }: { prisma: PrismaClient }) => {
    const { userId, authorId } = args;

    try {
        await prisma.subscribersOnAuthors.delete({
            where: {
                subscriberId_authorId: {
                    subscriberId: userId,
                    authorId,
                }
            }
        })
        return 'Unsubscription successful'
    } catch (err) {
        return err;
    }
}
