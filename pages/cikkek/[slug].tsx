import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { FC } from "react";

import { Divider } from "@chakra-ui/react";
import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";
import { getAllContents, getContentBySlug } from "../../util";
import { getMessages } from "../../lib/getMessages";

import { PostType } from "../../types";

type PostProps = {
  post: PostType;
};

const Post: FC<PostProps> = ({ post }) => {
  const { seo, content, slug } = post;

  const { isFallback } = useRouter();
  if (isFallback || !slug || !post.title) {
    return <div>ERRORPAGE</div>;
  }

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <PageHeader post={post} />
      <Divider
        my={12}
        borderBottomColor="grey.silver"
        opacity={1}
        borderBottomWidth="2px"
        orientation="horizontal"
      />
      <PageBody content={content} />
      <Divider
        my={12}
        borderBottomColor="grey.metal"
        opacity={1}
        borderBottomWidth="2px"
        orientation="horizontal"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { slug }, locale = 'hu' }) => {
  const post = getContentBySlug("posts", slug as string, [
    "slug",
    "content",
    "coverImage",
    "date",
    "excerpt",
    "seo",
    "title",
  ]);
  const serializedPost = {
    ...post,
    date: post.date.toString(),
  };

  const messages = await getMessages(locale);

  return {
    props: {
      post: serializedPost,
      messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllContents("posts", ["slug"]);

  const paths = posts.flatMap((post) => [
    {
      params: {
        slug: post.slug,
      },
      locale: 'hu',
    },
    {
      params: {
        slug: post.slug,
      },
      locale: 'en',
    },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export default Post;
