/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GamePlaytime } from '../models/GamePlaytime';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SyncHltbService {
    /**
     * @param gameId
     * @returns GamePlaytime
     * @throws ApiError
     */
    public static hltbControllerFindPlaytimeForGameId(
        gameId: number,
    ): CancelablePromise<GamePlaytime> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/sync/hltb/{gameId}',
            path: {
                'gameId': gameId,
            },
        });
    }
}
