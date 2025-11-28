import "../styles/globals.css";

import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import LanguageDetectionDialog from "../components/LanguageDetectionDialog";
import LocaleHead from "../components/LocaleHead";
import Navbar from "../components/Nav/Navbar";
import SocialFollowDialog from "../components/SocialFollowDialog";
import theme from "../components/theme";
import { AlternateLocaleContext } from "../hooks/useAlternateLocale";
import { ContactContext } from "../hooks/useContact";
import { StoreProvider, useHydrate } from "../store";

const LOCALE_STORAGE_KEY = "preferredLocale";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const store = useHydrate(pageProps.initialZustandState);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [alternatePath, setAlternatePath] = useState<string | null>(null);

    // Redirect to preferred locale if it differs from current locale
    const { asPath, locale, isReady, replace } = router;
    useEffect(() => {
        if (typeof window === "undefined" || !isReady) return;

        const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (storedLocale && storedLocale !== locale) {
            replace(asPath, asPath, { locale: storedLocale });
        }
    }, [asPath, locale, isReady, replace]);

    const alternateLocaleValue = useMemo(
        () => ({ alternatePath, setAlternatePath }),
        [alternatePath],
    );

    return (
        <NextIntlClientProvider
            locale={router.locale}
            messages={pageProps.messages}
            timeZone="Europe/Budapest"
        >
            <ChakraProvider theme={theme}>
                <StoreProvider store={store}>
                    <AlternateLocaleContext.Provider
                        value={alternateLocaleValue}
                    >
                        <ContactContext.Provider
                            value={{ isOpen, onClose, onOpen }}
                        >
                            <LocaleHead />
                            <Navbar />
                            <LanguageDetectionDialog />
                            <SocialFollowDialog />
                            <Component {...pageProps} />
                            <Footer />
                        </ContactContext.Provider>
                    </AlternateLocaleContext.Provider>
                </StoreProvider>
            </ChakraProvider>
        </NextIntlClientProvider>
    );
};

export default MyApp;
