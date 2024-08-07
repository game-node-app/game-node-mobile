import React, { useCallback, useMemo } from "react";
import { Container, Divider, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGames } from "@/components/game/hooks/useGames";
import useUserId from "@/components/auth/hooks/useUserId";
import GameView from "@/components/game/view/GameView";
import { useInfiniteCollectionEntriesForCollectionId } from "../collection-entry/hooks/useInfiniteCollectionEntriesForCollectionId";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

interface ICollectionViewProps {
    libraryUserId: string;
    collectionId: string;
}

const CollectionViewFormSchema = z.object({
    page: z.number().optional().default(1),
});

type CollectionViewFormValues = z.infer<typeof CollectionViewFormSchema>;

const DEFAULT_LIMIT = 12;

const DEFAULT_REQUEST_PARAMS = {
    limit: DEFAULT_LIMIT,
    offset: 0,
};

const CollectionView = ({ collectionId, libraryUserId }: ICollectionViewProps) => {
    const { register, watch, setValue } = useForm<CollectionViewFormValues>({
        mode: "onSubmit",
        resolver: zodResolver(CollectionViewFormSchema),
        defaultValues: {
            page: 1,
        },
    });

    const ownUserId = useUserId();

    const formPage = watch("page");

    const requestParams = useMemo(() => {
        const page = formPage || 1;
        const offset = (page - 1) * DEFAULT_LIMIT;
        return {
            ...DEFAULT_REQUEST_PARAMS,
            offset,
        };
    }, [formPage]);

    const collectionQuery = useCollection(collectionId);
    const collection = collectionQuery.data;
    const isOwnCollection = libraryUserId === ownUserId;
    const collectionEntriesQuery = useInfiniteCollectionEntriesForCollectionId({
        collectionId,
        offset: requestParams.offset,
        limit: requestParams.limit,
        orderBy: {
            createdAt: "DESC",
        },
    });
    const gamesIds = useMemo(() => {
        const ids = collectionEntriesQuery.data?.pages.flatMap((page) => page?.data.map((entry) => entry.gameId));

        return ids?.filter((id) => id != undefined);
    }, [collectionEntriesQuery.data]);
    const gamesQuery = useGames({
        gameIds: gamesIds,
        relations: {
            cover: true,
        },
    });
    const games = gamesQuery.data;

    const isLoading = collectionQuery.isLoading || collectionEntriesQuery.isLoading || gamesQuery.isLoading;
    const isError = collectionQuery.isError || collectionEntriesQuery.isError || gamesQuery.isError;
    const isFetching = collectionEntriesQuery.isFetching || gamesQuery.isFetching;

    return (
        <Stack w={"100%"} h={"100%"} gap={0} align={"center"}>
            <Group className="w-full flex-nowrap justify-between">
                <Stack w="100%">
                    {collectionQuery.isLoading && (
                        <>
                            <Skeleton className={"w-32 h-9"} />
                            <Skeleton className={"w-48 h-6"} />
                        </>
                    )}
                    <Title size={"h3"} className={"w-full break-words"}>
                        {collection?.name}
                    </Title>
                    <Text c={"dimmed"} w={"100%"} className={"break-words"}>
                        {collectionQuery.data?.description}
                    </Text>
                </Stack>
            </Group>
            <Divider className={"w-[calc(100%-2rem)]"} my={"sm"} variant={"dashed"} />
            <GameView layout={"grid"}>
                <GameView.Content
                    items={games}
                    isLoading={false}
                    isFetching={isFetching}
                    hasNextPage={collectionEntriesQuery.hasNextPage}
                    onLoadMore={() => {
                        if (!isLoading && !isFetching) {
                            collectionEntriesQuery.fetchNextPage();
                        }
                    }}
                />
                {isError && <CenteredErrorMessage message="Failed to fetch collection entries. Please try again." />}
            </GameView>
        </Stack>
    );
};

export default CollectionView;
