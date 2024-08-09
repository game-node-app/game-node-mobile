import React, { useState } from "react";

import { Redirect, Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
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
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import SuperTokensProvider from "./components/auth/SuperTokensProvider";
import { IconHome, IconLibrary, IconRouteAltLeft, IconUser } from "@tabler/icons-react";
import { OpenAPI as ServerOpenAPI } from "@/wrapper/server";
import { OpenAPI as SearchOpenAPI } from "@/wrapper/search";
import ExplorePage from "@/pages/explore";
import SearchResultsPage from "@/pages/search_results";
import GamePage from "@/pages/game";
import HomePage from "./pages/home";
import ProfilePage from "@/pages/profile";
import { getCommonRoutes } from "./pages/routes/getCommonRoutes";
import LibraryPage from "./pages/library";
import NotificationsManager from "./components/general/NotificationsManager";

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
                        refetchInterval: false,
                        refetchOnMount: false,
                        refetchIntervalInBackground: false,
                        refetchOnReconnect: false,
                        staleTime: Infinity,
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
                                    {/*This renders the login UI on the /auth route*/}
                                    {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
                                        ThirdPartyPreBuiltUI,
                                        PasswordlessPreBuiltUI,
                                    ])}
                                    {/* ---- HOME ROUTES ---- */}
                                    <Route exact path="/">
                                        <Redirect to="/home" />
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
                                </IonRouterOutlet>
                                <IonTabBar slot="bottom">
                                    <IonTabButton tab="home" href="/home">
                                        <IconHome aria-hidden={"true"} />
                                        <IonLabel>Home</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="explore" href="/explore">
                                        <IconRouteAltLeft aria-hidden={"true"} />
                                        <IonLabel>Explore</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="profile" href="/profile">
                                        <IconUser aria-hidden={"true"} />
                                        <IonLabel>Profile</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="library" href="/library">
                                        <IconLibrary aria-hidden={"true"} />
                                        <IonLabel>Library</IonLabel>
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
