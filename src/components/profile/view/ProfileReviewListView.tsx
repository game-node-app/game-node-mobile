import React, { useEffect, useMemo, useRef, useState } from "react";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useUserId from "@/components/auth/hooks/useUserId";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import { Stack, Text } from "@mantine/core";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import { ParsedUrlQuery } from "querystring";
import { TBasePaginationRequest } from "@/util/types/pagination";
import useReviewsForUserId from "@/components/review/hooks/useReviewsForUserId";
import GameViewPagination from "@/components/game/view/GameViewPagination";

const DEFAULT_LIMIT = 7;

const urlQueryToDto = (query: ParsedUrlQuery): TBasePaginationRequest => {
    const dto: TBasePaginationRequest = {
        offset: 0,
        limit: DEFAULT_LIMIT,
    };
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
        const offsetAsPage = dto.offset > limitToUse ? Math.ceil((dto.offset + 1) / limitToUse) : 1;
        searchParams.set("page", `${offsetAsPage}`);
    }
    return searchParams;
};

interface IUserViewListView {
    userId: string;
}

const ProfileReviewListView = ({ userId }: IUserViewListView) => {
    const ownUserId = useUserId();
    const [offset, setOffset] = useState(0);
    const reviewsQuery = useReviewsForUserId(userId, offset, DEFAULT_LIMIT);

    const isEmpty = reviewsQuery.data == undefined || reviewsQuery.data.data.length === 0;
    const isLoading = reviewsQuery.isLoading;
    const isError = reviewsQuery.isError;

    const handlePagination = (page: number) => {
        const offset = (page - 1) * DEFAULT_LIMIT;
        setOffset(offset);
    };

    const items = useMemo(() => {
        return reviewsQuery.data?.data.map((review) => {
            return <ReviewListItem key={review.id} review={review} withGameInfo />;
        });
    }, [reviewsQuery.data]);

    const offsetAsPage = offset >= DEFAULT_LIMIT ? Math.ceil(offset + 1 / DEFAULT_LIMIT) : 1;

    if (isLoading) {
        return <CenteredLoading />;
    } else if (isError) {
        return <CenteredErrorMessage message={"Failed to fetch reviews. Please try again."} />;
    } else if (isEmpty) {
        if (userId != undefined && userId === ownUserId) {
            return <Text className={"text-center"}>You have no reviews. Make your first one 😉</Text>;
        }
        return <Text className={"text-center"}>User has no reviews.</Text>;
    }
    return (
        <Stack w={"100%"} justify={"space-between"}>
            <Stack w={"100%"} align={"start"}>
                {items}
            </Stack>
            {!isEmpty && (
                <GameViewPagination
                    page={offsetAsPage}
                    paginationInfo={reviewsQuery.data?.pagination}
                    onPaginationChange={handlePagination}
                />
            )}
        </Stack>
    );
};

export default ProfileReviewListView;
