/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Profile } from './Profile';
import type { Review } from './Review';
import type { ReviewComment } from './ReviewComment';
export type Report = {
    id: number;
    /**
     * Indexed to improve speed when filtering by type.
     */
    sourceType: Report.sourceType;
    category: Report.category;
    targetReview: Review | null;
    targetReviewId: string | null;
    targetReviewComment: ReviewComment | null;
    targetReviewCommentId: string | null;
    /**
     * Profile that is being target of a report
     */
    targetProfile: Profile;
    targetProfileUserId: string;
    /**
     * User-submitted reason for report.
     */
    reason: string | null;
    /**
     * User responsible for report.
     */
    profile: Profile;
    profileUserId: string;
    isClosed: boolean;
    /**
     * Action taken when closing this report
     */
    closeHandleAction: Report.closeHandleAction | null;
    /**
     * User responsible for closing this report
     */
    closeProfile: Profile | null;
    closeProfileUserId: string | null;
    createdAt: string;
    updatedAt: string;
};
export namespace Report {
    /**
     * Indexed to improve speed when filtering by type.
     */
    export enum sourceType {
        REVIEW = 'review',
        PROFILE = 'profile',
        REVIEW_COMMENT = 'review_comment',
    }
    export enum category {
        SPAM = 'spam',
        PERSONAL = 'personal',
    }
    /**
     * Action taken when closing this report
     */
    export enum closeHandleAction {
        DISCARD = 'discard',
        ALERT = 'alert',
        SUSPEND = 'suspend',
        BAN = 'ban',
    }
}

