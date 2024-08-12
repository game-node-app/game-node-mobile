import { IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import React from "react";

const PreferencesScreen = () => {
    return (
        <>
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Connections</IonLabel>
                </IonItemDivider>
            </IonItemGroup>
            <IonItem>
                <IonLabel>Steam</IonLabel>
            </IonItem>
        </>
    );
};

export default PreferencesScreen;
