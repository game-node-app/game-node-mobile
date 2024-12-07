import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import React from "react";
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonProgressBar,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useActivity } from "@/components/activity/hooks/useActivity";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { Container, Stack } from "@mantine/core";
import ActivityDetailView from "@/components/activity/ActivityDetailView";

interface Props {
    activityId: string;
}

const ActivityDetailPage = ({ activityId }: Props) => {
    const activityQuery = useActivity(activityId);
    const profileQuery = useUserProfile(activityQuery.data?.profileUserId);

    if (activityQuery.isError || profileQuery.isError) {
        return <CenteredErrorMessage message={"Failed to fetch activity. Please try again."} />;
    }

    if (activityId == undefined || activityId.length === 0 || activityQuery.data == undefined) {
        return <CenteredErrorMessage message={"No activity found. Please try again."} />;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{profileQuery.data?.username}&apos;s activity</IonTitle>
                    {(activityQuery.isLoading || profileQuery.isLoading) && <IonProgressBar type={"indeterminate"} />}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"my-4"}>
                    <Stack className={"w-full h-full"}>
                        <ActivityDetailView activityId={activityId} />
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default ActivityDetailPage;
