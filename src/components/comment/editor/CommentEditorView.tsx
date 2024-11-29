import React, { MutableRefObject, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon, Box, Button, Group, LoadingOverlay, Stack, Text } from "@mantine/core";
import CommentEditor from "@/components/comment/editor/CommentEditor";
import { IconX } from "@tabler/icons-react";
import { Editor } from "@tiptap/core";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "@/wrapper/server";
import { CreateCommentDto } from "@/wrapper/server";
import { notifications } from "@mantine/notifications";
import { useComment } from "@/components/comment/hooks/useComment";
import CenteredLoading from "@/components/general/CenteredLoading";

interface Props {
    /**
     * If available, user will be able to modify this comment. <br>
     * Ideally, should be cleared when 'onCancel' is called.
     */
    commentId?: string;
    sourceType: CreateCommentDto.sourceType;
    sourceId: string;
    editorContainerRef?: RefObject<HTMLDivElement>;
    /**
     * Triggered when the user clicks the cancel or finishes submitting with success.
     */
    onEditEnd?: () => void;
}

const CommentEditorView = ({ commentId, sourceType, sourceId, editorContainerRef, onEditEnd }: Props) => {
    const queryClient = useQueryClient();
    const editorRef = useRef<Editor>();
    const commentQuery = useComment(commentId, sourceType);
    // const [shouldShowActionButtons, setShouldShowActionButtons] = useState<boolean>(false);

    const clearEditor = () => {
        editorRef.current?.commands.clearContent();
        // setShouldShowActionButtons(false);
    };

    const commentMutation = useMutation({
        mutationFn: async () => {
            if (editorRef.current == undefined) return;

            const content = editorRef.current?.getHTML();
            if (commentId) {
                return CommentService.commentControllerUpdateV1(commentId, {
                    sourceType,
                    content: content,
                });
            }

            return CommentService.commentControllerCreateV1({
                sourceId,
                sourceType,
                content: content,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Successfully submitted your comment!",
            });
            clearEditor();
            if (onEditEnd) onEditEnd();
        },
        onError: (err) => {
            notifications.show({
                color: "red",
                message: err.message,
            });
        },
    });

    const isUpdateAction = commentId != undefined && commentQuery.data != undefined;

    return (
        <Stack className={"w-full h-full relative"} ref={editorContainerRef}>
            {commentQuery.isLoading && <CenteredLoading />}
            {!commentQuery.isLoading && (
                <CommentEditor
                    content={commentQuery.data?.content}
                    onCreate={(props) => {
                        // eslint-disable-next-line react/prop-types
                        editorRef.current = props.editor;
                    }}
                />
            )}
            <Group className={"w-full justify-end"}>
                {isUpdateAction && (
                    <ActionIcon
                        size={"lg"}
                        variant={"default"}
                        onClick={() => {
                            clearEditor();
                            if (onEditEnd) onEditEnd();
                        }}
                    >
                        <IconX />
                    </ActionIcon>
                )}
                <Button
                    type={"button"}
                    loading={commentMutation.isPending}
                    onClick={() => {
                        commentMutation.mutate();
                    }}
                >
                    {isUpdateAction ? "Update" : "Submit"}
                </Button>
            </Group>
        </Stack>
    );
};

export default CommentEditorView;
