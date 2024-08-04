import React from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Container, Stack } from "@mantine/core";
import GameInfoView, { DEFAULT_GAME_INFO_VIEW_DTO } from "@/components/game/info/GameInfoView";
import { useGame } from "@/components/game/hooks/useGame";
import CenteredLoading from "@/components/general/CenteredLoading";
import GameExtraInfoView from "@/components/game/info/GameExtraInfoView";
import GameInfoViewFab from "@/components/game/info/fab/GameInfoViewFab";
import GameInfoReviewScreen from "@/components/game/info/review/GameInfoReviewScreen";

interface Props {
    gameId: number;
}

const GamePage = ({ gameId }: Props) => {
    const gameQuery = useGame(gameId, DEFAULT_GAME_INFO_VIEW_DTO);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{gameQuery.data ? gameQuery.data.name : "Game Info"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <GameInfoViewFab gameId={gameId} />
                <Container fluid className={"min-h-screen my-4"}>
                    {gameQuery.isLoading ? (
                        <CenteredLoading />
                    ) : (
                        <Stack className={"w-full"}>
                            <GameInfoView id={gameId} />
                            <GameInfoReviewScreen gameId={gameId} />
                            <GameExtraInfoView id={gameId} />
                        </Stack>
                    )}
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default GamePage;
