import { Button, HStack, Image, Text } from "@chakra-ui/react";
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
