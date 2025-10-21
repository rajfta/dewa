import { AspectRatio, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";
import type { PostType } from "../types";
import { formatDate } from "../util/formatDate";

import { Button } from "./uikit";

type GalleryProps = {
    post: PostType;
};

const Gallery: FC<GalleryProps> = ({
    post: { slug, coverImage, title, date },
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -3 }}
            className="hover:shadow-md cursor-pointer"
        >
            <Link
                href={{
                    pathname: "/referenciak/[slug]",
                    query: { slug },
                }}
            >
                <Flex
                    direction="column"
                    as="article"
                    align="flex-start"
                    key={slug}
                    borderRadius="xl"
                    shadow={[null, null, null, "md"]}
                    overflow="hidden"
                    cursor="pointer"
                    h="full"
                >
                    <AspectRatio
                        ratio={16 / 9}
                        position="relative"
                        overflow="hidden"
                        display="flex"
                        w="100%"
                        mb={3}
                    >
                        <Image
                            src={coverImage}
                            alt={`image of ${title}`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </AspectRatio>
                    <Flex direction="column" flex="1" w="100%" px={3} pb={6}>
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
                                {formatDate(date)}
                            </Text>
                        </Flex>
                        <Button
                            variant="secondary"
                            p={0}
                            fontSize={["12px", "12px", "14px", "16px"]}
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
                            Megnyitás
                        </Button>
                    </Flex>
                </Flex>
            </Link>
        </motion.div>
    );
};

export default Gallery;
