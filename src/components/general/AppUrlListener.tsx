import React, { useEffect } from "react";
import { App, URLOpenListenerEvent } from "@capacitor/app";
import { useHistory } from "react-router-dom";

const getEquivalentDeepLink = (slug: string) => {
    // TODO: convert website url to tab-based layout
    let result = slug.replace("/m/", "");
    return result;
};

const AppUrlListener = () => {
    const history = useHistory();

    useEffect(() => {
        App.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
            // Example url: https://gamenode.app/profile/xxxxxxx/reviews
            // slug = /profile/xxxxxxx/reviews

            const slug = event.url.split(".app").pop();
            if (slug) {
                history.push(slug);
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    }, [history]);

    return null;
};

export default AppUrlListener;
