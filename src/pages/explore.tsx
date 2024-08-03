import { Box, Button, Container, Flex, Stack } from "@mantine/core";
import React, { useCallback, useMemo, useState } from "react";
import SearchBar from "@/components/general/input/SearchBar/SearchBar";
import {
    ActionSheetButton,
    IonActionSheet,
    IonContent,
    IonHeader,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import TabHeader from "@/components/general/TabHeader";
import { FindStatisticsTrendingGamesDto, GameStatisticsPaginatedResponseDto } from "@/wrapper/server";
import period = FindStatisticsTrendingGamesDto.period;
import GameView from "@/components/game/view/GameView";
import { useInfiniteTrendingGames } from "@/components/statistics/hooks/useInfiniteTrendingGames";
import { useGames } from "@/components/game/hooks/useGames";

const SELECT_PERIOD_DATA = [
    { label: "Week", value: period.WEEK },
    { label: "Month", value: period.MONTH },
    {
        label: "3 months",
        value: period.QUARTER,
    },
    {
        label: "6 months",
        value: period.HALF_YEAR,
    },
    {
        label: "Year",
        value: period.YEAR,
    },
    {
        label: "All time",
        value: period.ALL,
    },
];

const DEFAULT_LIMIT = 12;

const ExplorePage = () => {
    const router = useIonRouter();
    const [query, setQuery] = useState<string>("");

    const [selectedPeriod, setSelectedPeriod] = useState(period.MONTH);

    const [trendingQueryDto, setTrendingQueryDto] = useState<FindStatisticsTrendingGamesDto>({
        period: selectedPeriod,
        limit: DEFAULT_LIMIT,
    });

    const trendingGamesQuery = useInfiniteTrendingGames(trendingQueryDto);

    const gamesIds = useMemo(() => {
        if (trendingGamesQuery.isError || trendingGamesQuery.data == undefined) return undefined;
        return trendingGamesQuery.data?.pages.flatMap(
            (statisticsPaginatedResponse: GameStatisticsPaginatedResponseDto) => {
                return statisticsPaginatedResponse.data.map((statistics) => statistics.gameId!);
            },
        );
    }, [trendingGamesQuery.data, trendingGamesQuery.isError]);

    const gamesQuery = useGames(
        {
            gameIds: gamesIds,
            relations: {
                cover: true,
            },
        },
        true,
    );

    const periodSelectOptions = useMemo(() => {
        return SELECT_PERIOD_DATA.map((option) => {
            return (
                <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                </IonSelectOption>
            );
        });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <TabHeader />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"min-h-screen my-4"}>
                    <Box className={"my-6"}>
                        <form
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                router.push(`/explore/search_results?q=${query}`);
                            }}
                        >
                            <SearchBar
                                label={"Search for games"}
                                value={query}
                                onChange={(evt) => setQuery(evt.currentTarget.value)}
                                withButton
                            />
                        </form>
                    </Box>
                    <Stack className={"w-full"}>
                        <Flex className={"w-full justify-end"}>
                            <IonSelect
                                label={"Trending in"}
                                interface="action-sheet"
                                placeholder="Select period"
                                onIonChange={(evt) => {
                                    setSelectedPeriod(evt.detail.value);
                                    setTrendingQueryDto((prev) => ({ ...prev, period: evt.detail.value }));
                                }}
                                value={selectedPeriod}
                            >
                                {periodSelectOptions}
                            </IonSelect>
                        </Flex>
                        <GameView layout={"grid"}>
                            <GameView.Content
                                items={gamesQuery.data}
                                isLoading={
                                    trendingGamesQuery.isLoading || gamesQuery.isLoading || gamesQuery.isFetching
                                }
                                isFetching={trendingGamesQuery.isFetching || gamesQuery.isFetching}
                                hasNextPage={trendingGamesQuery.hasNextPage}
                                onLoadMore={() => {
                                    if (
                                        trendingGamesQuery.isFetching ||
                                        gamesQuery.isLoading ||
                                        gamesQuery.isFetching
                                    ) {
                                        return;
                                    }

                                    trendingGamesQuery.fetchNextPage();
                                }}
                            ></GameView.Content>
                        </GameView>
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default ExplorePage;
