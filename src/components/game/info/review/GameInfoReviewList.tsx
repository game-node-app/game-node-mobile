import React, { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Chip, ComboboxItem, Group, Pagination, Select, Stack, Tabs, Text } from "@mantine/core";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { TBasePaginationRequest } from "@/util/types/pagination";
import { DetailsBox } from "@/components/general/DetailsBox";
import useUserId from "@/components/auth/hooks/useUserId";
import { ParsedUrlQuery } from "querystring";
import { useTrendingReviews } from "@/components/statistics/hooks/useTrendingReviews";
import { FindStatisticsTrendingReviewsDto } from "@/wrapper/server";
import { useReviews } from "@/components/review/hooks/useReviews";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import { Carousel } from "@mantine/carousel";

interface IGameInfoReviewListProps {
    gameId: number;
}
// Should only be used for the actual request. Pagination is done client side.
const DEFAULT_LIMIT = 300;
const INTERNAL_DEFAULT_LIMIT = 7;

export const DEFAULT_GAME_REVIEW_LIST_VIEW_DTO: FindStatisticsTrendingReviewsDto = {
    offset: 0,
    limit: DEFAULT_LIMIT,
};

const urlQueryToDto = (query: ParsedUrlQuery): TBasePaginationRequest => {
    const dto: FindStatisticsTrendingReviewsDto = structuredClone(DEFAULT_GAME_REVIEW_LIST_VIEW_DTO);
    const { page } = query;
    if (page && typeof page === "string") {
        const pageInt = parseInt(page, 10);
        dto.offset = DEFAULT_LIMIT * (pageInt - 1);
    }

    return dto;
};

const queryDtoToSearchParams = (dto: TBasePaginationRequest) => {
    const searchParams = new URLSearchParams();
    const limitToUse = dto.limit || DEFAULT_LIMIT;
    if (dto.offset) {
        const offsetAsPage = dto.offset > limitToUse ? Math.ceil(dto.offset / limitToUse) : 1;
        searchParams.set("page", `${offsetAsPage}`);
    }
    return searchParams;
};

const GameInfoReviewList = ({ gameId }: IGameInfoReviewListProps) => {
    const [offset, setOffset] = useState(0);

    const trendingReviewsDto = useMemo((): FindStatisticsTrendingReviewsDto => {
        return {
            ...DEFAULT_GAME_REVIEW_LIST_VIEW_DTO,
            gameId: gameId,
            // reviewId: reviewId as string | undefined,
        };
    }, [gameId]);

    const trendingReviewsQuery = useTrendingReviews(trendingReviewsDto);

    const reviewsIds = trendingReviewsQuery.data?.data.map((s) => s.reviewId!);
    const reviewsQuery = useReviews(reviewsIds);

    const isEmpty = reviewsQuery.data == undefined || reviewsQuery.data.length === 0;
    const isLoading = trendingReviewsQuery.isLoading || reviewsQuery.isLoading;
    const isError = trendingReviewsQuery.isError || reviewsQuery.isError;

    const handlePagination = (page: number) => {
        const offset = (page - 1) * DEFAULT_LIMIT;
        setOffset(offset);
    };

    const buildItemSlides = useCallback(() => {
        if (reviewsQuery.data != undefined && Array.isArray(reviewsQuery.data)) {
            const totalPages = Math.ceil(reviewsQuery.data?.length / INTERNAL_DEFAULT_LIMIT);
            console.log("Total pages: ", totalPages);
            return new Array(totalPages).fill(0).map((v, i) => {
                const indexAsPage = i + 1;
                const sliceStart = indexAsPage > 1 ? indexAsPage * INTERNAL_DEFAULT_LIMIT - 1 : 0;
                const sliceEnd = sliceStart + INTERNAL_DEFAULT_LIMIT;

                return (
                    <Carousel.Slide key={i}>
                        {reviewsQuery.data?.slice(sliceStart, sliceEnd).map((review) => {
                            return <ReviewListItem key={review.id} review={review} />;
                        })}
                    </Carousel.Slide>
                );
            });
        }
    }, [reviewsQuery.data]);

    if (isLoading) {
        return <CenteredLoading />;
    } else if (isError) {
        return <CenteredErrorMessage message={"Failed to fetch reviews. Please try again."} />;
    }

    return (
        <DetailsBox title={"Reviews"}>
            <Stack w={"100%"} miw={"100%"}>
                <Carousel
                    slideSize="100%"
                    align="start"
                    slideGap={"xs"}
                    withControls={false}
                    withIndicators
                    onSlideChange={(slide) => {
                        const page = slide + 1;
                        handlePagination(page);
                    }}
                >
                    {/* ...slides */}
                    {buildItemSlides()}
                </Carousel>
            </Stack>
        </DetailsBox>
    );
};

export default GameInfoReviewList;
