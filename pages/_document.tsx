import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { consentBootstrapScript, isAnalyticsEnabled } from "../lib/consent";

export default class MyDocument extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    {/* Must be a plain inline script rather than next/script so
                        it is guaranteed to run before gtag.js loads. */}
                    {isAnalyticsEnabled() && (
                        <script
                            // biome-ignore lint/security/noDangerouslySetInnerHtml: static first-party snippet, no interpolated user input - the only way to guarantee the consent defaults run before gtag.js
                            dangerouslySetInnerHTML={{
                                __html: consentBootstrapScript,
                            }}
                        />
                    )}

                    <link
                        rel="stylesheet"
                        href="https://rsms.me/inter/inter.css"
                    />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
