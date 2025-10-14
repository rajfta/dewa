/* eslint-disable no-underscore-dangle */
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Grid, Heading } from "@chakra-ui/react";

import { getAllContents } from "../../util";
import { PostType } from "../../types";

import Reference from "../../components/Reference";
import Gallery from "../../components/Gallery";
import Perspective from "../../components/Perspective";

type PostProps = {
  references: PostType[];
};

const References: FC<PostProps> = ({ references }) => {
  const router = useRouter();

  const hallOfFames = useMemo(
    () =>
      references.filter((reference) => reference._template === "referencia"),
    [references]
  );

  const galleries = useMemo(
    () =>
      references.filter(
        (reference) => reference._template === "reference_gallery"
      ),
    [references]
  );

  if (router.isFallback || !references) {
    return <div>ERRORPAGE</div>;
  }

  return (
    <>
      <Heading textAlign="center">Büszkeségfal</Heading>
      <div className="grid mt-16 px-4 sm:px-4 gap-8 xl:gap-8 md:px-40 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(2,_420px)]">
        {hallOfFames.map((hallOfFame) => {
          return (
            <Perspective key={hallOfFame.slug} intensity={0.5}>
              <Reference key={hallOfFame.slug} post={hallOfFame} />
            </Perspective>
          );
        })}
      </div>

      <Heading textAlign="center" my={16}>
        Galériák
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

export const getStaticProps: GetStaticProps = async () => {
  const references = getAllContents("references", [
    "title",
    "excerpt",
    "coverImage",
    "content",
    "gallery",
    "date",
    "companyName",
    "seo",
    "slug",
    "_template",
  ]);
  const serializedReferences = references.map((reference) => {
    return {
      ...reference,
      date: reference.date.toString(),
    };
  });

  return {
    props: {
      references: serializedReferences,
    },
  };
};

export default References;
