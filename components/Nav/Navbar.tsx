import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

import { DewaIcon, DotsIcon } from "../icons";

import Navlist from "./Navlist";
import { useContact } from "../../hooks";
import { Button } from "../uikit";

const Navbar: FC = () => {
  const { isOpen, onClose } = useContact();
  const [isEmailSending, setIsEmailSending] = useState(false);

  const initialRef = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (values: any) => {
    onClose();
    toast({
      status: "info",
      title: "Email küldés alatt...",
      duration: 15000,
      position: "bottom",
    });
    setIsEmailSending(true);

    const config = {
      method: "post",
      url: "/api/contact",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    try {
      // @ts-ignore
      const response = await axios(config);
      toast.closeAll();
      setIsEmailSending(false);
      // eslint-disable-next-line no-console
      if (response.status === 200) {
        toast({
          title: "Email sikeresen elküldve!",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "bottom",
        });
      }
    } catch (err) {
      setIsEmailSending(false);
      // eslint-disable-next-line no-console
      toast({
        title: "Sikertelen küldés, kérjük próbálja meg újra!",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
      });
    }
  };

  return (
    <div className="wrapper flex items-center justify-between mb-4">
      <Box cursor="pointer">
        <Link href="/">
          <DewaIcon w={32} h={24} />
        </Link>
      </Box>
      <Navlist />
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backgroundColor="backdrop" />
        <ModalContent
          backgroundColor="background"
          w={["90%", "inherit", "inherit", "inherit"]}
          borderRadius="2xl"
          overflow="hidden"
        >
          <ModalHeader
            textAlign="center"
            textTransform="uppercase"
            fontSize="2xl"
            mb={10}
            pl={0}
            pt={0}
          >
            <Flex
              width="50%"
              pl={5}
              pr={2}
              py={2}
              bg="primary.700"
              borderBottomRightRadius="3rem"
              justify="space-between"
              align="center"
            >
              <DewaIcon w={20} h={10} color="white" />
              <DotsIcon mr={2} mb={2} color="white" right={3} boxSize={14} />
            </Flex>
            <Text
              mt={8}
              fontWeight="semibold"
              textTransform="uppercase"
              fontSize="2xl"
            >
              Írjon Nekünk!
            </Text>
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.subject} isRequired id="subject">
                <FormLabel htmlFor="subject">Tárgy</FormLabel>
                <Input
                  id="subject"
                  type="text"
                  ref={initialRef}
                  backgroundColor="primary.100"
                  py={6}
                  fontSize="lg"
                  {...register("subject", {
                    required: "Kötelező mező!",
                    minLength: { value: 3, message: "Legalább 3 karakter!" },
                    maxLength: {
                      value: 1200,
                      message: "Nem lehet több, mint 1200 karakter!",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.subject && (errors.subject.message as string)}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.telephone}
                isRequired
                mt={6}
                id="telephone"
              >
                <FormLabel htmlFor="telephone">Telefonszám</FormLabel>
                <Input
                  id="telephone"
                  type="number"
                  placeholder="Telefonszám"
                  backgroundColor="primary.100"
                  py={6}
                  fontSize="lg"
                  {...register("telephone", { required: "Kötelező mező!" })}
                />
                <FormErrorMessage>
                  {errors.telephone && (errors.telephone.message as string)}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.email}
                isRequired
                mt={6}
                id="email"
              >
                <FormLabel htmlFor="email">Email cím</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  backgroundColor="primary.100"
                  py={6}
                  fontSize="lg"
                  {...register("email", { required: "Kötelező mező!" })}
                />
                <FormErrorMessage>
                  {errors.email && (errors.email.message as string)}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                mt={6}
                isInvalid={!!errors.message}
                id="message"
              >
                <FormLabel>Üzenet</FormLabel>
                <Textarea
                  backgroundColor="primary.100"
                  height={["150px", "150px", "2x", "2xs"]}
                  resize="vertical"
                  placeholder="Üzenet"
                  fontSize="lg"
                  {...register("message", {
                    required: "Kötelező mező!",
                    minLength: { value: 20, message: "Legalább 20 karakter!" },
                  })}
                />
                <FormErrorMessage>
                  {errors.message && (errors.message.message as string)}
                </FormErrorMessage>
              </FormControl>
              <Flex mt={8} w="100" justify="flex-end">
                <Button
                  disabled={isSubmitting || isEmailSending}
                  type="submit"
                  variant="primary"
                  side="right"
                  backgroundColor={isEmailSending ? "gray.200" : null}
                  _hover={{
                    backgroundColor: isEmailSending ? "gray.200" : null,
                  }}
                >
                  Küldés
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Navbar;
