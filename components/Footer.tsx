import { Flex, Grid, Text, Heading, Stack, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useContact } from "../hooks";
import { DotsIcon, MailIcon, MapIcon, TelephoneIcon } from "./icons";
import { Button } from "./uikit";

const Separator = () => {
  return <Flex w="100%" h="1px" my={[10, 10, 20]} bg="whiteAlpha.300" />;
};

const Footer = () => {
  const { onOpen } = useContact();

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
            Felkeltettük <br /> érdeklődését?
          </Heading>
          <Button
            mt={[8, 8, 0]}
            variant="tertiary"
            side="right"
            onClick={onOpen}
          >
            Írjon Nekünk!
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
              Budaörsi Központ
            </Text>
            <HStack>
              <MapIcon />
              <Text fontSize={[12, 12, 16]}>
                2040 Budaörs, Gyár u. 2. (Budaörsi Ipari Park)
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
              Békéscsabai Központ
            </Text>
            <HStack>
              <MapIcon />
              <Text fontSize={[12, 12, 16]}>
                5600 Békéscsaba Gyulai út (Lukoil-al szemben)
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
          pl={[8, 8, 24, 32, 64]}
          rowGap={16}
          templateColumns={["1fr 1fr", "1fr 1fr", "repeat(6, auto)"]}
          alignItems="center"
        >
          <Flex h={8} position="relative">
            <Image
              layout="fill"
              objectFit="contain"
              src="/partners/blowtherm.png"
              alt="Blowtherm partner logo"
            />
          </Flex>
          <Flex h={12} position="relative">
            <Image
              layout="fill"
              objectFit="contain"
              src="/partners/filcar.png"
              alt="Filcar partner logo"
            />
          </Flex>
          <Flex h={8} position="relative">
            <Image
              layout="fill"
              objectFit="contain"
              src="/partners/formeco.png"
              alt="Formeco partner logo"
            />
          </Flex>
          <Flex h={8} position="relative">
            <Image
              layout="fill"
              objectFit="contain"
              src="/partners/reglo.png"
              alt="Reglo partner logo"
            />
          </Flex>
          <Flex h={8} position="relative">
            <Image
              layout="fill"
              objectFit="contain"
              src="/partners/sames-kremlim.png"
              alt="Sames Kremlin partner logo"
            />
          </Flex>
          <Flex h={8} position="relative">
            <Image layout="fill" objectFit="contain" src="/partners/aaf.png" alt="AAF partner logo" />
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Footer;
