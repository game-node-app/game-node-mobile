import React from "react";
import type { ReviewComment } from "@/wrapper/server";
import { EditorContent, useEditor } from "@tiptap/react";
import { COMMENT_EDITOR_EXTENSIONS } from "@/components/comment/editor/CommentEditor";
import { Flex, Group, ScrollArea, Stack } from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { UserAvatarGroup } from "@/components/general/avatar/UserAvatarGroup";
import ActivityCreateDate from "@/components/activity/item/ActivityCreateDate";
import CommentsListItemActions from "@/components/comment/view/CommentsListItemActions";

interface Props {
    comment: ReviewComment;
    onEditStart: (commentId: string) => void;
}

const CommentsListItem = ({ comment, onEditStart }: Props) => {
    const onMobile = useOnMobile();

    const nonEditableEditor = useEditor(
        {
            extensions: COMMENT_EDITOR_EXTENSIONS,
            editable: false,
            content: comment.content,
        },
        [comment.content],
    );

    if (!nonEditableEditor) return;

    return (
        <Stack className={"w-full h-full"}>
            <Group w={"100%"} justify={"space-evenly"} wrap={"wrap"}>
                <Group className={"w-full flex-nowrap justify-between"}>
                    <Flex
                        justify={{
                            base: "space-between",
                            lg: "start",
                        }}
                        align={{
                            base: "center",
                            lg: "start",
                        }}
                    >
                        <UserAvatarGroup
                            avatarProps={{
                                size: onMobile ? "lg" : "xl",
                            }}
                            userId={comment.profileUserId}
                            groupProps={{
                                gap: "md",
                            }}
                        />
                    </Flex>

                    <ActivityCreateDate createdAtDate={comment.createdAt} />
                </Group>

                <Stack className={"w-full"}>
                    <ScrollArea.Autosize mah={250}>
                        <EditorContent editor={nonEditableEditor} className={"w-full"} />
                    </ScrollArea.Autosize>
                </Stack>
                <Stack className={"w-full"}>
                    <CommentsListItemActions comment={comment} onEditStart={onEditStart} />
                </Stack>
            </Group>
        </Stack>
    );
};

export default CommentsListItem;
