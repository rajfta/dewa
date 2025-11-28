import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button as ChakraButton,
    HStack,
    Link as ChakraLink,
    Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { type FC, useRef } from "react";
import { useSocialPopup } from "../hooks";
import { FacebookIcon, LinkedInIcon } from "./icons";

const LINKEDIN_URL = "https://linkedin.com/company/dewa-zrt/";
const FACEBOOK_URL = "https://www.facebook.com/share/1LQPQRgWv6/";

const SocialFollowDialog: FC = () => {
    const t = useTranslations("socialPopup");
    const { shouldShowDialog, dismissPopup } = useSocialPopup();
    const cancelRef = useRef<HTMLButtonElement>(null);

    if (!shouldShowDialog) return null;

    return (
        <AlertDialog
            isOpen={shouldShowDialog}
            leastDestructiveRef={cancelRef}
            onClose={dismissPopup}
            isCentered
        >
            <AlertDialogOverlay backgroundColor="backdrop">
                <AlertDialogContent
                    backgroundColor="background"
                    borderRadius="2xl"
                    mx={4}
                >
                    <AlertDialogHeader fontSize="xl" fontWeight="bold">
                        {t("title")}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text>{t("message")}</Text>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <HStack spacing={3} width="100%" justify="space-between">
                            <ChakraButton
                                ref={cancelRef}
                                onClick={dismissPopup}
                                variant="ghost"
                                size="sm"
                            >
                                {t("dismiss")}
                            </ChakraButton>
                            <HStack spacing={2}>
                                <ChakraLink
                                    href={LINKEDIN_URL}
                                    isExternal
                                    onClick={dismissPopup}
                                    _hover={{ textDecoration: "none" }}
                                >
                                    <ChakraButton
                                        bg="#0A66C2"
                                        color="white"
                                        _hover={{ bg: "#004182" }}
                                        leftIcon={<LinkedInIcon boxSize={5} />}
                                    >
                                        LinkedIn
                                    </ChakraButton>
                                </ChakraLink>
                                <ChakraLink
                                    href={FACEBOOK_URL}
                                    isExternal
                                    onClick={dismissPopup}
                                    _hover={{ textDecoration: "none" }}
                                >
                                    <ChakraButton
                                        bg="#1877F2"
                                        color="white"
                                        _hover={{ bg: "#0d5dc7" }}
                                        leftIcon={<FacebookIcon boxSize={5} />}
                                    >
                                        Facebook
                                    </ChakraButton>
                                </ChakraLink>
                            </HStack>
                        </HStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default SocialFollowDialog;
