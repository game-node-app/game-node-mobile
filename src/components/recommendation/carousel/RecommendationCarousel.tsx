import React, { ComponentProps } from "react";
import { RecommendationCriteria, useRecommendations } from "@/components/recommendation/hook/useRecommendations";
import { DetailsBox } from "@/components/general/DetailsBox";
import { Carousel } from "@mantine/carousel";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import { useGames } from "@/components/game/hooks/useGames";
import useUserId from "@/components/auth/hooks/useUserId";

interface Props {
    criteria: RecommendationCriteria;
    limit?: number;
}

const RecommendationCarousel = ({ criteria, limit = 10 }: Props) => {
    const recommendationsQuery = useRecommendations(criteria, limit);
    const gamesQuery = useGames({
        gameIds: recommendationsQuery.data?.gameIds,
        relations: {
            cover: true,
        },
    });

    const isEmpty = recommendationsQuery.data == undefined || recommendationsQuery.data.gameIds.length === 0;

    if (isEmpty) {
        return null;
    }

    return (
        <GameInfoCarousel
            games={gamesQuery.data}
            isLoading={recommendationsQuery.isLoading || gamesQuery.isLoading}
            isError={recommendationsQuery.isError || gamesQuery.isLoading}
            slideSize={"45%"}
        ></GameInfoCarousel>
    );
};

export default RecommendationCarousel;
