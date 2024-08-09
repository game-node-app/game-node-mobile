import React, { useMemo } from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentService, FindAllCommentsDto } from "@/wrapper/server";
import { notifications } from "@mantine/notifications";
import { UserComment } from "@/components/comment/types";
import ActionConfirm from "@/components/general/ActionConfirm";

interface Props extends BaseModalProps {
    comment: UserComment;
}

const CommentsRemoveModal = ({ opened, onClose, comment }: Props) => {
    const queryClient = useQueryClient();

    const sourceType = useMemo(() => {
        if (comment.reviewId != undefined) {
            return FindAllCommentsDto.sourceType.REVIEW;
        }

        return FindAllCommentsDto.sourceType.REVIEW;
    }, [comment]);

    const sourceId = useMemo(() => {
        if (comment.reviewId != undefined) {
            return comment.reviewId;
        }

        return undefined;
    }, [comment]);

    const commentRemoveMutation = useMutation({
        mutationFn: async (commentId: string) => {
            return CommentService.commentControllerDelete(commentId, {
                sourceType,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", sourceType, sourceId],
            });
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Successfully removed your comment!",
            });
        },
    });

    return (
        <ActionConfirm
            opened={opened}
            isDestructive={true}
            onClose={onClose}
            title="Are you sure you want to remove this comment?"
            onConfirm={() => {
                commentRemoveMutation.mutate(comment.id);
            }}
        />
    );
};

export default CommentsRemoveModal;
