import React, { useEffect, useState } from "react";
import { Container, Modal } from "@mantine/core";
import LoginPromptCentered from "@/components/general/LoginPromptCentered";
import CollectionEntryAddOrUpdateForm from "@/components/collection/collection-entry/form/CollectionEntryAddOrUpdateForm";
import { BaseModalProps } from "@/util/types/modal-props";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useRouter } from "next/router";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useUserId from "@/components/auth/hooks/useUserId";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

interface IGameAddModalProps extends BaseModalProps {
    id: number;
}

const CollectionEntryAddOrUpdateModal = ({ opened, onClose, id }: IGameAddModalProps) => {
    const userId = useUserId();
    useUserLibrary(userId);

    return (
        <IonModal isOpen={opened} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add to your library</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => onClose()}>Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className={""}>
                <Container fluid className={"min-h-screen my-4"}>
                    <CollectionEntryAddOrUpdateForm gameId={id} onClose={onClose} />
                </Container>
            </IonContent>
        </IonModal>
    );
};

export default CollectionEntryAddOrUpdateModal;
