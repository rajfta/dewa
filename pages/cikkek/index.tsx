import { Heading, SimpleGrid } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { type FC, useCallback } from "react";
import Article from "../../components/Article";
import { getMessages } from "../../lib/getMessages";

import type { PostType } from "../../types";
import { getAllContents } from "../../util";

type CikkekType = {
	posts: PostType[];
};

const Cikkek: FC<CikkekType> = ({ posts }) => {
	const router = useRouter();
	const t = useTranslations("blog");
	const onOpen = useCallback(
		(slug: string) => {
			router.push({
				pathname: "/cikkek/[slug]",
				query: { slug },
			});
		},
		[router],
	);

	if (router.isFallback || !posts) {
		return <div>ERRORPAGE</div>;
	}

	return (
		<div className="wrapper">
			<Heading textAlign="center">{t("articles")}</Heading>
			<SimpleGrid mt={16} columns={[1, 2, 2, 3]} spacing={[16, 16, 16, 20]}>
				{posts.map((post) => {
					return <Article key={post.slug} post={post} onOpen={onOpen} />;
				})}
			</SimpleGrid>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
	const posts = getAllContents(
		"posts",
		["title", "excerpt", "coverImage", "date", "seo", "slug"],
		locale,
	);
	const serializedPosts = posts.map((post) => {
		return {
			...post,
			date: post.date.toString(),
		};
	});

	const messages = await getMessages(locale);

	return {
		props: {
			posts: serializedPosts,
			messages,
		},
	};
};

export default Cikkek;
