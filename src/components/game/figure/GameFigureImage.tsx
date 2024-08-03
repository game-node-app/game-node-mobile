import React, { PropsWithChildren, useEffect, useState } from "react";
import { AspectRatio, Image, ImageProps, Skeleton, SkeletonProps } from "@mantine/core";
import { getSizedImageUrl, ImageSize } from "@/components/game/util/getSizedImageUrl";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { getCoverUrl } from "@/components/game/util/getCoverUrl";
import { Link } from "react-router-dom";
import { useIonRouter } from "@ionic/react";

export interface IGameFigureProps extends PropsWithChildren {
    game: TGameOrSearchGame | undefined;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    imageProps?: ImageProps;
    linkProps?: React.HTMLProps<HTMLAnchorElement>;
}

/**
 * This component is the base building block for anything related to showing a game's metadata.
 * It only handles logic related to image loading (skeletons, etc.).
 *
 * @param metadata
 * @param href
 * @constructor
 */
const GameFigureImage = ({ game, imageProps, linkProps, onClick, children }: IGameFigureProps) => {
    const { routeInfo } = useIonRouter();
    const coverUrl = getCoverUrl(game);
    const sizedCoverUrl = getSizedImageUrl(coverUrl, ImageSize.COVER_BIG);

    const defaultHref = routeInfo.tab ? `/${routeInfo.tab}/game/${game?.id}` : `${routeInfo.pathname}/game/${game?.id}`;
    return (
        <Link to={defaultHref} className="w-full h-auto" onClick={onClick} {...linkProps}>
            <AspectRatio ratio={264 / 354} pos="relative" h={"100%"} w={"auto"}>
                <Image
                    radius={"sm"}
                    src={sizedCoverUrl || "/img/game_placeholder.jpeg"}
                    alt={"Game cover"}
                    className="w-full h-auto max-h-full"
                    {...imageProps}
                />
                {children}
            </AspectRatio>
        </Link>
    );
};

export default GameFigureImage;
