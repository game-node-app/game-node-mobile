import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import React, { useRef, useState } from "react";
import { Container, Stack } from "@mantine/core";
import TrendingReviewCarousel from "@/components/review/trending/TrendingReviewCarousel";
import { DetailsBox } from "@/components/general/DetailsBox";
import RecentActivityList from "@/components/activity/RecentActivityList";
import RecommendationCarousel from "@/components/recommendation/carousel/RecommendationCarousel";
import useUserId from "@/components/auth/hooks/useUserId";
import ActivityFeed from "@/components/activity/ActivityFeed";
import { IconArrowUp } from "@tabler/icons-react";
import ActivityFeedLayout, { ActivityFeedTabValue } from "@/components/activity/ActivityFeedLayout";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import { Link } from "react-router-dom";

const HomePage = () => {
    const userId = useUserId();
    const contentRef = useRef<HTMLIonContentElement>(null);
    const [selectedActivityTab, setSelectedActivityTab] = useState<ActivityFeedTabValue>("all");
    return (
        <IonPage>
            <IonContent fixedSlotPlacement="before" ref={contentRef}>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton
                        onClick={() => {
                            contentRef.current?.scrollToTop(500);
                        }}
                    >
                        <IconArrowUp />
                    </IonFabButton>
                </IonFab>
                <Container fluid className={"w-full my-4"}>
                    <Stack className={"w-full gap-8"}>
                        {userId && (
                            <RecommendationCarousel
                                criteria={"finished"}
                                stackProps={{
                                    className: "",
                                }}
                            />
                        )}
                        <TrendingReviewCarousel />

                        {userId && (
                            <>
                                <RecommendationCarousel
                                    criteria={"theme"}
                                    stackProps={{
                                        className: "",
                                    }}
                                />
                                <RecommendationCarousel
                                    criteria={"genre"}
                                    stackProps={{
                                        className: "",
                                    }}
                                />
                            </>
                        )}

                        <DetailsBox
                            title={"Activity from our users"}
                            stackProps={{
                                className: "",
                            }}
                        >
                            <ActivityFeedLayout currentTab={selectedActivityTab} onChange={setSelectedActivityTab}>
                                <ActivityFeed criteria={selectedActivityTab} />
                            </ActivityFeedLayout>
                        </DetailsBox>
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
