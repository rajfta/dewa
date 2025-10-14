/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Carousel from "../../components/Carousel";

type PostProps = {
  reference: PostType;
};

const Reference: FC<PostProps> = ({ reference }) => {
  const { seo, content, slug, gallery, _template } = reference;

  const { isFallback } = useRouter();
  console.log("reference.title", reference.title);
  console.log("slug", slug);
  console.log("isFallback", isFallback);
  if (isFallback || !slug || !reference.title) {
    console.log("ERRORPAGE");

    return <div>ERRORPAGE</div>;
  }

  // gallery
  if (_template === "reference_gallery") {
    return (
      <>
        <Head>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
        </Head>

        <PageHeader post={reference} />
        <Divider
          my={12}
          borderBottomColor="grey.silver"
          opacity={1}
          borderBottomWidth="2px"
          orientation="horizontal"
        />
        <Carousel gallery={gallery} />
        <Divider
          my={12}
          borderBottomColor="grey.metal"
          opacity={1}
          borderBottomWidth="2px"
          orientation="horizontal"
        />
      </>
    );
  }

  // Reference
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <PageHeader post={reference} />
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
  const reference = getContentBySlug("references", slug as string, [
    "slug",
    "content",
    "coverImage",
    "date",
    "excerpt",
    "gallery",
    "seo",
    "title",
    "_template",
  ]);

  const serializedReference: { [key: string]: string } = {
    ...reference,
    date: reference.date.toString(),
  };

  const messages = await getMessages(locale);

  return {
    props: {
      reference: serializedReference,
      messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllContents("references", ["slug"]);

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

export default Reference;
