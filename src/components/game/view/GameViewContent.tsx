import React, { useCallback, useContext } from "react";
import { Button, Center, Group, SimpleGrid, SimpleGridProps, Skeleton, Stack, Text } from "@mantine/core";
import { GameViewContext } from "@/components/game/view/GameView";
import GameGridItem from "@/components/game/figure/GameGridItem";
import { TGameOrSearchGame } from "@/components/game/util/types";
import CenteredLoading from "@/components/general/CenteredLoading";
import { IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList } from "@ionic/react";
import GameListItemWithSwipe from "@/components/game/figure/GameListItemWithSwipe";

const GRID_COLUMNS_COUNT = 3;

interface IMetadataGridContentProps extends SimpleGridProps {
    items: TGameOrSearchGame[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    hasNextPage: boolean;
    /**
     * If using 'scroll' as 'loadMoreMode', this should be a Promise, otherwise it's not possible
     * to determine when a fetch is done to hide the loading state.
     * @see IGameViewContext
     */
    onLoadMore: () => void | Promise<void>;
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
    const { layout, loadMoreMode } = useContext(GameViewContext);

    const buildGridColumns = useCallback(() => {
        if (items == null || items.length === 0) {
            return null;
        }

        return items.map((item) => {
            return <GameGridItem key={`grid-${item.id}`} game={item} />;
        });
    }, [items]);

    const buildListItems = useCallback(() => {
        if (items == null || items.length === 0) {
            return null;
        }

        return items.map((item) => {
            return <GameListItemWithSwipe key={`list-${item.id}`} game={item} />;
        });
    }, [items]);

    const buildLoadingSkeletons = useCallback(() => {
        return new Array(6).fill(0).map((_, i) => {
            return <Skeleton key={`${layout}-skeleton-${i}`} className={"w-full min-h-[140px] mb-3"} />;
        });
    }, [layout]);

    const isEmpty = !isLoading && !isFetching && (items == undefined || items.length === 0);

    const enableLoadMoreButton = !isLoading && !isFetching && loadMoreMode === "button" && hasNextPage;

    const enableLoadingSkeletons = loadMoreMode === "button" && isFetching;

    const enableInfiniteScroll = loadMoreMode === "scroll";

    if (layout === "list") {
        return (
            <Stack className={"w-full h-full"}>
                {isLoading && <CenteredLoading />}
                <IonList className={"w-full"}>
                    {buildListItems()}
                    {enableLoadingSkeletons && buildLoadingSkeletons()}
                    {isEmpty && (
                        <IonItem className={"w-full"}>
                            <Center className={"w-full"}>
                                <Text>No items to show.</Text>
                            </Center>
                        </IonItem>
                    )}
                </IonList>
                {!isLoading && !isFetching && hasNextPage && (
                    <Group className={"w-full justify-center"}>
                        <Button onClick={onLoadMore}>Load more</Button>
                    </Group>
                )}
            </Stack>
        );
    }

    return (
        <Stack className={"w-full h-full gap-2"}>
            {isEmpty && (
                <Center>
                    <Text>No items to show.</Text>
                </Center>
            )}
            {isLoading && <CenteredLoading />}
            <SimpleGrid id={"game-view-content"} cols={GRID_COLUMNS_COUNT} w={"100%"} h={"100%"} {...others}>
                {buildGridColumns()}
                {enableLoadingSkeletons && buildLoadingSkeletons()}
            </SimpleGrid>
            {enableLoadMoreButton && (
                <Group className={"w-full justify-center mt-4"}>
                    <Button onClick={onLoadMore}>Load more</Button>
                </Group>
            )}
            <IonInfiniteScroll
                disabled={!enableInfiniteScroll || !hasNextPage}
                onIonInfinite={async (evt) => {
                    await onLoadMore();
                    await evt.target.complete();
                }}
            >
                <IonInfiniteScrollContent loadingText={"Fetching more games..."} />
            </IonInfiniteScroll>
        </Stack>
    );
};

export default GameViewContent;
