import { IonFab, IonFabButton, IonFabList } from "@ionic/react";
import React from "react";
import { ActionIcon, ThemeIcon } from "@mantine/core";
import {
    IconEdit,
    IconHeartFilled,
    IconHeartPlus,
    IconLibraryPlus,
    IconPencil,
    IconPencilPlus,
    IconPlus,
    IconStarFilled,
    IconStars,
    IconStarsFilled,
    IconTrashFilled,
} from "@tabler/icons-react";
import { useOwnCollectionEntryForGameId } from "@/components/collection/collection-entry/hooks/useOwnCollectionEntryForGameId";
import useReviewForUserIdAndGameId from "@/components/review/hooks/useReviewForUserIdAndGameId";
import useUserId from "@/components/auth/hooks/useUserId";
import CollectionEntryAddOrUpdateModal from "@/components/collection/collection-entry/form/modal/CollectionEntryAddOrUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import CollectionEntryRemoveModal from "@/components/collection/collection-entry/form/modal/CollectionEntryRemoveModal";
import GameInfoReviewCreateUpdateModal from "@/components/game/info/review/editor/GameInfoReviewCreateUpdateModal";

interface Props {
    gameId: number;
}

const GameInfoViewFab = ({ gameId }: Props) => {
    const userId = useUserId();

    const collectionEntryQuery = useOwnCollectionEntryForGameId(gameId);

    const gameInLibrary = !collectionEntryQuery.isError && collectionEntryQuery.data != undefined;

    const gameInFavorites = gameInLibrary && collectionEntryQuery.data!.isFavorite;

    const reviewQuery = useReviewForUserIdAndGameId(userId, gameId);

    const hasReview = reviewQuery.data != undefined;

    const [addModalOpened, addModalUtils] = useDisclosure();
    const [removeModalOpened, removeModalUtils] = useDisclosure();
    const [reviewModalOpened, reviewModalUtils] = useDisclosure();

    return (
        <IonFab slot="fixed" horizontal="end" vertical="bottom" className={"me-2"}>
            <CollectionEntryAddOrUpdateModal id={gameId} onClose={addModalUtils.close} opened={addModalOpened} />
            <CollectionEntryRemoveModal opened={removeModalOpened} onClose={removeModalUtils.close} gameId={gameId} />
            <GameInfoReviewCreateUpdateModal
                gameId={gameId}
                opened={reviewModalOpened}
                onClose={reviewModalUtils.close}
            />
            <IonFabButton
                onClick={() => {
                    if (!gameInLibrary) {
                        addModalUtils.open();
                    }
                }}
            >
                <IconPlus />
            </IonFabButton>
            {gameInLibrary && (
                <IonFabList side="top">
                    <IonFabButton color={"danger"} onClick={removeModalUtils.open}>
                        <IconTrashFilled />
                    </IonFabButton>
                    <IonFabButton color={"warning"} onClick={addModalUtils.open}>
                        <IconEdit />
                    </IonFabButton>
                    <IonFabButton color={"secondary"} onClick={reviewModalUtils.open}>
                        {hasReview ? <IconStarsFilled /> : <IconStars />}
                    </IonFabButton>

                    <IonFabButton color={"tertiary"}>
                        {gameInFavorites ? <IconHeartFilled /> : <IconHeartPlus />}
                    </IonFabButton>
                </IonFabList>
            )}
        </IonFab>
    );
};

export default GameInfoViewFab;
