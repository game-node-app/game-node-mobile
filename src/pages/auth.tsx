import React from "react";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Box } from "@mantine/core";

const SupertokensAuthPage = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Sign in</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Box className={"w-full h-full mt-20"}>
                    {canHandleRoute([ThirdPartyPreBuiltUI, PasswordlessPreBuiltUI]) &&
                        getRoutingComponent([ThirdPartyPreBuiltUI, PasswordlessPreBuiltUI])}
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default SupertokensAuthPage;
