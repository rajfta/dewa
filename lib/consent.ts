// GA4 measurement IDs are public (they ship in the page source), so the DEWA
// property ID is kept as the default. Override with NEXT_PUBLIC_GA_ID to point
// a staging deployment at a different property.
export const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_ID ?? "G-QYN7MMFWHY";

export const COOKIE_CONSENT_KEY = "dewa-cookie-consent";

export type ConsentState = "granted" | "denied";

// Analytics is only tagged in production builds so local development doesn't
// pollute the property with test traffic.
export const isAnalyticsEnabled = () =>
    process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID);

/**
 * Runs in the document head, before gtag.js loads, so that Google Consent Mode
 * v2 defaults are queued on the dataLayer before any measurement request is
 * made. Storage starts denied; a previously granted choice is replayed straight
 * away to avoid a consent flicker on repeat visits.
 */
export const consentBootstrapScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
});
try {
    if (window.localStorage.getItem('${COOKIE_CONSENT_KEY}') === 'granted') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
    }
} catch (e) {}
`;
