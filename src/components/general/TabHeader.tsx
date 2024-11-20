import { ActionIcon, Box, Button, Flex, Group } from "@mantine/core";
import React, { useMemo } from "react";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./avatar/UserAvatar";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import PreferencesModal from "@/components/preferences/PreferencesModal";
import { useDisclosure } from "@mantine/hooks";
import { getTabAwareHref } from "@/util/getTabAwareHref";
import { useInfiniteAggregatedNotifications } from "@/components/notifications/hooks/useInfiniteAggregatedNotifications";
import { IconBell, IconBellFilled } from "@tabler/icons-react";
import NotificationsManager from "@/components/general/NotificationsManager";
import NotificationsModal from "@/components/notifications/NotificationsModal";

const TabHeader = () => {
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
        <Flex className={"w-full px-4"}>
            <PreferencesModal opened={preferencesModalOpened} onClose={preferencesModalUtils.close} />
            <NotificationsModal opened={notificationsModalOpened} onClose={notificationsModalUtils.close} />
            <Link to={router.routeInfo.tab || "#"}>
                <GameNodeLogo withBadge className={"w-28 h-10"} />
            </Link>
            <Box className={"w-fit ms-auto"}>
                {!session.loading && session.userId && (
                    <Group className={"items-center gap-5"}>
                        <ActionIcon
                            c={hasUnreadNotifications ? "brand" : "unset"}
                            variant={"transparent"}
                            className={"mt-1"}
                            onClick={notificationsModalUtils.open}
                        >
                            {hasUnreadNotifications ? <IconBellFilled /> : <IconBell />}
                        </ActionIcon>

                        <Box onClick={preferencesModalUtils.open}>
                            <UserAvatar userId={session.userId} />
                        </Box>
                    </Group>
                )}
                {(session.loading || !session.doesSessionExist) && (
                    <Link to={getTabAwareHref("/auth")}>
                        <Button loading={session.loading} variant={"outline"} size={"sm"}>
                            Sign in
                        </Button>
                    </Link>
                )}
            </Box>
        </Flex>
    );
};

export default TabHeader;
