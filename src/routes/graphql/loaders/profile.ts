import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { MemberType } from '@prisma/client';

export type ProfileLoader = {
  memberTypeByProfileId: DataLoader<string, MemberType | null>;
}

export const createProfileLoader = (prisma: PrismaClient): ProfileLoader => ({
  memberTypeByProfileId: new DataLoader(async (profileIds) => {
    const memberTypes = await prisma.memberType.findMany({
      where: {
        profiles: {
          some: {
            id: {
              in: profileIds as string[]
            }
          }
        }
      },
      include: {
        profiles: true
      }
    });

    const profileIdMemberTypeMap = new Map<string, MemberType>();

    memberTypes.forEach((memberType) => {
      memberType.profiles.forEach(profile => {
        profileIdMemberTypeMap.set(profile.id, memberType);
      });
    });

    return profileIds.map((id) => profileIdMemberTypeMap.get(id) || null);
  })
});
