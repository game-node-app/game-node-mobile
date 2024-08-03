/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Profile } from './Profile';
export type UserFollow = {
    id: number;
    follower: Profile;
    followerUserId: string;
    followed: Profile;
    followedUserId: string;
    createdAt: string;
    updatedAt: string;
};

