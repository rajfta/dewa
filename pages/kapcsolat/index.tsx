// @ts-nocheck
import React, { FC, useState, useCallback, useMemo } from "react";
import { GetStaticProps } from "next";
import {
  Flex,
  HStack,
  Button,
  Text,
  Stack,
  Thead,
  Tr,
  Th,
  Table,
  Tbody,
  Td,
  chakra,
  AspectRatio,
  Heading,
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { useTranslations } from "next-intl";

import { getAllContents } from "../../util";
import { getMessages } from "../../lib/getMessages";
import { ContactType } from "../../types";
import {
  ChevronDownIcon,
  MailIcon,
  TelephoneIcon,
} from "../../components/icons";
import { useCurrentBreakpoint } from "../../hooks";

type ContactProps = {
  contacts: ContactType[];
};

type OptionProps = {
  value: string;
  active: string;
  onClick: (e: any) => void;
};

const Option: FC<OptionProps> = ({ value, active, onClick, children }) => {
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
        h={1}
        visibility={active === value ? "visible" : "hidden"}
        w="100%"
        bg="secondary.500"
        borderRadius="full"
      />
      <Flex h="2px" w="100%" bg="grey.silver" borderRadius="full" />
    </Stack>
  );
};

const getIcon = (id: string) => {
  switch (id) {
    case "telephone":
      return <TelephoneIcon mr={1.5} boxSize={4} color="black" />;
    case "email":
      return <MailIcon mr={1.5} boxSize={4} color="black" />;

    case "asd":
      return <TelephoneIcon mr={1.5} boxSize={4} color="black" />;

    default:
      return null;
  }
};

const ContactList: FC<ContactProps> = ({ contacts }) => {
  const t = useTranslations('contactPage');

  contacts.sort((a, b) => {
    if (a.reszleg === "kozpont") {
      if (b.reszleg === "kozpont") {
        return a.nev.localeCompare(b.nev);
      }

      return -1;
    }

    return 0;
  });

  const { isMd, isMobile } = useCurrentBreakpoint();

  const data = useMemo(
    () =>
      contacts.map(({ nev, reszleg, email, telefonszam }) => ({
        name: nev,
        department: reszleg,
        email,
        telephone: telefonszam,
      })),
    [contacts]
  );

  const columns = useMemo(
    () => [
      {
        Header: t('name'),
        accessor: "name",
      },
      {
        Header: t('department'),
        accessor: "department",
      },
      {
        Header: t('email'),
        accessor: "email",
      },
      {
        Header: t('telephone'),
        accessor: "telephone",
        isNumeric: true,
      },
    ],
    [t]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  if (isMobile) {
    return (
      <Flex direction="column" alignSelf="normal" mt={8}>
        {contacts.map((contact) => {
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
              <Flex mb={1} align="center" justify="start">
                <MailIcon />
                <Text ml={2}>{contact.email}</Text>
              </Flex>

              <Flex align="center" justify="start">
                <TelephoneIcon />
                <Text ml={2}>{contact.telefonszam}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    );
  }

  return (
    <div className="h-72 w-full overflow-auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th
                    display={
                      isMd && isMobile && column.id === "department"
                        ? "none"
                        : "th"
                    }
                    key={headerGroup}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {getIcon(column.id)}
                    {column.render("Header")}
                    <>
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {column.isSorted ? (
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
                    </>
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
                key={row}
                bg={i % 2 === 0 && "primary.100"}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      textTransform={
                        cell.column.Header === t('department') ? "capitalize" : ""
                      }
                      key={cell.value}
                      display={
                        isMd && isMobile && cell.column.id === "department"
                          ? "none"
                          : "td"
                      }
                      {...cell.getCellProps()}
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
  const t = useTranslations('contactPage');

  const onActivation = useCallback((e) => {
    setActive(e.target.value);
  }, []);

  const selectedContacts = contacts.filter(
    (contact) => contact.helyszin === active
  );

  return (
    <Flex direction="column" align="center" mt={12}>
      <HStack w="100%" align="center" justify="center" mb={8}>
        <Option value="budaors" active={active} onClick={onActivation}>
          {t('budaors')}
        </Option>
        <Option value="bekescsaba" active={active} onClick={onActivation}>
          {t('bekescsaba')}
        </Option>
      </HStack>
      <ContactList contacts={selectedContacts} />
      {active === "budaors" ? (
        <Heading mt={32} mb={6} fontSize={24} p={4} fontWeight={400}>
          {t('budaorsAddress')}
        </Heading>
      ) : (
        <Heading mt={32} mb={6} fontSize={24} p={4} fontWeight={400}>
          {t('bekescsabaAddress')}
        </Heading>
      )}
      <AspectRatio w="100%" ratio={[1, 1, 31 / 9]}>
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
            referrerpolicy="no-referrer-when-downgrade"
          />
        )}
      </AspectRatio>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'hu' }) => {
  const contacts = getAllContents("kapcsolat", [
    "nev",
    "slug",
    "reszleg",
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
