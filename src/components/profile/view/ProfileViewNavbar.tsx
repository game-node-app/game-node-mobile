import React from "react";
import { Group, GroupProps, SimpleGrid } from "@mantine/core";
import ProfileViewNavbarLink from "@/components/profile/view/ProfileViewNavbarLink";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import useReviewsForUserId from "@/components/review/hooks/useReviewsForUserId";
import ProfileNavbarFollowInfo from "@/components/profile/view/ProfileNavbarFollowInfo";
import { FollowInfoRequestDto } from "@/wrapper/server";
import criteria = FollowInfoRequestDto.criteria;
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";
import { getTabAwareHref } from "@/util/getTabAwareHref";

interface Props extends GroupProps {
    userId: string;
}

const ProfileViewNavbar = ({ userId, ...groupProps }: Props) => {
    const profileQuery = useUserProfile(userId);
    const libraryQuery = useUserLibrary(profileQuery.data?.userId);
    const collectionEntriesQuery = useCollectionEntriesForUserId(userId, 0, 1);
    const reviewsQuery = useReviewsForUserId(userId, 0, 1);
    const obtainedAchievementsQuery = useAllObtainedAchievements(userId);

    return (
        <SimpleGrid
            cols={{
                base: 3,
                lg: 8,
            }}
            className={"lg:gap-16"}
        >
            <ProfileViewNavbarLink
                title={"Games"}
                itemCount={collectionEntriesQuery.data?.pagination.totalItems}
                to={getTabAwareHref(`/library/${userId}`)}
            />
            <ProfileViewNavbarLink
                title={"Reviews"}
                itemCount={reviewsQuery.data?.pagination.totalItems}
                to={getTabAwareHref(`/profile/${userId}/reviews`)}
            />
            <ProfileViewNavbarLink
                title={"Collections"}
                itemCount={libraryQuery.data?.collections.length}
                to={getTabAwareHref(`/library/${userId}`)}
            />
            <ProfileViewNavbarLink
                title={"Achievements"}
                to={getTabAwareHref(`/achievements/${userId}`)}
                itemCount={obtainedAchievementsQuery.data?.length}
            />
            <ProfileNavbarFollowInfo targetUserId={userId} criteria={criteria.FOLLOWERS} />
            <ProfileNavbarFollowInfo targetUserId={userId} criteria={criteria.FOLLOWING} />
            <ProfileViewNavbarLink
                title={"Statistics"}
                showItemCount={false}
                to={getTabAwareHref(`/profile/${userId}/stats`)}
            />
        </SimpleGrid>
    );
};

export default ProfileViewNavbar;
