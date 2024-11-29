import React from "react";
import { UserConnection } from "@/wrapper/server";
import type = UserConnection.type;
import { useOwnUserConnectionByType } from "@/components/connections/hooks/useOwnUserConnectionByType";
import { useDisclosure } from "@mantine/hooks";
import { Group, Image, Stack, Text } from "@mantine/core";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import PreferencesConnectionModal from "@/components/preferences/connections/PreferencesConnectionModal";
import { IonItem, IonLabel, IonRippleEffect, IonToggle } from "@ionic/react";
import { getCapitalizedText } from "@/util/getCapitalizedText";

interface Props {
    type: type;
}

const PreferencesConnectionItem = ({ type }: Props) => {
    const userConnection = useOwnUserConnectionByType(type);
    const [modalOpened, modalUtils] = useDisclosure();

    return (
        <IonItem className={"relative"}>
            <PreferencesConnectionModal type={type} opened={modalOpened} onClose={modalUtils.close} />
            <Group className={"gap-2"}>
                <Image alt={"Connection icon"} src={getServerStoredIcon(type.valueOf())} w={28} h={28} />
                <IonLabel>{getCapitalizedText(type.valueOf())}</IonLabel>
            </Group>
            <IonToggle slot={"end"} checked={userConnection.data != undefined} onClick={modalUtils.open}></IonToggle>
        </IonItem>
    );
};

export default PreferencesConnectionItem;
