import { Flex, Heading } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Button } from "../components/uikit";
import { getMessages } from "../lib/getMessages";

const NotFound = () => {
    const router = useRouter();

    return (
        <Flex
            w="100%"
            h="60vh"
            justify="center"
            direction="column"
            align="center"
        >
            <Heading mb={32}>The requested page was not found!</Heading>
            <Button
                onClick={() => router.push("/")}
                textTransform="initial"
                variant="primary"
                side="left"
            >
                Back to Homepage
            </Button>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const messages = await getMessages(locale);

    return {
        props: {
            messages,
        },
    };
};

export default NotFound;
