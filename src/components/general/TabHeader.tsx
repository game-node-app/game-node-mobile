import { Box } from "@mantine/core";
import React from "react";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";

const TabHeader = () => {
    const router = useIonRouter();
    return (
        <Box className={"w-full px-4"}>
            <Link to={router.routeInfo.tab || "#"}>
                <GameNodeLogo withBadge className={"w-28 h-10"} />
            </Link>
        </Box>
    );
};

export default TabHeader;
