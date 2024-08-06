import React from "react";
import { Carousel, CarouselProps } from "@mantine/carousel";
import { Game } from "@/wrapper/server";
import GameGridItem from "@/components/game/figure/GameGridItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { Flex, Skeleton, Text } from "@mantine/core";

interface IGameInfoCarouselProps extends CarouselProps {
    isLoading: boolean;
    isError: boolean;
    games: Game[] | undefined;
}

const buildGamesFigures = (games: Game[] | undefined) => {
    if (games == undefined || games.length === 0) return null;

    return games.map((similarGame, index) => {
        if (index < 20) {
            return (
                <Carousel.Slide key={similarGame.id} className={"w-full h-full"}>
                    <GameGridItem game={similarGame} withQuickAdd={false} />
                </Carousel.Slide>
            );
        }
        return null;
    });
};

const buildSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 7; i++) {
        skeletons.push(
            <Carousel.Slide key={i}>
                <Skeleton height={250} />
            </Carousel.Slide>,
        );
    }

    return skeletons;
};

const buildErrorView = () => {
    return (
        <Flex>
            <Text>No entry found.</Text>
        </Flex>
    );
};

const GameInfoCarousel = ({ games, isLoading, isError, ...others }: IGameInfoCarouselProps) => {
    if (isError) {
        return buildErrorView();
    }

    if ((!isLoading && games == undefined) || games?.length === 0) {
        return buildErrorView();
    }

    return (
        <Carousel
            slideSize={"65%"}
            height={"fit-content"}
            align="start"
            slideGap={"xs"}
            withControls={false}
            withIndicators={false}
            dragFree
            {...others}
        >
            {isLoading ? buildSkeletons() : buildGamesFigures(games)}
        </Carousel>
    );
};

export default GameInfoCarousel;
