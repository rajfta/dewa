import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";

import type { PostType } from "../types";

import { Button } from "./uikit";

type PageHeaderProps = {
	post: PostType;
};

const PageHeader: FC<PageHeaderProps> = ({
	post: { coverImage, date, excerpt, title },
}) => {
	const { back: onBack } = useRouter();

	return (
		<div className="mt-4 wrapper lg:mt-16">
			<Flex
				mx="auto"
				direction={["column", "row", "row", "row"]}
				align="center"
				justify="space-between"
			>
				<Flex
					direction="column"
					align="flex-start"
					justify={[null, "center", "center", "center"]}
					maxW={[null, "40%", "40%", "40%"]}
				>
					<Button
						variant="secondary"
						mb={[8, 8, 12, 16]}
						side="left"
						onClick={onBack}
						alignSelf="flex-start"
					>
						Vissza
					</Button>
					<h1 className="mb-4 text-5xl font-semibold">{title}</h1>
					<Text
						fontSize={[null, null, null, 24]}
						mb={[3, null, null, null]}
						color="grey.iron"
					>
						{excerpt}
					</Text>
					<Text fontSize="sm" color="grey.shadow" mb={[3, null, null, null]}>
						{new Date(date).toLocaleDateString("hu-HU", {
							year: "numeric",
							month: "long",
							day: "2-digit",
						})}
					</Text>
				</Flex>
				<Box
					position="relative"
					overflow="hidden"
					h={["auto", "250px", "350px", "450px"]}
					pt={["100%", "initial", "initial", "initial"]}
					w={["100%", "250px", "350px", "450px"]}
					borderRadius="lg"
					mb={6}
					ml={[0, 16, 24, 32]}
				>
					<Image
						src={coverImage}
						alt={`image of ${title}`}
						layout="fill"
						objectFit="cover"
						priority
					/>
				</Box>
			</Flex>
		</div>
	);
};

export default PageHeader;
