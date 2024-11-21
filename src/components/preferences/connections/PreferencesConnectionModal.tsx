import React, { useMemo } from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { UserConnection } from "@/wrapper/server";
import { Container, Modal } from "@mantine/core";
import PreferencesConnectionSteamForm from "@/components/preferences/connections/steam/PreferencesConnectionSteamForm";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

interface Props extends BaseModalProps {
    type: UserConnection.type;
}

const PreferencesConnectionModal = ({ opened, onClose, type }: Props) => {
    const renderedConnectionForm = useMemo(() => {
        switch (type) {
            case UserConnection.type.STEAM:
                return <PreferencesConnectionSteamForm onClose={onClose} />;
            default:
                return null;
        }
    }, [onClose, type]);
    return (
        <IonModal isOpen={opened} onDidDismiss={onClose} initialBreakpoint={0.5} breakpoints={[0.5, 0.75, 1]}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Set up your {type} connection</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"my-4"}>
                    {renderedConnectionForm}
                </Container>
            </IonContent>
        </IonModal>
    );
};

export default PreferencesConnectionModal;
