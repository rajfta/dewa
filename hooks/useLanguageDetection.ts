import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LANGUAGE_PREFERENCE_KEY = "dewa-language-preference-set";

export const useLanguageDetection = () => {
    const router = useRouter();
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const [detectedLocale, setDetectedLocale] = useState<string | null>(null);

    useEffect(() => {
        // Only run on client-side
        if (typeof window === "undefined") return;

        // Check if user has already made a language choice
        const preferenceSet = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
        if (preferenceSet === "true") {
            setShouldShowDialog(false);
            return;
        }

        // Detect browser language
        const browserLang =
            navigator.language || navigator.languages?.[0] || "";
        // Extract base locale (e.g., "en-US" → "en")
        const baseLocale = browserLang.split("-")[0].toLowerCase();
        setDetectedLocale(baseLocale);

        // Show dialog if:
        // 1. No preference set yet
        // 2. Browser language is not Hungarian
        // 3. Current site locale is Hungarian
        const currentLocale = router.locale || "hu";
        if (baseLocale !== "hu" && currentLocale === "hu") {
            setShouldShowDialog(true);
        }
    }, [router.locale]);

    const setLanguagePreference = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "true");
            setShouldShowDialog(false);
        }
    };

    return {
        shouldShowDialog,
        detectedLocale,
        currentLocale: router.locale || "hu",
        setLanguagePreference,
    };
};
