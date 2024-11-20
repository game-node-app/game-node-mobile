import { IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import React from "react";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import PreferencesConnectionsItems from "@/components/preferences/connections/PreferencesConnectionsItems";
import { getTabAwareHref } from "@/util/getTabAwareHref";

const PreferencesScreen = ({ onClose }: BaseModalChildrenProps) => {
    return (
        <IonList className={"pt-0"}>
            <PreferencesConnectionsItems />
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Importer system</IonLabel>
                </IonItemDivider>
                <IonItem href={getTabAwareHref("/importer")}>
                    <IonLabel>Import games</IonLabel>
                </IonItem>
            </IonItemGroup>
        </IonList>
    );
};

export default PreferencesScreen;
