import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

import { useHydrate, StoreProvider } from "../store";
import theme from "../components/theme";
import Navbar from "../components/Nav/Navbar";
import { ContactContext } from "../hooks/useContact";
import Footer from "../components/Footer";
import LocaleHead from "../components/LocaleHead";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useHydrate(pageProps.initialZustandState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Budapest"
    >
      <ChakraProvider theme={theme}>
        <StoreProvider store={store}>
          <ContactContext.Provider value={{ isOpen, onClose, onOpen }}>
            <LocaleHead />
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </ContactContext.Provider>
        </StoreProvider>
      </ChakraProvider>
    </NextIntlClientProvider>
  );
};

export default MyApp;
