import React from "react";
import { Box, Flex, Grid, Paper, Skeleton, Stack, Title } from "@mantine/core";
import GameFigureImage from "@/components/game/figure/GameFigureImage";
import GameInfoDetails from "@/components/game/info/GameInfoDetails";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { GameRepositoryFindOneDto } from "@/wrapper/server";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import GameInfoImageCarousel from "@/components/game/info/carousel/GameInfoImageCarousel";
import Break from "@/components/general/Break";
import { useGame } from "@/components/game/hooks/useGame";

export const DEFAULT_GAME_INFO_VIEW_DTO: GameRepositoryFindOneDto = {
    relations: {
        cover: true,
        genres: true,
        themes: true,
        gameModes: true,
        artworks: true,
        screenshots: true,
        platforms: true,
        involvedCompanies: {
            company: true,
        },
        similarGames: {
            cover: true,
        },
        dlcOf: {
            cover: true,
        },
        dlcs: {
            cover: true,
        },
        expansionOf: {
            cover: true,
        },
        expansions: {
            cover: true,
        },
    },
};

interface IGameInfoViewProps {
    id: number;
}

const GameInfoView = ({ id }: IGameInfoViewProps) => {
    const gameQuery = useGame(id, DEFAULT_GAME_INFO_VIEW_DTO);
    const game = gameQuery.data;

    const onMobile = useOnMobile();

    if (!game) {
        return null;
    }

    return (
        <Paper w={"100%"} h={"100%"}>
            <Stack>
                <Grid columns={12} className="justify-center lg:justify-start p-3 lg:ps-3 w-full">
                    <Grid.Col span={{ xs: 12, lg: 3 }}>
                        <Flex wrap={"wrap"} justify={"center"} align={"start"} w={"inherit"} h={"inherit"}>
                            <Box className="w-10/12">
                                <GameFigureImage
                                    game={game}
                                    linkProps={{
                                        onClick: (evt) => evt.preventDefault(),
                                    }}
                                />
                            </Box>

                            <Break />
                            <Title ta={"center"} size={"h3"} className="mx-5 lg:mx-1 mt-4 lg:mt-8">
                                {game ? game.name : <Skeleton />}
                            </Title>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 9 }} className="mt-4">
                        <GameInfoDetails game={game} />
                    </Grid.Col>
                </Grid>

                <GameInfoImageCarousel
                    gameId={game?.id}
                    imageSize={ImageSize.SCREENSHOT_BIG}
                    carouselProps={{
                        withIndicators: !onMobile,
                        withControls: !onMobile,
                    }}
                />
            </Stack>
        </Paper>
    );
};

export default GameInfoView;
