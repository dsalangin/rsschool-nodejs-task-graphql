import { GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { GraphQLBoolean, GraphQLInt } from 'graphql';
import { MemberTypeIdEnum } from '../queries/member-type.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
        userId: { type: new GraphQLNonNull(UUIDType) },
    },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeIdEnum },
    },
});
