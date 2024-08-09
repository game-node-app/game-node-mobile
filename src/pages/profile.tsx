import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import React from "react";
import TabHeader from "@/components/general/TabHeader";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import ProfileUserInfoWithBanner from "@/components/profile/view/ProfileUserInfoWithBanner";
import ProfileViewNavbar from "@/components/profile/view/ProfileViewNavbar";
import { Box, Container, Divider } from "@mantine/core";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import ProfileStatsSimpleOverview from "@/components/profile/view/ProfileStatsSimpleOverview";
import RecentActivityList from "@/components/activity/RecentActivityList";
import CenteredLoading from "@/components/general/CenteredLoading";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

interface Props {
    userId?: string;
}

const ProfilePage = ({ userId }: Props) => {
    const ownUserId = useUserId();
    const userIdToUse = userId == undefined && ownUserId != undefined ? ownUserId : userId;
    const isOwnProfile = userIdToUse === ownUserId;

    const {
        routeInfo: { pathname },
    } = useIonRouter();

    const isInTab = pathname.split("/").length === 2;

    const profileQuery = useUserProfile(userId);

    return (
        <IonPage>
            <SessionAuth requireAuth={userId == undefined}>
                <IonHeader>
                    <IonToolbar>
                        {isInTab && isOwnProfile ? (
                            <TabHeader />
                        ) : (
                            <>
                                <IonButtons slot={"start"}>
                                    <IonBackButton />
                                </IonButtons>
                                <IonTitle>{profileQuery.data?.username}&apos;s profile</IonTitle>
                            </>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Container fluid className="my-4">
                        {profileQuery.isLoading && <CenteredLoading />}

                        {userIdToUse && (
                            <ProfileUserInfoWithBanner userId={userIdToUse}>
                                <ProfileViewNavbar userId={userIdToUse} />
                                <Divider className={"w-full mt-6 mb-2"} label={"Favorite games"} />
                                <Box className={"w-full mb-4"}>
                                    <ProfileFavoriteGames userId={userIdToUse} />
                                </Box>
                                <Divider className={"w-full mt-6 mb-2"} label={"Stats"} />
                                <ProfileStatsSimpleOverview userId={userIdToUse} />
                                <Divider className={"w-full mt-6 mb-2"} label={"Recent activity"} />
                                <RecentActivityList userId={userIdToUse} limit={7} />
                            </ProfileUserInfoWithBanner>
                        )}
                    </Container>
                </IonContent>
            </SessionAuth>
        </IonPage>
    );
};

export default ProfilePage;
