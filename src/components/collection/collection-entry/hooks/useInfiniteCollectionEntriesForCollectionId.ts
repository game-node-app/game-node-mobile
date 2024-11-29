import { ExtendedUseInfiniteQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { CollectionEntriesPaginatedResponseDto, CollectionsEntriesService } from "@/wrapper/server";
import { keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

interface UseInfiniteCollectionEntriesForCollectionIdProps {
    collectionId: string;
    limit?: number;
    offset?: number;
    orderBy?: Record<string, unknown>;
}

export function useInfiniteCollectionEntriesForCollectionId({
    collectionId,
    limit,
    offset,
    orderBy,
}: UseInfiniteCollectionEntriesForCollectionIdProps): ExtendedUseInfiniteQueryResult<
    CollectionEntriesPaginatedResponseDto | undefined
> {
    const limiteToUse = limit || 12;
    const queryClient = useQueryClient();
    const queryKey = ["collection-entries", "infinite", collectionId, offset, limit, orderBy];
    /**
     * This will also invalidate useCollectionEntriesForCollectionId
     */
    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: [queryKey[0]],
        });
    };

    return {
        queryKey,
        invalidate,
        ...useInfiniteQuery({
            queryKey: queryKey,
            queryFn: async ({ pageParam }) => {
                return CollectionsEntriesService.collectionsEntriesControllerFindAllByCollectionIdV1(collectionId, {
                    limit,
                    orderBy,
                    offset: pageParam,
                });
            },
            initialPageParam: 0,
            getNextPageParam: (lastPage, _, lastPageParam) => {
                if (lastPage && lastPage.pagination && lastPage.pagination.hasNextPage) {
                    return lastPageParam + limiteToUse;
                }

                return undefined;
            },
            placeholderData: keepPreviousData,
        }),
    };
}
