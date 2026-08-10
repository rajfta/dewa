import Script from "next/script";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "../lib/consent";

/**
 * Loads gtag.js. Consent Mode v2 defaults are queued earlier, from the document
 * head (see `consentBootstrapScript`), so GA4 starts in a cookieless state and
 * only sets analytics cookies once the visitor accepts in the consent banner.
 */
const Analytics = () => {
    if (!isAnalyticsEnabled()) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            {/* biome-ignore lint/correctness/useUniqueElementIds: next/script needs a stable id to dedupe inline script execution across navigations - a useId() value would change and re-run the tag */}
            <Script id="ga4-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>
        </>
    );
};

export default Analytics;
