import { AspectRatio, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { type FC, useState } from "react";
import type { PostType } from "../types";

import { Button } from "./uikit";

type ReferenceProps = {
    post: PostType;
};

const Reference: FC<ReferenceProps> = ({
    post: { slug, coverImage, title, date, excerpt },
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const t = useTranslations("common");

    return (
        <Link
            href={{
                pathname: "/referenciak/[slug]",
                query: { slug },
            }}
            className="h-full"
        >
            <Flex
                direction="column"
                as="article"
                align="flex-start"
                key={slug}
                borderRadius={[null, null, null, "3xl"]}
                shadow={[null, null, null, "lg"]}
                background={[
                    "transparent",
                    "transparent",
                    "transparent",
                    "#fff",
                ]}
                cursor="pointer"
                h="full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AspectRatio
                    ratio={5 / 3}
                    position="relative"
                    overflow="hidden"
                    display="flex"
                    w="100%"
                    mb={6}
                    borderTopRadius="2xl"
                >
                    <Image
                        src={coverImage}
                        alt={`image of ${title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </AspectRatio>
                <Flex direction="column" flex="1" p={[null, null, null, 4]}>
                    <Flex direction="column" flex="1">
                        <Heading
                            fontSize="2xl"
                            fontWeight="semibold"
                            color="#000"
                            mb={[3, null, null, null]}
                        >
                            {title}
                        </Heading>
                        <Text
                            fontSize="sm"
                            color="grey.shadow"
                            mb={[3, null, null, null]}
                        >
                            {date}
                        </Text>
                        <Text mb={[3, null, null, null]} color="grey.iron">
                            {excerpt}
                        </Text>
                    </Flex>
                    <Button
                        variant="secondary"
                        side="right"
                        w="full"
                        color={[
                            "secondary.500",
                            "secondary.500",
                            isHovered ? "secondary.500" : "secondary.50",
                        ]}
                        borderBottomColor={[
                            "secondary.500",
                            "secondary.500",
                            isHovered ? "secondary.500" : "secondary.50",
                        ]}
                    >
                        {t("readArticle")}
                    </Button>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Reference;
