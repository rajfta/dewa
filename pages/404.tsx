import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Button } from "../components/uikit";

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
            <Heading mb={32}>A keresett oldal nem található !</Heading>
            <Button
                onClick={() => router.push("/")}
                textTransform="initial"
                variant="primary"
                side="left"
            >
                Vissza a Főoldalra
            </Button>
        </Flex>
    );
};

export default NotFound;
