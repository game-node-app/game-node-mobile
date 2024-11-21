/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionCreateDto } from '../models/ConnectionCreateDto';
import type { FindAvailableConnectionsResponseDto } from '../models/FindAvailableConnectionsResponseDto';
import type { UserConnection } from '../models/UserConnection';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConnectionsService {
    /**
     * @returns FindAvailableConnectionsResponseDto
     * @throws ApiError
     */
    public static connectionsControllerFindAvailableConnections(): CancelablePromise<Array<FindAvailableConnectionsResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/connections',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static connectionsControllerCreateOrUpdate(
        requestBody: ConnectionCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/connections',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserConnection
     * @throws ApiError
     */
    public static connectionsControllerFindOwn(): CancelablePromise<Array<UserConnection>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/connections/own',
        });
    }
    /**
     * @param type
     * @returns UserConnection
     * @throws ApiError
     */
    public static connectionsControllerFindOwnByType(
        type: string,
    ): CancelablePromise<UserConnection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/connections/own/{type}',
            path: {
                'type': type,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static connectionsControllerDelete(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/connections/{id}',
            path: {
                'id': id,
            },
        });
    }
}
