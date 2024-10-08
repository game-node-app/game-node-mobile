import React from "react";
import { Route } from "react-router";
import GamePage from "../game";
import ProfilePage from "../profile/profile";
import ProfileStatsPage from "../profile_stats";
import LibraryPage from "../library";
import { AchievementsPage } from "@/pages/achievements";
import ProfileReviewListPage from "@/pages/profile/review_list";
import SupertokensAuthPage from "../auth";

/**
 * Retrieves a list of common routes that should be available in all tabs.
 * Most non-page routes should be declared here, as to not break tab layout navigation. <br>
 * Never route a user to another tab. <br>
 * Routes need to be direct children of 'IonTab's first 'IonRouterOutlet', otherwise they would break tabs navigation. <br>
 * Use 'getTabAwareHref' to retrieve a link to a common route based on the current selected tab.
 * @param prefix
 * @see getTabAwareHref
 */
export function getCommonRoutes(prefix: string): React.ReactNode[] {
    return [
        <Route
            exact
            key={`${prefix}-game`}
            path={`${prefix}/game/:id`}
            render={(props) => {
                // eslint-disable-next-line react/prop-types
                const gameId = Number.parseInt(props.match.params.id);
                return <GamePage gameId={gameId} />;
            }}
        />,
        <Route
            exact
            key={`${prefix}-profile`}
            path={`${prefix}/profile/:userId`}
            render={(props) => {
                // eslint-disable-next-line react/prop-types
                const userId = props.match.params.userId;
                return <ProfilePage userId={userId} />;
            }}
        />,
        <Route
            key={`${prefix}-profile-stats`}
            path={`${prefix}/profile/:userId/stats`}
            render={(props) => {
                const userId = props.match.params.userId;
                return <ProfileStatsPage userId={userId} />;
            }}
        />,
        <Route
            key={`${prefix}-profile-reviews`}
            path={`${prefix}/profile/:userId/reviews`}
            render={(props) => {
                const userId = props.match.params.userId;

                return <ProfileReviewListPage userId={userId} />;
            }}
        />,
        <Route
            key={`${prefix}-achievements`}
            path={`${prefix}/achievements/:userId`}
            render={(props) => {
                const userId = props.match.params.userId;
                return <AchievementsPage userId={userId} />;
            }}
        />,

        <Route
            key={`${prefix}-library`}
            path={`${prefix}/library/:userId`}
            render={(props) => {
                return <LibraryPage userId={props.match.params.userId} />;
            }}
        />,
        <Route key={`${prefix}-auth`} path={`${prefix}/auth`}>
            <SupertokensAuthPage />
        </Route>,
    ];
}
