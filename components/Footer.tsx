import {
    Link as ChakraLink,
    Flex,
    Grid,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useContact } from "../hooks";
import type { PartnerType } from "../types";
import { DotsIcon, MailIcon, MapIcon, TelephoneIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./uikit";

const Separator = () => {
    return <Flex w="100%" h="1px" my={[10, 10, 20]} bg="whiteAlpha.300" />;
};

const Footer = () => {
    const { onOpen } = useContact();
    const t = useTranslations("footer");
    const [partners, setPartners] = useState<PartnerType[]>([]);

    // Fetch partners from static JSON file (generated at build time)
    useEffect(() => {
        fetch("/data/partners.json")
            .then((res) => res.json())
            .then((data) => setPartners(data))
            .catch((err) => console.error("Failed to load partners:", err));
    }, []);

    return (
        <Flex
            mt={40}
            bg="footer"
            w={["100%", "100%", "95%"]}
            borderTopRightRadius={32}
            position="relative"
            direction="column"
            py={[10, 10, 16]}
            pr={[8, 8, 24, 32, 64]}
            color="white"
            align="center"
        >
            <DotsIcon
                color="white"
                position="absolute"
                zIndex={10}
                boxSize={[24, 40]}
                right={10}
                top={10}
                transform="rotate(-90deg)"
            />
            <Flex direction="column" w="100%">
                <Flex
                    justify="space-between"
                    align="center"
                    direction={["column", "column", "row"]}
                    pl={[8, 8, 24, 32, 64]}
                >
                    <Heading fontSize={[24, 24, 36]} fontWeight={600}>
                        {t("didWeInterestYou")} <br /> {t("yourInterest")}
                    </Heading>
                    <Button
                        mt={[8, 8, 0]}
                        variant="tertiary"
                        side="right"
                        onClick={onOpen}
                    >
                        {t("writeToUs")}
                    </Button>
                </Flex>

                <Separator />

                <Flex
                    textAlign={["center", "center", "inherit"]}
                    justify="space-between"
                    align="center"
                    direction={["column", "column", "row"]}
                    pl={[8, 8, 24, 32, 64]}
                >
                    <Stack
                        direction="column"
                        align={["center", "center", "initial"]}
                        gap={4}
                        mb={[12, 12, 0]}
                    >
                        <Text fontWeight={500} fontSize={20}>
                            {t("budaorsCenter")}
                        </Text>
                        <HStack>
                            <MapIcon />
                            <Text fontSize={[12, 12, 16]}>
                                {t("budaorsAddress")}
                            </Text>
                        </HStack>
                        <HStack>
                            <TelephoneIcon />
                            <Text fontSize={[12, 12, 16]}>+36 23 889 770</Text>
                        </HStack>
                        <HStack>
                            <MailIcon />
                            <Text fontSize={[12, 12, 16]}>dewa@dewa.hu</Text>
                        </HStack>
                    </Stack>

                    <Stack
                        align={["center", "center", "initial"]}
                        direction="column"
                        gap={4}
                    >
                        <Text fontWeight={500} fontSize={20}>
                            {t("bekescsabaCenter")}
                        </Text>
                        <HStack>
                            <MapIcon />
                            <Text fontSize={[12, 12, 16]}>
                                {t("bekescsabaAddress")}
                            </Text>
                        </HStack>
                        <HStack>
                            <TelephoneIcon />
                            <Text fontSize={[12, 12, 16]}>+36 30 269 0002</Text>
                        </HStack>
                        <HStack>
                            <MailIcon />
                            <Text fontSize={[12, 12, 16]}>dewabcs@dewa.hu</Text>
                        </HStack>
                    </Stack>
                </Flex>

                <Separator />

                <Grid
                    templateColumns={["repeat(3, 1fr)"]}
                    pl={[8, 8, 24, 32, 64]}
                    gap={[8, 8, 12]}
                    h={120}
                    alignItems="center"
                >
                    {partners.map((partner) => (
                        <div
                            key={partner.nev}
                            className="relative justify-center flex items-center h-full w-full"
                        >
                            {/** biome-ignore lint/performance/noImgElement: <because> */}
                            <img
                                // layout="fill"
                                className="object-contain absolute h-full"
                                src={partner.logo}
                                alt={`${partner.nev} partner logo`}
                            />
                        </div>
                    ))}
                </Grid>

                <Flex
                    justify="center"
                    align="center"
                    pl={[8, 8, 24, 32, 64]}
                    pt={8}
                    pb={4}
                >
                    <LanguageSwitcher />
                </Flex>

                <Flex
                    direction="column"
                    align="center"
                    gap={3}
                    pl={[8, 8, 24, 32, 64]}
                    pb={6}
                >
                    <Link href="/privacy" passHref legacyBehavior>
                        <ChakraLink
                            color="whiteAlpha.800"
                            fontSize="sm"
                            _hover={{
                                color: "white",
                                textDecoration: "underline",
                            }}
                        >
                            {t("privacyPolicy")}
                        </ChakraLink>
                    </Link>
                    <Text
                        fontSize="xs"
                        color="whiteAlpha.600"
                        textAlign="center"
                        maxW="2xl"
                    >
                        {t("cookieNotice")}
                    </Text>
                </Flex>

                {/* Developer Credit */}
                <Flex
                    direction="column"
                    align="center"
                    gap={2}
                    pl={[8, 8, 24, 32, 64]}
                    pt={4}
                    pb={4}
                    borderTop="1px solid"
                    borderColor="whiteAlpha.200"
                    mt={4}
                >
                    <HStack spacing={3} align="center">
                        <Text fontSize="xs" color="whiteAlpha.700">
                            {t("developedBy")}
                        </Text>
                        <ChakraLink
                            href="https://rajfta.dev"
                            isExternal
                            display="flex"
                            alignItems="center"
                            gap={2}
                            _hover={{
                                opacity: 0.9,
                                transform: "translateY(-1px)",
                            }}
                            transition="all 0.2s"
                        >
                            {/** biome-ignore lint/performance/noImgElement: <because> */}
                            <img
                                src="/rd/RD.svg"
                                alt="RD Logo"
                                style={{
                                    height: "24px",
                                    width: "auto",
                                }}
                            />
                            <Text
                                fontSize="xs"
                                color="whiteAlpha.800"
                                fontWeight={500}
                            >
                                {t("rajftaDigital")}
                            </Text>
                        </ChakraLink>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Footer;
