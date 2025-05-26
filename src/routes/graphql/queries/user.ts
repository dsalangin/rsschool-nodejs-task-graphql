import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";
import { getAuthorsByUser, getPostsByUser, getProfileByUser, getSubscribersByUser } from "../resolvers/user.js";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        profile: {
            type: ProfileType,
            resolve: getProfileByUser
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: getPostsByUser
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: getSubscribersByUser
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: getAuthorsByUser
        }
    })
});
