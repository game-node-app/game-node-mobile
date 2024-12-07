import React from "react";
import { ActionIcon, Box, Center, Container, Paper } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { IconCameraPlus } from "@tabler/icons-react";
import { getServerStoredUpload } from "@/util/getServerStoredImages";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditBannerUploader from "@/components/profile/edit/ProfileEditBannerUploader";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

interface ProfileBannerProps {
    userId: string;
    showEditButton?: boolean;
    customSource?: string;
}

const ProfileBanner = ({ userId, showEditButton = false, customSource }: ProfileBannerProps) => {
    const profile = useUserProfile(userId);

    const hasBanner = profile.data != undefined && profile.data.banner != undefined;

    const banner = profile.data?.banner;
    const bannerSrc = hasBanner ? getServerStoredUpload(`${banner?.filename}.${banner?.extension}`) : undefined;

    const [editBannerModalOpen, editBannerModalUtils] = useDisclosure();

    return (
        <Box className={"w-full h-full bg-[#161616] p-4"}>
            <Paper
                style={{
                    backgroundColor: "#161616",
                    backgroundImage: `url(${customSource ? customSource : bannerSrc})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                }}
                className={"w-full min-h-48 relative"}
            >
                <IonModal isOpen={editBannerModalOpen} onDidDismiss={editBannerModalUtils.close}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Update your profile banner</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={editBannerModalUtils.close}>Cancel</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Container fluid className={"my-4"}>
                            <ProfileEditBannerUploader onClose={editBannerModalUtils.close} />
                        </Container>
                    </IonContent>
                </IonModal>
                {showEditButton && (
                    <Center
                        className={"absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bottom-1/2"}
                    >
                        <ActionIcon
                            size={"xl"}
                            radius="xl"
                            variant={"default"}
                            onClick={editBannerModalUtils.open}
                            className={""}
                        >
                            <IconCameraPlus />
                        </ActionIcon>
                    </Center>
                )}
            </Paper>
        </Box>
    );
};

export default ProfileBanner;
