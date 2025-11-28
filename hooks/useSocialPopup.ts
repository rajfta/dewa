import { useEffect, useState } from "react";

const SOCIAL_POPUP_KEY = "dewa-social-popup-dismissed";
const DAYS_UNTIL_SHOW_AGAIN = 30;
const SCROLL_THRESHOLD_PERCENT = 50;

export const useSocialPopup = () => {
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const [hasScrolledPastThreshold, setHasScrolledPastThreshold] =
        useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Check if popup was dismissed within the last 30 days
        const dismissedAt = localStorage.getItem(SOCIAL_POPUP_KEY);
        if (dismissedAt) {
            const dismissedDate = new Date(dismissedAt);
            const now = new Date();
            const daysSinceDismissed = Math.floor(
                (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24),
            );

            if (daysSinceDismissed < DAYS_UNTIL_SHOW_AGAIN) {
                return;
            }
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent >= SCROLL_THRESHOLD_PERCENT) {
                setHasScrolledPastThreshold(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (hasScrolledPastThreshold) {
            setShouldShowDialog(true);
        }
    }, [hasScrolledPastThreshold]);

    const dismissPopup = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem(SOCIAL_POPUP_KEY, new Date().toISOString());
            setShouldShowDialog(false);
        }
    };

    return {
        shouldShowDialog,
        dismissPopup,
    };
};
