/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Game } from './Game';
import type { Profile } from './Profile';
export type GameExclusion = {
    id: number;
    targetGameId: number;
    issuerUserId: string;
    isActive: boolean;
    targetGame: Game;
    issuer: Profile;
    createdAt: string;
    updatedAt: string;
};

