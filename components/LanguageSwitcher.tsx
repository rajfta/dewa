import { Button, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";

type LanguageSwitcherProps = {
    textColor?: string;
    separatorColor?: string;
    hoverBg?: string;
    size?: "xs" | "sm" | "md" | "lg";
    compact?: boolean;
};

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
    textColor = "white",
    separatorColor = "whiteAlpha.500",
    hoverBg = "whiteAlpha.200",
    size = "xs",
    compact = false,
}) => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const changeLanguage = (newLocale: string) => {
        // Navigate to new locale - Next.js i18n handles routing and cookie persistence
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    // Compact mode: show only the non-active language
    if (compact) {
        const targetLocale = locale === "hu" ? "en" : "hu";
        const flagSrc =
            targetLocale === "hu" ? "/flags/hu.svg" : "/flags/us.svg";
        const label = targetLocale === "hu" ? "HU" : "EN";

        return (
            <Button
                size={size}
                variant="ghost"
                onClick={() => changeLanguage(targetLocale)}
                color={textColor}
                px={2}
                _hover={{
                    bg: hoverBg,
                }}
                leftIcon={
                    <Image
                        src={flagSrc}
                        alt={`${label} flag`}
                        width={16}
                        height={16}
                    />
                }
            >
                {label}
            </Button>
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
                        width={16}
                        height={16}
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
                        width={16}
                        height={16}
                    />
                }
            >
                EN
            </Button>
        </HStack>
    );
};

export default LanguageSwitcher;
