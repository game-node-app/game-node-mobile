import React, { useMemo, useState } from "react";
import { useSearchParameters } from "@/components/general/hooks/useSearchParameters";
import { Container, Group, Stack, Text } from "@mantine/core";
import GameView, { GameViewLayoutOption } from "@/components/game/view/GameView";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useInfiniteSearchGames } from "@/components/game/hooks/useInfiniteSearchGames";
import { TGameOrSearchGame } from "@/components/game/util/types";

const SearchResultsPage = () => {
    const params = useSearchParameters();
    const query = params.get("q") as string;

    const [layout, setLayout] = useState<GameViewLayoutOption>("grid");

    const { data, isFetching, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteSearchGames(
        {
            query: query,
            limit: 12,
        },
        query != undefined,
    );

    const items = useMemo(() => {
        return data?.pages?.flatMap((page) => page.data?.items).filter((item) => item != undefined) as
            | TGameOrSearchGame[]
            | undefined;
    }, [data]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Search Results</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Container fluid className={"min-h-screen my-4"}>
                    <Stack className={"w-full h-full"}>
                        {isError && <Text c={"yellow"}>No results found. Please go back and try again.</Text>}
                        <GameView layout={layout}>
                            <Group className={"w-full justify-end"}>
                                <GameView.LayoutSwitcher setLayout={setLayout} />
                            </Group>
                            <GameView.Content
                                items={items}
                                isLoading={isLoading}
                                isFetching={isFetching}
                                hasNextPage={hasNextPage}
                                onLoadMore={() => {
                                    if (!isFetching && !isLoading) {
                                        fetchNextPage();
                                    }
                                }}
                            ></GameView.Content>
                        </GameView>
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default SearchResultsPage;
