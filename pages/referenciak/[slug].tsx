import { Divider } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { type FC, useEffect } from "react";
import Carousel from "../../components/Carousel";
import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";
import { useAlternateLocale } from "../../hooks";
import { getMessages } from "../../lib/getMessages";

import type { PostType } from "../../types";
import { getAllContents, getContentBySlug } from "../../util";

type PostProps = {
    reference: PostType;
};

const Reference: FC<PostProps> = ({ reference }) => {
    const { seo, content, slug, gallery, _template, translationSlug } =
        reference;
    const { setAlternatePath } = useAlternateLocale();

    const { isFallback } = useRouter();

    // Set alternate path for language switching
    useEffect(() => {
        if (translationSlug) {
            setAlternatePath(`/referenciak/${translationSlug}`);
        } else {
            setAlternatePath(null);
        }
        return () => setAlternatePath(null);
    }, [translationSlug, setAlternatePath]);

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

export const getStaticProps: GetStaticProps = async ({
    params: { slug },
    locale = "hu",
}) => {
    const reference = getContentBySlug(
        "references",
        slug as string,
        [
            "slug",
            "content",
            "coverImage",
            "date",
            "excerpt",
            "gallery",
            "seo",
            "title",
            "_template",
            "translationSlug",
        ],
        locale,
    );

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
    const referencesHu = getAllContents("references", ["slug"], "hu");
    const referencesEn = getAllContents("references", ["slug"], "en");

    const paths = [
        ...referencesHu.map((ref) => ({
            params: { slug: ref.slug },
            locale: "hu",
        })),
        ...referencesEn.map((ref) => ({
            params: { slug: ref.slug },
            locale: "en",
        })),
    ];

    return {
        paths,
        fallback: false,
    };
};

export default Reference;
