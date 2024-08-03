import {
    FindStatisticsTrendingGamesDto,
    GameStatisticsPaginatedResponseDto,
    StatisticsService,
} from "@/wrapper/server";
import { keepPreviousData, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseInfiniteQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { sleep } from "@/util/sleep";

export interface InfiniteQueryTrendingGamesDto extends Omit<FindStatisticsTrendingGamesDto, "offset" | "search"> {}

export function useInfiniteTrendingGames(
    dto: InfiniteQueryTrendingGamesDto,
    enabled = true,
): ExtendedUseInfiniteQueryResult<GameStatisticsPaginatedResponseDto> {
    const limitToUse = dto.limit || 12;
    const queryClient = useQueryClient();
    const queryKey = ["statistics", "trending", "game", "infinite", limitToUse, dto.period, dto.criteria];
    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey,
        });
        queryClient.resetQueries({
            queryKey,
        });
    };

    return {
        ...useInfiniteQuery({
            queryKey,
            queryFn: async ({ pageParam = 0 }) => {
                return StatisticsService.statisticsControllerFindTrendingGames({
                    ...dto,
                    offset: pageParam,
                });
            },
            getNextPageParam: (previousData, allData, lastPageParam) => {
                if (previousData.pagination != undefined && previousData.pagination.hasNextPage) {
                    return lastPageParam + limitToUse;
                }

                return undefined;
            },
            placeholderData: keepPreviousData,
            initialPageParam: 0,
            staleTime: Infinity,
            enabled,
        }),
        queryKey,
        invalidate,
    };
}
