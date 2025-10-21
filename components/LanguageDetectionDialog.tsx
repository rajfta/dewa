import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button as ChakraButton,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { type FC, useRef } from "react";
import { useLanguageDetection } from "../hooks";

const LanguageDetectionDialog: FC = () => {
    const router = useRouter();
    const t = useTranslations("languageDetection");
    const { shouldShowDialog, setLanguagePreference } = useLanguageDetection();
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleSwitchToEnglish = () => {
        setLanguagePreference();
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: "en" });
    };

    const handleStayInHungarian = () => {
        setLanguagePreference();
    };

    if (!shouldShowDialog) return null;

    return (
        <AlertDialog
            isOpen={shouldShowDialog}
            leastDestructiveRef={cancelRef}
            onClose={handleStayInHungarian}
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
                        <ChakraButton
                            ref={cancelRef}
                            onClick={handleStayInHungarian}
                            variant="ghost"
                        >
                            {t("stayHungarian")}
                        </ChakraButton>
                        <ChakraButton
                            colorScheme="blue"
                            onClick={handleSwitchToEnglish}
                            ml={3}
                        >
                            {t("switchEnglish")}
                        </ChakraButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default LanguageDetectionDialog;
