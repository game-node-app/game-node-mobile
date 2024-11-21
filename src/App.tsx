import React, { Suspense, useState } from "react";

import { Redirect, Route } from "react-router-dom";
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./util/theme";

/**
 * Should always be imported BEFORE tailwind.
 */
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/charts/styles.css";

/**
 * Includes tailwind styles
 */
import "@/components/globals.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import "@ionic/react/css/palettes/dark.always.css";
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import "./theme/variables.css";
import SuperTokensProvider from "./components/auth/SuperTokensProvider";
import { IconBell, IconHome, IconLibrary, IconRouteAltLeft, IconSettings, IconUser } from "@tabler/icons-react";
import { OpenAPI as ServerOpenAPI } from "@/wrapper/server";
import { OpenAPI as SearchOpenAPI } from "@/wrapper/search";
import NotificationsManager from "./components/general/NotificationsManager";
import CenteredLoading from "@/components/general/CenteredLoading";
import { getCommonRoutes } from "@/pages/routes/getCommonRoutes";

import HomePage from "./pages/home";
import ExplorePage from "./pages/explore";
import SearchResultsPage from "./pages/search_results";
import ProfilePage from "./pages/profile/profile";
import LibraryPage from "./pages/library";
import NotificationsPage from "@/pages/notifications";
import PreferencesPage from "@/pages/preferences";
import NotificationsIcon from "@/components/notifications/NotificationsIcon";

/**
 * Basic configuration for wrapper services
 */
ServerOpenAPI.BASE = import.meta.env.VITE_PUBLIC_SERVER_URL!;
ServerOpenAPI.WITH_CREDENTIALS = true;
SearchOpenAPI.BASE = import.meta.env.VITE_PUBLIC_SEARCH_URL!;

setupIonicReact();

const App: React.FC = () => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 2,
                    },
                },
            }),
    );

    return (
        <IonApp>
            <MantineProvider theme={theme} forceColorScheme={"dark"}>
                <QueryClientProvider client={queryClient}>
                    <SuperTokensProvider>
                        <NotificationsManager />
                        <IonReactRouter>
                            <IonTabs>
                                <IonRouterOutlet>
                                    <Suspense fallback={<CenteredLoading message={"Loading page..."} />}>
                                        {/* ---- HOME ROUTES ---- */}
                                        <Route exact path="/">
                                            <Redirect to="/home" push={false} />
                                        </Route>
                                        <Route exact path={"/home"}>
                                            <HomePage />
                                        </Route>
                                        {getCommonRoutes("/home")}

                                        {/* ---- EXPLORE ROUTES ---- */}
                                        <Route exact path={"/explore"}>
                                            <ExplorePage />
                                        </Route>
                                        <Route exact path={`/explore/search_results`}>
                                            <SearchResultsPage />
                                        </Route>
                                        {getCommonRoutes("/explore")}

                                        {/* ---- PROFILE ROUTES ---- */}
                                        <Route exact path={"/profile"}>
                                            <ProfilePage />
                                        </Route>
                                        {getCommonRoutes("/profile")}
                                        {/* ---- LIBRARY ROUTES ---- */}
                                        <Route exact path="/library">
                                            <LibraryPage />
                                        </Route>
                                        {getCommonRoutes("/library")}
                                        {/* ---- LIBRARY ROUTES ---- */}
                                        <Route exact path="/notifications">
                                            <NotificationsPage />
                                        </Route>
                                        {getCommonRoutes("/notifications")}
                                        {/* ---- PREFERENCES ROUTES ---- */}
                                        <Route exact path="/preferences">
                                            <PreferencesPage />
                                        </Route>
                                        {getCommonRoutes("/preferences")}
                                    </Suspense>
                                </IonRouterOutlet>
                                <IonTabBar slot="bottom">
                                    <IonTabButton tab="home" href="/home">
                                        <IconHome aria-hidden={"true"} />
                                    </IonTabButton>
                                    <IonTabButton tab="explore" href="/explore">
                                        <IconRouteAltLeft aria-hidden={"true"} />
                                    </IonTabButton>

                                    <IonTabButton tab="library" href="/library">
                                        <IconLibrary aria-hidden={"true"} />
                                    </IonTabButton>
                                    <IonTabButton tab="profile" href="/profile">
                                        <IconUser aria-hidden={"true"} />
                                    </IonTabButton>
                                    <IonTabButton tab="notifications" href="/notifications">
                                        <NotificationsIcon />
                                    </IonTabButton>
                                    <IonTabButton tab="preferences" href="/preferences">
                                        <IconSettings aria-hidden={"true"} />
                                    </IonTabButton>
                                </IonTabBar>
                            </IonTabs>
                        </IonReactRouter>
                    </SuperTokensProvider>
                </QueryClientProvider>
            </MantineProvider>
        </IonApp>
    );
};

export default App;
