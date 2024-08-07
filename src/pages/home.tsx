import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import React from "react";
import TabHeader from "@/components/general/TabHeader";
import { Container, Stack, Text } from "@mantine/core";
import TrendingReviewCarousel from "@/components/review/trending/TrendingReviewCarousel";
import { DetailsBox } from "@/components/general/DetailsBox";
import RecentActivityList from "@/components/activity/RecentActivityList";
import { useQuery } from "@tanstack/react-query";
import { RecommendationService } from "@/wrapper/server";
import RecommendationCarousel from "@/components/recommendation/carousel/RecommendationCarousel";
import useUserId from "@/components/auth/hooks/useUserId";

const HomePage = () => {
    const userId = useUserId();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <TabHeader />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Container fluid className={"w-full my-4"}>
                    <Stack className={"w-full"}>
                        {userId && (
                            <RecommendationCarousel
                                criteria={"finished"}
                                stackProps={{
                                    className: "",
                                }}
                            />
                        )}
                        <TrendingReviewCarousel />

                        <DetailsBox
                            title={"Recent Activity"}
                            stackProps={{
                                className: "",
                            }}
                        >
                            <RecentActivityList limit={5} />
                        </DetailsBox>
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
                    </Stack>
                </Container>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
