import { ActionIcon, Box, Button, Flex, Group, Title } from "@mantine/core";
import React, { useMemo } from "react";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { IonButtons, IonHeader, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useDisclosure } from "@mantine/hooks";
import { getTabAwareHref } from "@/util/getTabAwareHref";
import { useInfiniteAggregatedNotifications } from "@/components/notifications/hooks/useInfiniteAggregatedNotifications";
import { IconBell, IconBellFilled } from "@tabler/icons-react";

interface Props {
    title: string;
}

const TabHeader = ({ title }: Props) => {
    const session = useSessionContext();
    const router = useIonRouter();

    const { data } = useInfiniteAggregatedNotifications();

    const aggregations = useMemo(() => {
        return data?.pages.flatMap((response) => response.data.map((aggregation) => aggregation));
    }, [data?.pages]);

    const hasUnreadNotifications = useMemo((): boolean => {
        if (aggregations == undefined || aggregations.length === 0) return false;

        for (const aggregation of aggregations) {
            const unread = aggregation.notifications.some((notification) => !notification.isViewed);
            if (unread) return true;
        }
        return false;
    }, [aggregations]);

    const [preferencesModalOpened, preferencesModalUtils] = useDisclosure();
    const [notificationsModalOpened, notificationsModalUtils] = useDisclosure();

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot={"end"}>
                    {!session.loading && session.userId && (
                        <Group className={"items-center gap-5 me-2"}>
                            <Link to={getTabAwareHref("/notifications")}>
                                <ActionIcon
                                    c={hasUnreadNotifications ? "brand" : "unset"}
                                    variant={"transparent"}
                                    className={"mt-1"}
                                    onClick={notificationsModalUtils.open}
                                >
                                    {hasUnreadNotifications ? <IconBellFilled /> : <IconBell />}
                                </ActionIcon>
                            </Link>

                            {/*<Box onClick={preferencesModalUtils.open}>*/}
                            {/*    <UserAvatar userId={session.userId} />*/}
                            {/*</Box>*/}
                        </Group>
                    )}
                    {(session.loading || !session.doesSessionExist) && (
                        <Link to={getTabAwareHref("/auth")}>
                            <Button loading={session.loading} variant={"outline"} size={"sm"}>
                                Sign in
                            </Button>
                        </Link>
                    )}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default TabHeader;
