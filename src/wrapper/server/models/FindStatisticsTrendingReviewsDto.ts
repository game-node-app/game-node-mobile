/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FindStatisticsTrendingReviewsDto = {
    /**
     * Usually, this property should not be used unless a specific review needs to be retrieved, and it's easier to just
     * call the statistics controller.
     */
    reviewId?: string;
    gameId?: number;
    userId?: string;
    offset?: number;
    limit?: number;
};

