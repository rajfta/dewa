import {
    Box,
    Link as ChakraLink,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { type FC, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useContact } from "../../hooks";
import { DewaIcon, DotsIcon } from "../icons";
import { Button } from "../uikit";
import Navlist from "./Navlist";

type ContactFormValues = {
    subject: string;
    telephone: string;
    email: string;
    message: string;
    consent: boolean;
};

const Navbar: FC = () => {
    const { isOpen, onClose } = useContact();
    const [isEmailSending, setIsEmailSending] = useState(false);
    const t = useTranslations("contactForm");

    const initialRef = useRef(null);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>();

    const toast = useToast();

    // Generate unique IDs for form fields
    const subjectId = useId();
    const telephoneId = useId();
    const emailId = useId();
    const messageId = useId();

    const onSubmit = async (values: ContactFormValues) => {
        onClose();
        toast({
            status: "info",
            title: t("sending"),
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
            const response = await axios(config);
            toast.closeAll();
            setIsEmailSending(false);
            // eslint-disable-next-line no-console
            if (response.status === 200) {
                toast({
                    title: t("success"),
                    duration: 5000,
                    isClosable: true,
                    status: "success",
                    position: "bottom",
                });
            }
        } catch (_err) {
            setIsEmailSending(false);
            // eslint-disable-next-line no-console
            toast({
                title: t("error"),
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
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
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
                            <DotsIcon
                                mr={2}
                                mb={2}
                                color="white"
                                right={3}
                                boxSize={14}
                            />
                        </Flex>
                        <Text
                            mt={8}
                            fontWeight="semibold"
                            textTransform="uppercase"
                            fontSize="2xl"
                        >
                            {t("title")}
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton size="lg" />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                isInvalid={!!errors.subject}
                                isRequired
                            >
                                <FormLabel htmlFor={subjectId}>
                                    {t("subject")}
                                </FormLabel>
                                <Input
                                    id={subjectId}
                                    type="text"
                                    ref={initialRef}
                                    backgroundColor="primary.100"
                                    py={6}
                                    fontSize="lg"
                                    {...register("subject", {
                                        required: t("required"),
                                        minLength: {
                                            value: 3,
                                            message: t("minLength", { min: 3 }),
                                        },
                                        maxLength: {
                                            value: 1200,
                                            message: t("maxLength", {
                                                max: 1200,
                                            }),
                                        },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.subject &&
                                        (errors.subject.message as string)}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={!!errors.telephone}
                                isRequired
                                mt={6}
                            >
                                <FormLabel htmlFor={telephoneId}>
                                    {t("telephone")}
                                </FormLabel>
                                <Input
                                    id={telephoneId}
                                    type="number"
                                    placeholder={t("telephonePlaceholder")}
                                    backgroundColor="primary.100"
                                    py={6}
                                    fontSize="lg"
                                    {...register("telephone", {
                                        required: t("required"),
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.telephone &&
                                        (errors.telephone.message as string)}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={!!errors.email}
                                isRequired
                                mt={6}
                            >
                                <FormLabel htmlFor={emailId}>
                                    {t("email")}
                                </FormLabel>
                                <Input
                                    id={emailId}
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    backgroundColor="primary.100"
                                    py={6}
                                    fontSize="lg"
                                    {...register("email", {
                                        required: t("required"),
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email &&
                                        (errors.email.message as string)}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isRequired
                                mt={6}
                                isInvalid={!!errors.message}
                            >
                                <FormLabel htmlFor={messageId}>
                                    {t("message")}
                                </FormLabel>
                                <Textarea
                                    id={messageId}
                                    backgroundColor="primary.100"
                                    height={["150px", "150px", "2x", "2xs"]}
                                    resize="vertical"
                                    placeholder={t("messagePlaceholder")}
                                    fontSize="lg"
                                    {...register("message", {
                                        required: t("required"),
                                        minLength: {
                                            value: 20,
                                            message: t("minLength", {
                                                min: 20,
                                            }),
                                        },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.message &&
                                        (errors.message.message as string)}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.consent} mt={6}>
                                <Checkbox
                                    {...register("consent", {
                                        required: t("consentRequired"),
                                    })}
                                    colorScheme="blue"
                                >
                                    <Text fontSize="sm">
                                        {t("consent")}.{" "}
                                        <Link
                                            href="/privacy"
                                            passHref
                                            legacyBehavior
                                        >
                                            <ChakraLink
                                                color="blue.600"
                                                textDecoration="underline"
                                                isExternal
                                            >
                                                {t("privacyPolicy")}
                                            </ChakraLink>
                                        </Link>
                                    </Text>
                                </Checkbox>
                                <FormErrorMessage>
                                    {errors.consent &&
                                        (errors.consent.message as string)}
                                </FormErrorMessage>
                            </FormControl>

                            <Flex mt={8} w="100" justify="flex-end">
                                <Button
                                    disabled={isSubmitting || isEmailSending}
                                    type="submit"
                                    variant="primary"
                                    side="right"
                                    backgroundColor={
                                        isEmailSending ? "gray.200" : null
                                    }
                                    _hover={{
                                        backgroundColor: isEmailSending
                                            ? "gray.200"
                                            : null,
                                    }}
                                >
                                    {t("send")}
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
