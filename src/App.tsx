import React, { Suspense, useState } from "react";

import { Link, Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonFab,
    IonFabButton,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActionIcon, MantineProvider } from "@mantine/core";
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
import {
    IconBell,
    IconHome,
    IconLibrary,
    IconPlus,
    IconRouteAltLeft,
    IconSettings,
    IconUser,
} from "@tabler/icons-react";
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
import AppUrlListener from "./components/general/AppUrlListener";
import Tabs from "./Tabs";

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
                        <AppUrlListener />
                        <NotificationsManager />
                        <IonReactRouter>
                            <Tabs />
                            <IonFab slot="bottom" horizontal="center" vertical="bottom" edge={false}>
                                <IonFabButton routerLink={"/home"}>
                                    <IconPlus />
                                </IonFabButton>
                            </IonFab>
                        </IonReactRouter>
                    </SuperTokensProvider>
                </QueryClientProvider>
            </MantineProvider>
        </IonApp>
    );
};

export default App;
