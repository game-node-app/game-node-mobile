import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import React from "react";
import TabHeader from "@/components/general/TabHeader";
import { Container, Stack } from "@mantine/core";
import TrendingReviewCarousel from "@/components/review/trending/TrendingReviewCarousel";
import { DetailsBox } from "@/components/general/DetailsBox";
import RecentActivityList from "@/components/activity/RecentActivityList";
import RecommendationCarousel from "@/components/recommendation/carousel/RecommendationCarousel";
import useUserId from "@/components/auth/hooks/useUserId";

const HomePage = () => {
    const userId = useUserId();
    return (
        <IonPage>
            <TabHeader title={"Home"} />
            <IonContent>
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
                            title={"Recent activity from our users"}
                            stackProps={{
                                className: "",
                            }}
                        >
                            <RecentActivityList limit={10} />
                        </DetailsBox>
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
