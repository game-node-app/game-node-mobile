/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewComment } from './ReviewComment';
import type { UserLike } from './UserLike';
import type { UserView } from './UserView';
export type CommentStatistics = {
    views: Array<UserView>;
    likes: Array<UserLike>;
    reviewComment: ReviewComment;
    reviewCommentId: string;
    id: number;
    viewsCount: number;
    likesCount: number;
};

