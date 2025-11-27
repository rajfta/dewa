import {
    AspectRatio,
    Button,
    Link as ChakraLink,
    chakra,
    Flex,
    Heading,
    HStack,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import React, { type FC, useCallback, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import {
    ChevronDownIcon,
    FacebookIcon,
    LinkedInIcon,
    MailIcon,
    TelephoneIcon,
} from "../../components/icons";
import { useCurrentBreakpoint } from "../../hooks";
import { getMessages } from "../../lib/getMessages";
import type { ContactType } from "../../types";
import { getAllContents } from "../../util";

type ContactProps = {
    contacts: ContactType[];
};

type OptionProps = {
    value: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};

const Option: FC<OptionProps> = ({ value, isActive, onClick, children }) => {
    return (
        <Stack spacing={0}>
            <Button
                variant="ghost"
                bg="none"
                border="none"
                borderRadius="none"
                h="32px"
                px={[4, 32, 32]}
                color="black"
                value={value}
                _hover={{
                    background: "none",
                }}
                _focus={{
                    background: "none",
                }}
                onClick={onClick}
            >
                {children}
            </Button>
            <Flex
                h="2px"
                w="100%"
                bg={isActive ? "secondary.500" : "grey.silver"}
                borderRadius="full"
            />
        </Stack>
    );
};

const getIcon = (id: string) => {
    switch (id) {
        case "telephone":
            return <TelephoneIcon mr={1.5} boxSize={4} color="black" />;
        case "email":
            return <MailIcon mr={1.5} boxSize={4} color="black" />;
        default:
            return null;
    }
};

const ContactList: FC<ContactProps> = ({ contacts }) => {
    const t = useTranslations("contactPage");
    const router = useRouter();
    const locale = router.locale || "hu";

    contacts.sort((a, b) => {
        if (a.reszleg === "kozpont" || a.reszleg === "központ") {
            if (b.reszleg === "kozpont" || b.reszleg === "központ") {
                return a.nev.localeCompare(b.nev);
            }

            return -1;
        }

        return 0;
    });

    const { isMd, isMobile } = useCurrentBreakpoint();

    const data = useMemo(
        () =>
            contacts.map(
                ({
                    nev,
                    role,
                    role_en,
                    reszleg,
                    reszleg_en,
                    email,
                    telefonszam,
                }) => ({
                    name: nev,
                    role: locale === "en" ? role_en : role,
                    department: locale === "en" ? reszleg_en : reszleg,
                    email,
                    telephone: telefonszam,
                }),
            ),
        [contacts, locale],
    );

    const columns = useMemo(
        () => [
            {
                Header: t("name"),
                accessor: "name",
            },
            {
                Header: t("role"),
                accessor: "role",
            },
            {
                Header: t("department"),
                accessor: "department",
            },
            {
                Header: t("email"),
                accessor: "email",
            },
            {
                Header: t("telephone"),
                accessor: "telephone",
                isNumeric: true,
            },
        ],
        [t],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    if (isMobile) {
        return (
            <Flex direction="column" alignSelf="normal" mt={8}>
                {contacts.map((contact) => {
                    const displayRole =
                        locale === "en" ? contact.role_en : contact.role;
                    return (
                        <Flex
                            key={contact.slug}
                            p={4}
                            direction="column"
                            mb={8}
                            shadow="sm"
                        >
                            <Text fontWeight={500} fontSize="18" mb={2}>
                                {contact.nev}
                            </Text>
                            {displayRole && (
                                <Text fontSize="14" color="gray.600" mb={2}>
                                    {displayRole}
                                </Text>
                            )}
                            <Flex mb={1} align="center" justify="start">
                                <MailIcon />
                                <Text ml={2}>{contact.email}</Text>
                            </Flex>

                            <Flex align="center" justify="start">
                                <TelephoneIcon />
                                <div className="ml-2 flex-nowrap whitespace-nowrap">
                                    {contact.telefonszam}
                                </div>
                            </Flex>
                        </Flex>
                    );
                })}
            </Flex>
        );
    }

    return (
        <div className="w-full wrapper">
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr
                            key={headerGroup.id}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => {
                                return (
                                    <Th
                                        display={
                                            isMd &&
                                            isMobile &&
                                            (column.id === "department" ||
                                                column.id === "role")
                                                ? "none"
                                                : undefined
                                        }
                                        key={column.id}
                                        {...column.getHeaderProps(
                                            // @ts-expect-error - useSortBy plugin adds this method
                                            column.getSortByToggleProps(),
                                        )}
                                        // @ts-expect-error - custom property for Chakra UI
                                        isNumeric={column.isNumeric}
                                    >
                                        {getIcon(column.id)}
                                        {column.render("Header")}

                                        {/* eslint-disable-next-line no-nested-ternary */}
                                        {/* @ts-expect-error - useSortBy plugin adds isSorted and isSortedDesc */}
                                        {column.isSorted ? (
                                            // @ts-expect-error - useSortBy plugin property
                                            column.isSortedDesc ? (
                                                <chakra.span pl="4">
                                                    <ChevronDownIcon aria-label="sorted descending" />
                                                </chakra.span>
                                            ) : (
                                                <chakra.span pl="4">
                                                    <ChevronDownIcon
                                                        transform="rotate(180deg)"
                                                        aria-label="sorted ascending"
                                                    />
                                                </chakra.span>
                                            )
                                        ) : null}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr
                                key={row.id}
                                bg={i % 2 === 0 ? "primary.100" : undefined}
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <Td
                                            textTransform={
                                                cell.column.Header ===
                                                t("department")
                                                    ? "capitalize"
                                                    : undefined
                                            }
                                            key={cell.column.id}
                                            display={
                                                isMd &&
                                                isMobile &&
                                                (cell.column.id ===
                                                    "department" ||
                                                    cell.column.id === "role")
                                                    ? "none"
                                                    : undefined
                                            }
                                            {...cell.getCellProps()}
                                            // @ts-expect-error - custom property for Chakra UI
                                            isNumeric={cell.column.isNumeric}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </div>
    );
};

const Contact: FC<ContactProps> = ({ contacts }) => {
    const [active, setActive] = useState("budaors");
    const t = useTranslations("contactPage");

    const onActivation = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            setActive((e.target as HTMLButtonElement).value);
        },
        [],
    );

    const selectedContacts = contacts.filter(
        (contact) => contact.helyszin === active,
    );

    return (
        <Flex direction="column" align="center" mt={12}>
            <HStack w="100%" align="center" justify="center" mb={8}>
                <Option
                    value="budaors"
                    isActive={active === "budaors"}
                    onClick={onActivation}
                >
                    {t("budaors")}
                </Option>
                <Option
                    value="bekescsaba"
                    isActive={active === "bekescsaba"}
                    onClick={onActivation}
                >
                    {t("bekescsaba")}
                </Option>
            </HStack>
            <ContactList contacts={selectedContacts} />
            <Flex gap={6} mt={12} align="center" justify="center">
                <ChakraLink
                    href="https://linkedin.com/company/dewa-zrt/"
                    isExternal
                    color="black"
                    _hover={{ color: "primary.500" }}
                    transition="color 0.2s"
                >
                    <LinkedInIcon boxSize={8} />
                </ChakraLink>
                <ChakraLink
                    href="https://www.facebook.com/share/1LQPQRgWv6/"
                    isExternal
                    color="black"
                    _hover={{ color: "primary.500" }}
                    transition="color 0.2s"
                >
                    <FacebookIcon boxSize={8} />
                </ChakraLink>
            </Flex>
            {active === "budaors" ? (
                <Heading mt={32} mb={6} fontSize={24} p={4} fontWeight={400}>
                    {t("budaorsAddress")}
                </Heading>
            ) : (
                <Heading mt={32} mb={6} fontSize={24} p={4} fontWeight={400}>
                    {t("bekescsabaAddress")}
                </Heading>
            )}

            <AspectRatio
                className="wrapper mx-16"
                w="100%"
                ratio={[1, 1, 31 / 9]}
            >
                {active === "budaors" ? (
                    <iframe
                        loading="lazy"
                        title="Dewa HQ"
                        allowFullScreen
                        src="https://www.google.com/maps/embed/v1/place?q=dewa&key=AIzaSyDGQJAOWTOczUfw4RU9YoRBdpD44Kas81Q&zoom=14"
                    />
                ) : (
                    <iframe
                        title="Dewa Bekescsaba"
                        src="https://www.google.com/maps/embed/v1/place?q=dewa+bekescsaba&key=AIzaSyDGQJAOWTOczUfw4RU9YoRBdpD44Kas81Q&zoom=14"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                )}
            </AspectRatio>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const contacts = getAllContents("kapcsolat", [
        "nev",
        "slug",
        "role",
        "role_en",
        "reszleg",
        "reszleg_en",
        "helyszin",
        "email",
        "telefonszam",
    ]);

    const messages = await getMessages(locale);

    return {
        props: {
            contacts,
            messages,
        },
    };
};

export default Contact;
