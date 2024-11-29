/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeExclusionStatusDto } from '../models/ChangeExclusionStatusDto';
import type { FindAllExcludedGamesResponseDto } from '../models/FindAllExcludedGamesResponseDto';
import type { Object } from '../models/Object';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameFilterService {
    /**
     * @param offset
     * @param limit
     * @param orderBy
     * @returns FindAllExcludedGamesResponseDto
     * @throws ApiError
     */
    public static gameFilterControllerFindAllV1(
        offset?: number,
        limit: number = 20,
        orderBy?: Object,
    ): CancelablePromise<FindAllExcludedGamesResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/game/filter',
            query: {
                'offset': offset,
                'limit': limit,
                'orderBy': orderBy,
            },
        });
    }
    /**
     * @param gameId
     * @returns any
     * @throws ApiError
     */
    public static gameFilterControllerRegisterExclusionV1(
        gameId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/game/filter/{gameId}',
            path: {
                'gameId': gameId,
            },
        });
    }
    /**
     * @param gameId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static gameFilterControllerChangeStatusV1(
        gameId: number,
        requestBody: ChangeExclusionStatusDto,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/game/filter/{gameId}/status',
            path: {
                'gameId': gameId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
