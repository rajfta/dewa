import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useAlternateLocale } from "../hooks";

type LanguageSwitcherProps = {
    textColor?: string;
    separatorColor?: string;
    hoverBg?: string;
    size?: "xs" | "sm" | "md" | "lg";
    compact?: boolean;
};

// Map dynamic content routes to their listing page fallbacks
const CONTENT_ROUTE_FALLBACKS: Record<string, string> = {
    "/cikkek/[slug]": "/cikkek",
    "/referenciak/[slug]": "/referenciak",
};

const LOCALE_STORAGE_KEY = "preferredLocale";

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
    textColor = "white",
    separatorColor = "whiteAlpha.500",
    hoverBg = "whiteAlpha.200",
    size = "xs",
    compact = false,
}) => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const { alternatePath } = useAlternateLocale();

    const changeLanguage = (newLocale: string) => {
        // Store preference so it persists across back/forward navigation
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);

        // Use replace instead of push so the back button doesn't cycle through language switches
        // If an alternate path is explicitly set (e.g., from frontmatter translation link), use it
        if (alternatePath) {
            router.replace(alternatePath, alternatePath, { locale: newLocale });
            return;
        }

        // For content pages without explicit translation, fall back to listing page
        const fallbackPath = CONTENT_ROUTE_FALLBACKS[pathname];
        if (fallbackPath) {
            router.replace(fallbackPath, fallbackPath, { locale: newLocale });
            return;
        }

        // Default behavior: same path with new locale
        router.replace({ pathname, query }, asPath, { locale: newLocale });
    };

    if (compact) {
        return (
            <HStack spacing={1}>
                <Button
                    size={size}
                    variant="ghost"
                    onClick={() => changeLanguage("hu")}
                    opacity={locale === "hu" ? 1 : 0.5}
                    color={textColor}
                    px={1.5}
                    _hover={{
                        opacity: 1,
                        bg: hoverBg,
                    }}
                    aria-label="Switch to Hungarian"
                >
                    <Image
                        src="/flags/hu.svg"
                        alt="HU flag"
                        width="24px"
                        height="12px"
                    />
                </Button>
                <Button
                    size={size}
                    variant="ghost"
                    onClick={() => changeLanguage("en")}
                    opacity={locale === "en" ? 1 : 0.5}
                    color={textColor}
                    px={1.5}
                    _hover={{
                        opacity: 1,
                        bg: hoverBg,
                    }}
                    aria-label="Switch to English"
                >
                    <Image
                        src="/flags/us.svg"
                        alt="EN flag"
                        width="20px"
                        height="20px"
                    />
                </Button>
            </HStack>
        );
    }

    // Full mode: show both languages
    return (
        <HStack spacing={2}>
            <Button
                size={size}
                variant="ghost"
                onClick={() => changeLanguage("hu")}
                fontWeight={locale === "hu" ? 700 : 400}
                opacity={locale === "hu" ? 1 : 0.6}
                color={textColor}
                px={2}
                _hover={{
                    opacity: 1,
                    bg: hoverBg,
                }}
                leftIcon={
                    <Image
                        src="/flags/hu.svg"
                        alt="HU flag"
                        width="16px"
                        height="16px"
                    />
                }
            >
                HU
            </Button>
            <Text color={separatorColor} fontSize="sm">
                |
            </Text>
            <Button
                size={size}
                variant="ghost"
                onClick={() => changeLanguage("en")}
                fontWeight={locale === "en" ? 700 : 400}
                opacity={locale === "en" ? 1 : 0.6}
                color={textColor}
                px={2}
                _hover={{
                    opacity: 1,
                    bg: hoverBg,
                }}
                leftIcon={
                    <Image
                        src="/flags/us.svg"
                        alt="EN flag"
                        width="16px"
                        height="16px"
                    />
                }
            >
                EN
            </Button>
        </HStack>
    );
};

export default LanguageSwitcher;
