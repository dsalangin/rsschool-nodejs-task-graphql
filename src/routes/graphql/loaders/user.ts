import { PrismaClient, Profile, Post, User } from '@prisma/client';
import DataLoader from 'dataloader';

export type UserLoader = {
  profileByUserId: DataLoader<string, Profile | null>;
  postsByUserId: DataLoader<string, Post[]>;
  userSubscribedTo: DataLoader<string, User[]>;
  subscribedToUser: DataLoader<string, User[]>;
}

export const createUserLoader = (prisma: PrismaClient): UserLoader => ({
  profileByUserId: new DataLoader<string, Profile | null>(async (userIds) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: {
          in: userIds as string[]
        }
      }
    });

    const userIdProfileMap = new Map(profiles.map((profile) => [profile.userId, profile]));

    return userIds.map((id) => userIdProfileMap.get(id) || null);
  }),

  postsByUserId: new DataLoader<string, Post[]>(async (userIds) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: userIds as string[]
        }
      }
    });

    const userPostsMap = posts.reduce((map, post) => {
      if (!map.has(post.authorId)) {
        map.set(post.authorId, []);
      }

      map.get(post.authorId)!.push(post);

      return map;
    }, new Map<string, Post[]>());

    return userIds.map((userId) => userPostsMap.get(userId) || []);
  }),

  userSubscribedTo: new DataLoader<string, User[]>(async (userIds) => {
    const subscribersOnAuthors = await prisma.subscribersOnAuthors.findMany({
      where: {
        subscriberId: {
          in: userIds as string[]
        }
      },
      include: {
        author: true
      }
    });

    const subscribersToAuthorsMap = subscribersOnAuthors.reduce((map, { subscriberId, author }) => {
      if (!map.has(subscriberId)) {
        map.set(subscriberId, []);
      }

      map.get(subscriberId)!.push(author);

      return map;
    }, new Map<string, User[]>());

    return userIds.map((id) => subscribersToAuthorsMap.get(id) || []);
  }),

  subscribedToUser: new DataLoader<string, User[]>(async (userIds) => {
    const subscribersOnAuthors = await prisma.subscribersOnAuthors.findMany({
      where: {
        authorId: {
          in: userIds as string[]
        }
      },
      include: {
        subscriber: true
      }
    });

    const authorToSubscribersMap = subscribersOnAuthors.reduce((map, { authorId, subscriber }) => {
      if (!map.has(authorId)) {
        map.set(authorId, []);
      }

      map.get(authorId)!.push(subscriber);

      return map;
    }, new Map<string, User[]>());

    return userIds.map((id) => authorToSubscribersMap.get(id) || []);
  })
})