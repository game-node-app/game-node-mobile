import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import React from "react";
import Session from "supertokens-auth-react/recipe/session";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import ThirdParty, { Discord } from "supertokens-auth-react/recipe/thirdparty";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import { Capacitor } from "@capacitor/core";
import capacitorCookieHandler from "@/util/capacitorCookieHandler";
import { APP_BUNDLE_URL } from "@/util/constants";

/**
 * @see https://github.com/RobSchilderr/nextjs-native-starter/blob/main/apps/next-app/config/frontendConfig.ts
 */
export const frontendConfig = (): SuperTokensConfig => {
    const PARSED_WEBSITE_DOMAIN = Capacitor.isNativePlatform()
        ? APP_BUNDLE_URL
        : import.meta.env.VITE_PUBLIC_DOMAIN_WEBSITE;

    return {
        appInfo: {
            appName: "GameNode",
            apiDomain: import.meta.env.VITE_PUBLIC_DOMAIN_SERVER as string,
            websiteDomain: PARSED_WEBSITE_DOMAIN,
            apiBasePath: "/v1/auth",
            websiteBasePath: "/auth",
        },
        cookieHandler: capacitorCookieHandler,
        getRedirectionURL: async (context) => {
            if (context.action === "SUCCESS" && context.newSessionCreated) {
                if (context.redirectToPath !== undefined) {
                    // refirectToPath was specified
                }
                if (context.createdNewUser) {
                    // user signed up
                } else {
                    // user signed in
                }

                return "/home";
            } else if (context.action === "TO_AUTH") {
                return "/auth";
            }
            return undefined;
        },

        recipeList: [
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [Discord.init()],
                },
                override: {
                    functions: (oI) => {
                        return {
                            ...oI,
                            getAuthorisationURLFromBackend: async (input) => {
                                console.log("getAuthorisationURLFromBackend -> input: ", input);
                                const result = await oI.getAuthorisationURLFromBackend(input);
                                console.log("getAuthorisationURLFromBackend -> result: ", result);
                                return result;
                            },
                        };
                    },
                },
            }),
            Passwordless.init({
                contactMethod: "EMAIL",
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
