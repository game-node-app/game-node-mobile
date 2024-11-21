import React from "react";
import { IonItem, IonItemDivider, IonItemGroup, IonLabel } from "@ionic/react";
import PreferencesConnectionItem from "@/components/preferences/connections/PreferencesConnectionItem";
import { UserConnection } from "@/wrapper/server";
import { getTabAwareHref } from "@/util/getTabAwareHref";

const PreferencesConnectionsItems = () => {
    return (
        <IonItemGroup>
            <IonItemDivider>
                <IonLabel>Connections</IonLabel>
            </IonItemDivider>
            <PreferencesConnectionItem type={UserConnection.type.STEAM} />
        </IonItemGroup>
    );
};

export default PreferencesConnectionsItems;
