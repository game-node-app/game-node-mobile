import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Tab1.css";
import React from "react";
import { Button, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import TabHeader from "@/components/general/TabHeader";

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <TabHeader />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Stack className={"min-h-screen w-full flex-1 flex-col justify-center items-center"}>
                    <Link to={"/tab1/test"}>
                        <Button>Teste</Button>
                    </Link>
                </Stack>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
