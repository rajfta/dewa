import { getRequestConfig } from "next-intl/server";

// Locale configuration for Pages Router
// Next.js handles routing via next.config.js i18n config
export const locales = ["en", "hu"] as const;
export const defaultLocale = "hu" as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as Locale)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
