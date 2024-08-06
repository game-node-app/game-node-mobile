import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import TabHeader from "@/components/general/TabHeader";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import ProfileUserInfoWithBanner from "@/components/profile/view/ProfileUserInfoWithBanner";
import ProfileViewNavbar from "@/components/profile/view/ProfileViewNavbar";
import { Box, Divider } from "@mantine/core";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import ProfileStatsSimpleOverview from "@/components/profile/view/ProfileStatsSimpleOverview";
import RecentActivityList from "@/components/activity/RecentActivityList";

interface Props {
    userId?: string;
}

const ProfilePage = ({ userId }: Props) => {
    const ownUserId = useUserId();
    const userIdToUse = userId == undefined && ownUserId != undefined ? ownUserId : userId;
    const isOwnProfile = userIdToUse === ownUserId;

    const profileQuery = useUserProfile(userId);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {isOwnProfile ? (
                        <TabHeader />
                    ) : (
                        <>
                            <IonButtons slot={"start"}>
                                <IonBackButton />
                            </IonButtons>
                            <IonTitle>{profileQuery.data?.username}&apos s profile</IonTitle>
                        </>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {userIdToUse && (
                    <Box className={"w-full h-full xl:flex xl:justify-center"}>
                        <Box className={"mt-3 mb-12 xl:max-w-screen-xl"}>
                            <ProfileUserInfoWithBanner userId={userIdToUse}>
                                <ProfileViewNavbar userId={userIdToUse} />
                                <Box className={"w-full mt-6 mb-4"}>
                                    <ProfileFavoriteGames userId={userIdToUse} />
                                </Box>
                                <Divider className={"w-full mt-6 mb-2"} label={"Stats"} />
                                <ProfileStatsSimpleOverview userId={userIdToUse} />
                                <Divider className={"w-full mt-6 mb-2"} label={"Recent activity"} />
                                <RecentActivityList userId={userIdToUse} limit={7} />
                            </ProfileUserInfoWithBanner>
                        </Box>
                    </Box>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
