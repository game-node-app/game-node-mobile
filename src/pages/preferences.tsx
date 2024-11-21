import React from "react";
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Container } from "@mantine/core";
import PreferencesConnectionsItems from "@/components/preferences/connections/PreferencesConnectionsItems";
import { getTabAwareHref } from "@/util/getTabAwareHref";
import { Link } from "react-router-dom";

const PreferencesPage = () => {
    return (
        <IonPage>
            <SessionAuth>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot={"start"}>
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>Preferences</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Container fluid className={"mb-4 p-0"}>
                        <IonList className={"pt-0"}>
                            <PreferencesConnectionsItems />
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Importer system</IonLabel>
                                </IonItemDivider>
                                <Link to={getTabAwareHref("/importer")}>
                                    <IonItem>
                                        <IonLabel>Import games</IonLabel>
                                    </IonItem>
                                </Link>
                            </IonItemGroup>
                        </IonList>
                    </Container>
                </IonContent>
            </SessionAuth>
        </IonPage>
    );
};

export default PreferencesPage;
