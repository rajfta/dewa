import {
    Box,
    Button as ChakraButton,
    Link as ChakraLink,
    Flex,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useCookieConsent } from "../hooks";

const CookieConsent: FC = () => {
    const t = useTranslations("cookieConsent");
    const { shouldShowBanner, acceptCookies, declineCookies } =
        useCookieConsent();

    if (!shouldShowBanner) return null;

    return (
        <Box
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            zIndex="banner"
            backgroundColor="background"
            borderTop="1px solid"
            borderColor="blackAlpha.200"
            boxShadow="0 -4px 24px rgba(0, 0, 0, 0.12)"
            px={[4, 4, 8]}
            py={4}
            role="region"
            aria-label={t("title")}
        >
            <Flex
                direction={["column", "column", "row"]}
                align={["stretch", "stretch", "center"]}
                justify="space-between"
                gap={4}
                maxW="6xl"
                mx="auto"
            >
                <Text fontSize="sm" maxW="3xl">
                    {t("message")}{" "}
                    <Link href="/privacy" passHref legacyBehavior>
                        <ChakraLink textDecoration="underline">
                            {t("privacyPolicy")}
                        </ChakraLink>
                    </Link>
                </Text>

                <Flex gap={3} flexShrink={0}>
                    <ChakraButton
                        onClick={declineCookies}
                        variant="ghost"
                        size="sm"
                        flex={[1, 1, "initial"]}
                    >
                        {t("decline")}
                    </ChakraButton>
                    <ChakraButton
                        onClick={acceptCookies}
                        colorScheme="blue"
                        size="sm"
                        flex={[1, 1, "initial"]}
                    >
                        {t("accept")}
                    </ChakraButton>
                </Flex>
            </Flex>
        </Box>
    );
};

export default CookieConsent;
