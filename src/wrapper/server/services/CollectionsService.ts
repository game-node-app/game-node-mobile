/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from '../models/Collection';
import type { CreateCollectionDto } from '../models/CreateCollectionDto';
import type { UpdateCollectionDto } from '../models/UpdateCollectionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CollectionsService {
    /**
     * Returns a collection which the user has access to
     *
     * (Either its own collection or a public one)
     * @param id
     * @returns Collection
     * @throws ApiError
     */
    public static collectionsControllerFindOneByIdWithPermissions(
        id: string,
    ): CancelablePromise<Collection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/collections/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsControllerUpdate(
        id: string,
        requestBody: UpdateCollectionDto,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/collections/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static collectionsControllerDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/collections/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param userId
     * @returns Collection
     * @throws ApiError
     */
    public static collectionsControllerFindAllByUserIdWithPermissions(
        userId: string,
    ): CancelablePromise<Array<Collection>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/collections/library/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsControllerCreate(
        requestBody: CreateCollectionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
