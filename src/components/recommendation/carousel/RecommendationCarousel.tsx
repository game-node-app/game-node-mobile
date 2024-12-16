import React, { ComponentProps, useMemo } from "react";
import { RecommendationCriteria, useRecommendations } from "@/components/recommendation/hook/useRecommendations";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import { useGames } from "@/components/game/hooks/useGames";
import { useGamesResource } from "@/components/game/hooks/useGamesResource";

interface Props extends Omit<ComponentProps<typeof DetailsBox>, "title"> {
    title?: string;
    criteria: RecommendationCriteria;
    limit?: number;
}

const RecommendationCarousel = ({ criteria, limit = 10, ...others }: Props) => {
    const recommendationsQuery = useRecommendations(criteria, limit);
    const gamesQuery = useGames({
        gameIds: recommendationsQuery.data?.gameIds,
        relations: {
            cover: true,
        },
    });

    const isEmpty = recommendationsQuery.data == undefined || recommendationsQuery.data.gameIds.length === 0;

    const resourceQuery = useGamesResource(criteria === "genre" ? "genres" : "themes", criteria !== "finished");

    const criteriaTitle = useMemo(() => {
        if (criteria === "finished") {
            return "Based on your played games";
        } else if (resourceQuery.data == undefined || recommendationsQuery.data == undefined) {
            return "";
        }

        const matchingCriteria = resourceQuery.data.find((item) => item.id === recommendationsQuery.data.criteriaId);

        return `${matchingCriteria?.name} games you may like`;
    }, [criteria, recommendationsQuery.data, resourceQuery.data]);

    return (
        <DetailsBox enabled={!isEmpty} title={criteriaTitle} {...others}>
            <GameInfoCarousel
                games={gamesQuery.data}
                isLoading={recommendationsQuery.isLoading || gamesQuery.isLoading}
                isError={recommendationsQuery.isError || gamesQuery.isLoading}
            ></GameInfoCarousel>
        </DetailsBox>
    );
};

export default RecommendationCarousel;
