import { Box, Flex } from "@mantine/core";
import React from "react";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import useUserId from "@/components/auth/hooks/useUserId";
import { UserAvatar } from "./avatar/UserAvatar";

const TabHeader = () => {
    const router = useIonRouter();
    const userId = useUserId();
    return (
        <Flex className={"w-full px-4"}>
            <Link to={router.routeInfo.tab || "#"}>
                <GameNodeLogo withBadge className={"w-28 h-10"} />
            </Link>
            <Box className={"w-fit ms-auto"}>{userId && <UserAvatar userId={userId} />}</Box>
        </Flex>
    );
};

export default TabHeader;
