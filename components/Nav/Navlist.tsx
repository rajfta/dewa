import {
    Box,
    Link as ChakraLink,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import type React from "react";
import { type FC, useCallback, useMemo, useState } from "react";

import { useCurrentBreakpoint, useMenu } from "../../hooks";
import { MenuContext } from "../../hooks/useMenu";
import {
    ChevronDownIcon,
    CloseIcon,
    FacebookIcon,
    HamburgerIcon,
    LinkedInIcon,
    OutsideIcon,
} from "../icons";
import LanguageSwitcher from "../LanguageSwitcher";
import Contact from "./Contact";
import { headerPX } from "./consts";

type LinkItemProps = {
    href: string;
    css?: Record<string, unknown>;
    children?: React.ReactNode;
};

const LinkItem: FC<LinkItemProps> = ({ children, href, css }) => {
    const { onClose } = useMenu();
    const { asPath } = useRouter();
    const currentPage = asPath.includes(href);

    return (
        <NextLink href={href}>
            <Box
                onClick={onClose}
                color={currentPage ? "secondary.500" : "black"}
                cursor="pointer"
                flexWrap="nowrap"
                whiteSpace="nowrap"
                _hover={{
                    transform: "scale(1.02)",
                }}
                {...css}
            >
                {children}
            </Box>
        </NextLink>
    );
};

type ProductCategoriesProps = {
    show: boolean;
};

const ProductCategories: FC<ProductCategoriesProps> = ({ show }) => {
    const { isLg } = useCurrentBreakpoint();
    const t = useTranslations("nav");

    const productCategories = useMemo(
        () => [
            { key: "sprayBooths", slug: "fenyezofulkek" },
            { key: "surfaceTreatment", slug: "feluletkezeles" },
            { key: "heatingTechnology", slug: "tuzelestechnika" },
            { key: "sprayTechnology", slug: "szorastechnika" },
            { key: "service", slug: "szerviz" },
        ],
        [],
    );

    if (!show) {
        return null;
    }

    if (isLg) {
        return (
            <Box
                pt={2}
                position="absolute"
                top={6}
                shadow="sm"
                left={-4}
                borderBottomRadius="2xl"
                bg="background"
            >
                {productCategories.map((category, i) => {
                    const href = `/termekek/${category.slug}`;
                    return (
                        <Box key={category.key}>
                            <LinkItem
                                href={href}
                                css={{
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    paddingLeft: "16px",
                                    paddingRight: "16px",
                                }}
                            >
                                {t(
                                    category.key as
                                        | "sprayBooths"
                                        | "surfaceTreatment"
                                        | "heatingTechnology"
                                        | "sprayTechnology"
                                        | "service",
                                )}
                            </LinkItem>
                            {i + 1 < productCategories.length && (
                                <Box
                                    height={0.25}
                                    width="100%"
                                    backgroundColor="curtain.2"
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>
        );
    }

    return (
        <Stack alignItems="flex-end" mt={6}>
            {productCategories.map((category) => {
                const href = `/termekek/${category.slug}`;
                return (
                    <LinkItem
                        key={category.key}
                        href={href}
                        css={{
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            paddingLeft: "16px",
                            fontSize: "lg",
                        }}
                    >
                        {t(
                            category.key as
                                | "sprayBooths"
                                | "surfaceTreatment"
                                | "heatingTechnology"
                                | "sprayTechnology"
                                | "service",
                        )}
                    </LinkItem>
                );
            })}
        </Stack>
    );
};

const Products: FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { pathname } = useRouter();
    const currentPage = pathname.includes("termekek");

    const { isLg } = useCurrentBreakpoint();

    const [show, setShow] = useState(false);

    const onOpen = useCallback(() => {
        setShow(true);
    }, []);

    const onClose = useCallback(() => {
        setShow(false);
    }, []);

    const toggleShow = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <Flex
            direction="column"
            position="relative"
            zIndex={1}
            onMouseEnter={isLg ? onOpen : null}
            onMouseLeave={isLg ? onClose : null}
        >
            <Flex align="center" justify="flex-end">
                <NextLink href="/termekek">
                    <Box
                        color={currentPage ? "secondary.500" : "black"}
                        cursor="pointer"
                        _hover={{
                            transform: "scale(1.02)",
                        }}
                    >
                        {children}
                    </Box>
                </NextLink>
                <ChevronDownIcon
                    ml={3}
                    transform={show ? "rotate(180deg)" : "none"}
                    transitionDuration="0.2s"
                    fill="none"
                    width={3}
                    color={currentPage && "secondary.500"}
                    cursor="pointer"
                    onClick={!isLg ? toggleShow : null}
                />
            </Flex>
            <ProductCategories show={show} />
        </Flex>
    );
};

type NavItemProps = {
    href?: string;
    children?: React.ReactNode;
};

const NavItem: FC<NavItemProps> = ({ children, href }) => {
    const { onClose } = useMenu();
    const t = useTranslations("nav");

    const isCareer = children === t("career");
    const isProducts = children === t("products");

    if (isCareer) {
        return (
            <ChakraLink
                onClick={onClose}
                isExternal
                href={href}
                color="black"
                cursor="pointer"
                _hover={{
                    transform: "scale(1.02)",
                }}
            >
                <Flex direction="row" align="center">
                    {children}
                    <OutsideIcon />
                </Flex>
            </ChakraLink>
        );
    }

    if (isProducts) {
        return <Products>{children}</Products>;
    }

    return <LinkItem href={href}>{children}</LinkItem>;
};

const NavItems: FC = () => {
    const t = useTranslations("nav");

    return (
        <Stack
            spacing={6}
            align={["flex-end", "flex-end", "flex-end", "baseline"]}
            direction={["column", "column", "column", "row"]}
            zIndex={12}
        >
            <NavItem href="/termekek">{t("products")}</NavItem>
            <NavItem href="/referenciak">{t("references")}</NavItem>
            <NavItem href="/cikkek">{t("blog")}</NavItem>
            <NavItem href="/kapcsolat">{t("contact")}</NavItem>
            <NavItem href="https://www.profession.hu/allasok/dewa-zrt/1,0,0,0,0,0,0,0,0,0,38885">
                {t("career")}
            </NavItem>
            <Contact />
            <Flex gap={2} align="center">
                <ChakraLink
                    href="https://linkedin.com/company/dewa-zrt/"
                    isExternal
                    color="black"
                    _hover={{ color: "primary.500" }}
                    transition="color 0.2s"
                >
                    <LinkedInIcon boxSize={4} />
                </ChakraLink>
                <ChakraLink
                    href="https://www.facebook.com/share/1LQPQRgWv6/"
                    isExternal
                    color="black"
                    _hover={{ color: "primary.500" }}
                    transition="color 0.2s"
                >
                    <FacebookIcon boxSize={4} />
                </ChakraLink>
            </Flex>
            <LanguageSwitcher
                compact
                textColor="black"
                hoverBg="gray.100"
                size="sm"
            />
        </Stack>
    );
};

const Navlist: FC = () => {
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
    const { isLg } = useCurrentBreakpoint();

    if (isLg) {
        return <NavItems />;
    }

    return (
        <MenuContext.Provider value={{ isOpen, onClose, onOpen, onToggle }}>
            <IconButton
                alignSelf="center"
                bg="transparent !important"
                aria-label="Menu"
                onClick={onOpen}
                icon={<HamburgerIcon w="36px" h="21px" />}
            />
            <Drawer size="xs" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay background="backdrop" />
                <DrawerContent
                    borderLeftRadius="md"
                    bg="primary.100"
                    color="black"
                >
                    <DrawerHeader
                        display="flex"
                        justifyContent="flex-end"
                        px={headerPX}
                    >
                        <IconButton
                            alignSelf="flex-end"
                            bg="transparent !important"
                            aria-label="Menu"
                            onClick={onClose}
                            icon={<CloseIcon boxSize="21px" />}
                        />
                    </DrawerHeader>
                    <DrawerBody fontSize="2xl" px={12}>
                        <NavItems />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </MenuContext.Provider>
    );
};

export default Navlist;
