/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activity } from './Activity';
import type { Game } from './Game';
import type { ImporterWatchNotification } from './ImporterWatchNotification';
import type { Profile } from './Profile';
import type { Review } from './Review';
export type Notification = {
    id: number;
    sourceType: Notification.sourceType;
    /**
     * What this notification's about. E.g.: a new like, a new follower, a game launch, etc.
     */
    category: Notification.category;
    review: Review | null;
    reviewId: string | null;
    game: Game | null;
    gameId: number | null;
    activity: Activity | null;
    activityId: string | null;
    /**
     * User responsible for generating this notification (e.g. user that liked a review).
     */
    profile: Profile | null;
    /**
     * User responsible for generating this notification (e.g. user that liked a review).
     * When null/undefined, the notification was generated by the 'system'.
     */
    profileUserId: string | null;
    importerNotification: ImporterWatchNotification | null;
    importerNotificationId: number;
    report: Record<string, any>;
    reportId: number | null;
    isViewed: boolean;
    /**
     * User which is the target for this notification. <br>
     * If this is empty (null/undefined), the notification is targeted at all users. <br>
     * Not to be confused with the 'profile' property.
     */
    targetProfile: Profile | null;
    /**
     * User which is the target for this notification. <br>
     * If this is empty (null/undefined), the notification is targeted at all users. <br>
     * Not to be confused with the 'profile' property.
     */
    targetProfileUserId: string | null;
    createdAt: string;
    updatedAt: string;
};
export namespace Notification {
    export enum sourceType {
        GAME = 'game',
        REVIEW = 'review',
        ACTIVITY = 'activity',
        PROFILE = 'profile',
        IMPORTER = 'importer',
        REPORT = 'report',
    }
    /**
     * What this notification's about. E.g.: a new like, a new follower, a game launch, etc.
     */
    export enum category {
        FOLLOW = 'follow',
        LIKE = 'like',
        COMMENT = 'comment',
        WATCH = 'watch',
        ALERT = 'alert',
    }
}

