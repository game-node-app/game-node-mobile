import React from "react";
import { Activity } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useReview } from "@/components/review/hooks/useReview";
import { useGame } from "@/components/game/hooks/useGame";
import { getSizedImageUrl, ImageSize } from "@/components/game/util/getSizedImageUrl";
import { Box, Group, Overlay, Stack, Text, Title } from "@mantine/core";
import ActivityItemLikes from "@/components/activity/input/ActivityItemLikes";
import { useCollectionEntry } from "@/components/collection/collection-entry/hooks/useCollectionEntry";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { UserAvatarGroup } from "@/components/general/avatar/UserAvatarGroup";
import ActivityCreateDate from "@/components/activity/item/ActivityCreateDate";
import { Link } from "react-router-dom";
import { getTabAwareHref } from "@/util/getTabAwareHref";
import { useIonRouter } from "@ionic/react";

interface Props {
    activity: Activity;
}

const CollectionEntryActivityItem = ({ activity }: Props) => {
    const onMobile = useOnMobile();
    const collectionEntryQuery = useCollectionEntry(activity.collectionEntryId!);
    const {
        routeInfo: { pathname },
    } = useIonRouter();
    const collectionQuery = useCollection(activity.collectionId!);
    const gameId = collectionEntryQuery.data?.gameId;
    const gameQuery = useGame(gameId, {
        relations: {
            cover: true,
        },
    });
    const imageUrl = getSizedImageUrl(
        gameQuery.data?.cover?.url,
        onMobile ? ImageSize.SCREENSHOT_MED : ImageSize.SCREENSHOT_BIG,
    );
    const isError = collectionQuery.isError || collectionEntryQuery.isError;
    if (isError) {
        return null;
    }

    return (
        <Box
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className={"relative w-full mih-[160px] rounded-md"}
        >
            <Overlay backgroundOpacity={0.8} className={"z-0"}></Overlay>
            <Group className={"w-full h-full relative z-20 items-center flex-nowrap"}>
                <Box className={"w-3/12 lg:w-2/12"}>
                    <UserAvatarGroup
                        userId={activity.profileUserId}
                        groupProps={{
                            wrap: "wrap",
                            justify: "center",
                            gap: onMobile ? 3 : 5,
                        }}
                        textProps={{
                            className: "text-sm md:text-md",
                        }}
                        avatarProps={{ size: onMobile ? "lg" : "xl" }}
                        withHorizontalBreak
                    />
                </Box>
                <Box className={"w-3/12"}>
                    <Stack gap={5}>
                        <Link to={getTabAwareHref(`/game/${gameQuery.data?.id}`)}>
                            <Title className={"text-sm lg:text-md"}>{gameQuery.data?.name}</Title>
                        </Link>
                        <Text
                            c={"dimmed"}
                            fz={{
                                base: "xs",
                                md: "sm",
                            }}
                        >
                            Added to collection
                        </Text>
                    </Stack>
                </Box>
                <Box className={"w-6/12 lg:w-3/12 ms-auto h-full"}>
                    <Stack className={"w-full h-full items-end justify-between pe-2 lg:pe-3 py-4"}>
                        <ActivityCreateDate createdAtDate={activity.createdAt} />
                        <Link to={`/library/${activity.profileUserId}/collection/${activity.collectionId}`}>
                            <Title size={"h3"} lineClamp={onMobile ? 1 : 2}>
                                {collectionQuery.data?.name}
                            </Title>
                        </Link>
                        <Group>
                            <ActivityItemLikes activity={activity} />
                        </Group>
                    </Stack>
                </Box>
            </Group>
        </Box>
    );
};

export default CollectionEntryActivityItem;
