/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Profile } from './Profile';
export type UserConnection = {
    id: number;
    type: UserConnection.type;
    profile: Profile;
    profileUserId: string;
    sourceUserId: string;
    sourceUsername: string;
    /**
     * If this connection can be used by the 'importer' system.
     */
    isImporterViable: boolean;
    isImporterEnabled: boolean;
};
export namespace UserConnection {
    export enum type {
        STEAM = 'steam',
    }
}

