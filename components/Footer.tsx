import { Flex, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
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
                            <Text fontSize={[12, 12, 16]}>+36 66 546 500</Text>
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
                            className="relative justify-center items-center h-full w-full"
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
            </Flex>
        </Flex>
    );
};

export default Footer;
