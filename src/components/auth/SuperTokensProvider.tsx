import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import React from "react";
import Session from "supertokens-auth-react/recipe/session";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import { Capacitor } from "@capacitor/core";
import { getTabAwareHref } from "@/util/getTabAwareHref";

export const frontendConfig = (): SuperTokensConfig => {
    const PARSED_WEBSITE_DOMAIN = Capacitor.isNativePlatform()
        ? `${window.location.protocol}//${window.location.host}`
        : import.meta.env.VITE_PUBLIC_DOMAIN_WEBSITE;

    return {
        appInfo: {
            appName: "GameNode",
            apiDomain: import.meta.env.VITE_PUBLIC_DOMAIN_SERVER as string,
            websiteDomain: PARSED_WEBSITE_DOMAIN,
            apiBasePath: "/v1/auth",
            websiteBasePath: "/profile/auth",
        },
        getRedirectionURL: async (context) => {
            if (context.action === "SUCCESS" && context.newSessionCreated) {
                if (context.redirectToPath !== undefined) {
                    // we are navigating back to where the user was before they authenticated
                    return context.redirectToPath;
                }
                if (context.createdNewUser) {
                    // user signed up
                    return "/wizard/init";
                } else {
                    // user signed in
                }
                return "/";
            } else if (context.action === "TO_AUTH") {
                return getTabAwareHref("/auth");
            }
            return undefined;
        },

        recipeList: [
            Passwordless.init({
                contactMethod: "EMAIL",
            }),
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [
                        // TODO: Enable once it's approved
                        // ThirdPartyPasswordlessReact.Google.init(),
                        ThirdParty.Discord.init(),
                    ],
                },
            }),
            Session.init({
                tokenTransferMethod: "header",
            }),
        ],
    };
};

if (typeof window !== "undefined") {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensReact.init(frontendConfig());
}

const SuperTokensProvider = ({ children }: { children: React.ReactNode }) => {
    return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

export default SuperTokensProvider;
