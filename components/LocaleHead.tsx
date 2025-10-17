import Head from "next/head";
import { useRouter } from "next/router";

type LocaleHeadProps = {
    title?: string;
    description?: string;
};

const LocaleHead = ({ title, description }: LocaleHeadProps) => {
    const router = useRouter();
    const { locales, locale, asPath } = router;

    // Get the full URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dewa.hu";
    const currentPath = asPath.split("?")[0]; // Remove query params

    return (
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}

            {/* Language alternates */}
            {locales?.map((loc) => {
                const href = `${baseUrl}/${loc}${currentPath}`;
                return (
                    <link
                        key={loc}
                        rel="alternate"
                        hrefLang={loc}
                        href={href}
                    />
                );
            })}

            {/* Default language (x-default) */}
            <link
                rel="alternate"
                hrefLang="x-default"
                href={`${baseUrl}/hu${currentPath}`}
            />

            {/* Canonical URL */}
            <link rel="canonical" href={`${baseUrl}/${locale}${currentPath}`} />

            {/* Open Graph locale tags */}
            <meta
                property="og:locale"
                content={locale === "hu" ? "hu_HU" : "en_US"}
            />
            {locales
                ?.filter((loc) => loc !== locale)
                .map((loc) => (
                    <meta
                        key={loc}
                        property="og:locale:alternate"
                        content={loc === "hu" ? "hu_HU" : "en_US"}
                    />
                ))}
        </Head>
    );
};

export default LocaleHead;
