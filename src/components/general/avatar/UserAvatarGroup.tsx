import { AvatarProps, Group, GroupProps, Text, TextProps } from "@mantine/core";
import { UserAvatar } from "@/components/general/avatar/UserAvatar";
import React from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import Break from "@/components/general/Break";
import { Link } from "react-router-dom";
import { getTabAwareHref } from "@/util/getCommonRouteHref";
import { useIonRouter } from "@ionic/react";

interface IProps {
    userId: string;
    avatarProps?: AvatarProps;
    groupProps?: GroupProps;
    textProps?: TextProps;
    withHorizontalBreak?: boolean;
}

export const UserAvatarGroup = ({ userId, avatarProps, groupProps, textProps, withHorizontalBreak }: IProps) => {
    const {
        routeInfo: { pathname },
    } = useIonRouter();
    const profileQuery = useUserProfile(userId);
    const onMobile = useOnMobile();
    return (
        <Link to={getTabAwareHref(pathname, `/profile/${profileQuery.data?.userId}`)} className={"w-full h-full"}>
            <Group
                wrap={onMobile ? "nowrap" : "wrap"}
                gap={onMobile ? undefined : 5}
                w={"100%"}
                h={"100%"}
                {...groupProps}
            >
                <UserAvatar {...avatarProps} userId={userId} />
                {withHorizontalBreak && <Break />}
                <Text c={"white"} lineClamp={2} className={"break-words"} {...textProps}>
                    {profileQuery.data?.username}
                </Text>
            </Group>
        </Link>
    );
};
