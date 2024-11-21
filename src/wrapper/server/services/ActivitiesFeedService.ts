/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivitiesFeedPaginatedResponseDto } from '../models/ActivitiesFeedPaginatedResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActivitiesFeedService {
    /**
     * @param criteria
     * @param offset
     * @param limit
     * @returns ActivitiesFeedPaginatedResponseDto
     * @throws ApiError
     */
    public static activitiesFeedControllerBuildActivitiesFeed(
        criteria: 'following' | 'all',
        offset?: number,
        limit: number = 20,
    ): CancelablePromise<ActivitiesFeedPaginatedResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/activities/feed',
            query: {
                'criteria': criteria,
                'offset': offset,
                'limit': limit,
            },
        });
    }
}
