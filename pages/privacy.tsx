import { Box, Flex, Heading } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import PageBody from "../components/PageBody";
import { getMessages } from "../lib/getMessages";
import { getAllContents } from "../util";

type PrivacyPolicyProps = {
    title: string;
    content: string;
    lastUpdated: string;
};

const PrivacyPolicy = ({ title, content, lastUpdated }: PrivacyPolicyProps) => {
    const router = useRouter();
    const locale = router.locale || "hu";

    return (
        <Box className="wrapper" py={16}>
            <Flex direction="column" maxW="4xl" mx="auto" px={[4, 6, 8]}>
                <Heading as="h1" size="2xl" mb={4}>
                    {title}
                </Heading>
                <Box fontSize="sm" color="gray.600" mb={8}>
                    {locale === "hu" ? "Utolsó frissítés" : "Last updated"}:{" "}
                    {new Date(lastUpdated).toLocaleDateString(
                        locale === "hu" ? "hu-HU" : "en-US",
                    )}
                </Box>
                <PageBody content={content} />
            </Flex>
        </Box>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const messages = await getMessages(locale);

    // Get all privacy policy files for this locale
    // biome-ignore lint/suspicious/noExplicitAny: Privacy content type not in parser Field types
    const allPrivacy = getAllContents(
        "privacy",
        ["title", "content"] as any,
        locale,
    );

    if (!allPrivacy || allPrivacy.length === 0) {
        return {
            notFound: true,
        };
    }

    // biome-ignore lint/suspicious/noExplicitAny: Privacy content has custom fields
    const privacy = allPrivacy[0] as any;

    return {
        props: {
            title: privacy.title,
            content: privacy.content,
            lastUpdated: privacy.lastUpdated || new Date().toISOString(),
            messages,
        },
    };
};

export default PrivacyPolicy;
