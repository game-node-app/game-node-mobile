import React from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Container } from "@mantine/core";
import GameInfoView, { DEFAULT_GAME_INFO_VIEW_DTO } from "@/components/game/info/GameInfoView";
import { useGame } from "@/components/game/hooks/useGame";
import CenteredLoading from "@/components/general/CenteredLoading";

interface Props {
    gameId: number;
}

const GamePage = ({ gameId }: Props) => {
    console.log("GameId is: ", gameId);
    const gameQuery = useGame(gameId, DEFAULT_GAME_INFO_VIEW_DTO);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Game Info</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"min-h-screen my-4"}>
                    {gameQuery.isLoading ? (
                        <CenteredLoading />
                    ) : (
                        <>
                            <GameInfoView id={gameId} />
                        </>
                    )}
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default GamePage;
