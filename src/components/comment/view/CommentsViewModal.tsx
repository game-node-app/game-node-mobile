import { BaseModalProps } from "@/util/types/modal-props";
import React from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from "@ionic/react";
import CommentsListView, { CommentsListViewProps } from "@/components/comment/view/CommentsListView";
import { Container, Space, Stack } from "@mantine/core";
import CommentEditorView from "@/components/comment/editor/CommentEditorView";

type Props = BaseModalProps & CommentsListViewProps;

/**
 * Modal that shows both a comment's list for the target source and a comment editor to create new comments.
 * @param onClose
 * @param opened
 * @param others
 * @constructor
 */
const CommentsViewModal = ({ onClose, opened, ...others }: Props) => {
    return (
        <IonModal isOpen={opened} onDidDismiss={onClose} initialBreakpoint={0.75} breakpoints={[0.5, 0.75, 1]}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton onClick={() => onClose()}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"my-4"}>
                    <Stack className={"w-full gap-6"}>
                        <CommentsListView {...others} />
                        <CommentEditorView sourceType={others.sourceType} sourceId={others.sourceId} />
                    </Stack>
                </Container>
            </IonContent>
        </IonModal>
    );
};

export default CommentsViewModal;
