/* eslint-disable no-underscore-dangle */

import { Grid, Heading } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { type FC, useMemo } from "react";
import Gallery from "../../components/Gallery";
import Perspective from "../../components/Perspective";
import Reference from "../../components/Reference";
import { getMessages } from "../../lib/getMessages";
import type { PostType } from "../../types";
import { getAllContents } from "../../util";

type PostProps = {
    references: PostType[];
};

const References: FC<PostProps> = ({ references }) => {
    const router = useRouter();
    const t = useTranslations("references");

    const hallOfFames = useMemo(
        () =>
            references.filter(
                (reference) =>
                    reference._template === "referencia" ||
                    reference._template === "reference",
            ),
        [references],
    );

    const galleries = useMemo(
        () =>
            references.filter(
                (reference) => reference._template === "reference_gallery",
            ),
        [references],
    );

    if (router.isFallback || !references) {
        return <div>ERRORPAGE</div>;
    }

    return (
        <>
            <Heading textAlign="center">{t("hallOfFame")}</Heading>
            <div className="grid mt-16 px-4 sm:px-4 gap-8 xl:gap-8 md:px-40 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(2,_420px)]">
                {hallOfFames.map((hallOfFame) => {
                    return (
                        <Perspective key={hallOfFame.slug} intensity={0.5}>
                            <Reference
                                key={hallOfFame.slug}
                                post={hallOfFame}
                            />
                        </Perspective>
                    );
                })}
            </div>

            <Heading textAlign="center" my={16}>
                {t("galleries")}
            </Heading>
            <Grid
                px={[4, 4, 40]}
                gridTemplateColumns={[
                    "1fr",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                ]}
                columnGap={[16, 16, 16, 20]}
                rowGap={8}
            >
                {galleries.map((gallery) => {
                    return <Gallery key={gallery.slug} post={gallery} />;
                })}
            </Grid>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const references = getAllContents(
        "references",
        [
            "title",
            "excerpt",
            "coverImage",
            "content",
            "gallery",
            "date",
            "companyname",
            "seo",
            "slug",
            "_template",
        ],
        locale,
    );
    const serializedReferences = references.map((reference) => {
        return {
            ...reference,
            date: reference.date.toString(),
        };
    });

    const messages = await getMessages(locale);

    return {
        props: {
            references: serializedReferences,
            messages,
        },
    };
};

export default References;
