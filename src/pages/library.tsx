import useUserId from "@/components/auth/hooks/useUserId";
import CollectionView from "@/components/collection/view/CollectionView";
import { DetailsBox } from "@/components/general/DetailsBox";
import TabHeader from "@/components/general/TabHeader";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import LibraryViewFab from "@/components/library/view/fab/LibraryViewFab";
import LibraryView from "@/components/library/view/LibraryView";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
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
import { Container } from "@mantine/core";
import React, { useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

interface Props {
    userId?: string;
}

const LibraryPage = ({ userId }: Props) => {
    const ownUserId = useUserId();
    const userIdToUse = userId == undefined && ownUserId != undefined ? ownUserId : userId;
    const isOwnLibrary = userIdToUse === ownUserId;

    const {
        routeInfo: { pathname },
    } = useIonRouter();

    const isInTab = pathname.split("/").length === 2;

    const profileQuery = useUserProfile(userIdToUse);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | undefined>(undefined);

    return (
        <IonPage>
            <SessionAuth requireAuth={userId == undefined}>
                <IonHeader>
                    <IonToolbar>
                        {isInTab && isOwnLibrary ? (
                            <TabHeader />
                        ) : (
                            <>
                                <IonButtons slot={"start"}>
                                    <IonBackButton />
                                </IonButtons>
                                <IonTitle>{`${profileQuery.data?.username}`}&apos;s library</IonTitle>
                            </>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {isOwnLibrary && <LibraryViewFab selectedCollectionId={selectedCollectionId} />}
                    <Container fluid className="my-4">
                        <LibraryView
                            userId={userIdToUse}
                            collectionId={selectedCollectionId}
                            onChange={setSelectedCollectionId}
                        >
                            {selectedCollectionId ? (
                                <CollectionView libraryUserId={userIdToUse!} collectionId={selectedCollectionId} />
                            ) : (
                                <DetailsBox
                                    title={`${profileQuery.data?.username}'s Favorite Games`}
                                    stackProps={{ className: "w-full" }}
                                >
                                    <ProfileFavoriteGames userId={userIdToUse as string} />
                                </DetailsBox>
                            )}
                        </LibraryView>
                    </Container>
                </IonContent>
            </SessionAuth>
        </IonPage>
    );
};

export default LibraryPage;
