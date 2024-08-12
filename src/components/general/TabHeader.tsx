import { Box, Button, Flex } from "@mantine/core";
import React from "react";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./avatar/UserAvatar";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import PreferencesModal from "@/components/preferences/PreferencesModal";
import { useDisclosure } from "@mantine/hooks";

const TabHeader = () => {
    const session = useSessionContext();
    const router = useIonRouter();

    const [preferencesModalOpened, preferencesModalUtils] = useDisclosure();

    return (
        <Flex className={"w-full px-4"}>
            <PreferencesModal opened={preferencesModalOpened} onClose={preferencesModalUtils.close} />
            <Link to={router.routeInfo.tab || "#"}>
                <GameNodeLogo withBadge className={"w-28 h-10"} />
            </Link>
            <Box className={"w-fit ms-auto"}>
                {!session.loading && session.userId && (
                    <Box onClick={preferencesModalUtils.open}>
                        <UserAvatar userId={session.userId} />
                    </Box>
                )}
                {(session.loading || !session.doesSessionExist) && (
                    <Button loading={session.loading} variant={"outline"} size={"sm"}>
                        Sign in
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

export default TabHeader;
