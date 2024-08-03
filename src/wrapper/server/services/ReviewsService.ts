/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReviewDto } from '../models/CreateReviewDto';
import type { FindAllReviewsByIdDto } from '../models/FindAllReviewsByIdDto';
import type { FindReviewPaginatedDto } from '../models/FindReviewPaginatedDto';
import type { Review } from '../models/Review';
import type { ReviewScoreResponseDto } from '../models/ReviewScoreResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reviewsControllerCreateOrUpdate(
        requestBody: CreateReviewDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reviews',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param gameId
     * @returns Review
     * @throws ApiError
     */
    public static reviewsControllerFindOneByUserIdAndGameId(
        id: string,
        gameId: number,
    ): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews',
            query: {
                'id': id,
                'gameId': gameId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Review
     * @throws ApiError
     */
    public static reviewsControllerFindAllById(
        requestBody: FindAllReviewsByIdDto,
    ): CancelablePromise<Array<Review>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reviews/all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param gameId
     * @returns ReviewScoreResponseDto
     * @throws ApiError
     */
    public static reviewsControllerGetScoreForGameId(
        gameId: number,
    ): CancelablePromise<ReviewScoreResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews/score',
            query: {
                'gameId': gameId,
            },
        });
    }
    /**
     * @param userId
     * @param offset
     * @param limit
     * @returns FindReviewPaginatedDto
     * @throws ApiError
     */
    public static reviewsControllerFindAllByUserId(
        userId: string,
        offset?: number,
        limit: number = 20,
    ): CancelablePromise<FindReviewPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews/profile/{userId}',
            path: {
                'userId': userId,
            },
            query: {
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @param offset
     * @param limit
     * @returns FindReviewPaginatedDto
     * @throws ApiError
     */
    public static reviewsControllerFindAllByGameId(
        id: number,
        offset?: number,
        limit: number = 20,
    ): CancelablePromise<FindReviewPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews/game/{id}',
            path: {
                'id': id,
            },
            query: {
                'offset': offset,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns Review
     * @throws ApiError
     */
    public static reviewsControllerFindOneById(
        id: string,
    ): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static reviewsControllerDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/reviews/{id}',
            path: {
                'id': id,
            },
        });
    }
}
