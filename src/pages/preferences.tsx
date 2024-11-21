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

const PreferencesPage = () => {
    return (
        <IonPage>
            <SessionAuth>
                <IonContent>
                    <Container fluid className={"mb-4 p-0"}>
                        <IonList className={"pt-0"}>
                            <PreferencesConnectionsItems />
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>Importer system</IonLabel>
                                </IonItemDivider>
                                <IonItem href={getTabAwareHref("/importer")} disabled>
                                    <IonLabel>Import games</IonLabel>
                                </IonItem>
                            </IonItemGroup>
                        </IonList>
                    </Container>
                </IonContent>
            </SessionAuth>
        </IonPage>
    );
};

export default PreferencesPage;
