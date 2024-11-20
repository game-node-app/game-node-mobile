import React from "react";
import useUserId from "../auth/hooks/useUserId";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BaseModalProps } from "@/util/types/modal-props";
import PreferencesScreen from "./PreferencesScreen";
import { Container } from "@mantine/core";

const PreferencesModal = ({ opened, onClose }: BaseModalProps) => {
    const userId = useUserId();
    return (
        <IonModal isOpen={opened} onDidDismiss={onClose}>
            <SessionAuth>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Preferences</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => onClose()}>Go back</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Container fluid className={"my-4 p-0"}>
                        <PreferencesScreen onClose={onClose} />
                    </Container>
                </IonContent>
            </SessionAuth>
        </IonModal>
    );
};

export default PreferencesModal;
