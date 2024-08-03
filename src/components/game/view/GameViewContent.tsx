import React, { useCallback, useContext, useMemo } from "react";
import { Box, Button, Divider, Group, SimpleGrid, SimpleGridProps, Skeleton, Stack } from "@mantine/core";
import { GameViewContext } from "@/components/game/view/GameView";
import GameGridItem from "@/components/game/figure/GameGridItem";
import GameListItem from "@/components/game/figure/GameListItem";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { countTo } from "@/util/countTo";
import CenteredLoading from "@/components/general/CenteredLoading";

const GRID_COLUMNS_COUNT = 3;

interface IMetadataGridContentProps extends SimpleGridProps {
    items: TGameOrSearchGame[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    hasNextPage: boolean;
    onLoadMore: () => void;
}

/**
 * Mobile exclusive version of "GameViewContent" with automatic pagination handling. <br>
 * To be used with infinite queries.
 * @param items
 * @param isLoading
 * @param isFetching
 * @param hasNextPage
 * @param children
 * @param others
 * @constructor
 */
const GameViewContent = ({
    items,
    isLoading,
    isFetching,
    hasNextPage,
    onLoadMore,
    ...others
}: IMetadataGridContentProps) => {
    const { layout } = useContext(GameViewContext);
    const columns = useMemo(() => {
        if (items == null || items.length === 0) {
            return null;
        }
        return items.map((item) => {
            if (layout === "list") {
                return (
                    <Box w={"100%"} key={item.id}>
                        <GameListItem game={item} />
                        <Divider mt={"xs"} variant={"dashed"} />
                    </Box>
                );
            }

            return <GameGridItem key={item.id} game={item} />;
        });
    }, [items, layout]);

    const buildLoadingSkeletons = useCallback(() => {
        let baseSkeletonCount = 0;
        if (layout === "grid" && items?.length) {
            const totalItems = items.length;
            const itemsInLastGrid = Math.ceil(totalItems / GRID_COLUMNS_COUNT) - GRID_COLUMNS_COUNT;
            baseSkeletonCount = countTo(itemsInLastGrid, GRID_COLUMNS_COUNT);
        }

        return new Array(baseSkeletonCount + 6).fill(0).map((_, i) => {
            return <Skeleton key={`${layout}-skeleton-${i}`} className={"w-full min-h-[140px]"} />;
        });
    }, [items?.length, layout]);

    return (
        <Stack className={"w-full h-full"}>
            {isLoading && <CenteredLoading />}
            <SimpleGrid
                id={"game-view-content"}
                cols={layout === "list" ? 1 : GRID_COLUMNS_COUNT}
                w={"100%"}
                h={"100%"}
                {...others}
            >
                {columns}
                {isFetching && buildLoadingSkeletons()}
            </SimpleGrid>
            {!isLoading && !isFetching && hasNextPage && (
                <Group className={"w-full justify-center mt-4"}>
                    <Button onClick={onLoadMore}>Load more</Button>
                </Group>
            )}
        </Stack>
    );
};

export default GameViewContent;
