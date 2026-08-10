import { useEffect, useState } from "react";
import {
    COOKIE_CONSENT_KEY,
    type ConsentState,
    isAnalyticsEnabled,
} from "../lib/consent";

type Gtag = (...args: unknown[]) => void;

const updateGoogleConsent = (state: ConsentState) => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") {
        gtag("consent", "update", { analytics_storage: state });
    }
};

export const useCookieConsent = () => {
    const [shouldShowBanner, setShouldShowBanner] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Without a tag there is nothing to consent to, so stay out of the way.
        if (!isAnalyticsEnabled()) return;

        try {
            if (!window.localStorage.getItem(COOKIE_CONSENT_KEY)) {
                setShouldShowBanner(true);
            }
        } catch (_error) {
            // Storage blocked (private mode, hardened browser): consent can
            // never be persisted, so leave storage denied and skip the banner.
        }
    }, []);

    const respond = (state: ConsentState) => {
        try {
            window.localStorage.setItem(COOKIE_CONSENT_KEY, state);
        } catch (_error) {
            // Choice can't be remembered, but still honour it for this session.
        }
        updateGoogleConsent(state);
        setShouldShowBanner(false);
    };

    return {
        shouldShowBanner,
        acceptCookies: () => respond("granted"),
        declineCookies: () => respond("denied"),
    };
};
