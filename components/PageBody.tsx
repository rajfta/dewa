import {
    AspectRatio,
    Box,
    Heading,
    ListIcon,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import ImageLightbox, { type LightboxSlide } from "./ImageLightbox";
import { TriangleIcon } from "./icons";

// Context to manage lightbox state across markdown components
type ImageLightboxContextType = {
    openLightbox: (index: number) => void;
    registerImage: (src: string, alt: string, title: string) => number;
};

const ImageLightboxContext = createContext<ImageLightboxContextType | null>(
    null,
);

type AProps = {
    href: string;
    children?: React.ReactNode;
};

type ImgProps = {
    src: string;
    alt: string;
    title: string;
};

const A: FC<AProps> = ({ children, href }) => {
    return href.startsWith("/") || href === "" ? (
        <Link href={href} className="text-primary-500 hover:underline">
            {children}
        </Link>
    ) : (
        <a
            className="text-primary-500 hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};

const Img: FC<ImgProps> = ({ src, alt, title }) => {
    const validSrc = src.replace("public/", "");
    const context = useContext(ImageLightboxContext);

    const imageIndex = useMemo(() => {
        if (context) {
            return context.registerImage(validSrc, alt, title);
        }
        return 0;
    }, [context, validSrc, alt, title]);

    const handleClick = () => {
        if (context) {
            context.openLightbox(imageIndex);
        }
    };

    return (
        <AspectRatio ratio={16 / 9} position="relative">
            <Box
                onClick={handleClick}
                cursor="pointer"
                _hover={{
                    opacity: 0.9,
                }}
                transition="opacity 0.2s"
            >
                <Image
                    src={validSrc}
                    alt={alt}
                    title={title}
                    layout="fill"
                    objectFit="contain"
                />
            </Box>
        </AspectRatio>
    );
};

const H1: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Heading fontSize={["5xl", "5xl", "6xl"]} color="#000" as="h2">
            {children}
        </Heading>
    );
};

const H2: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Heading as="h2" mb={4}>
            {children}
        </Heading>
    );
};

const H3: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <Heading as="h3">{children}</Heading>;
};

const P: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <Text my={1}>{children}</Text>;
};

const Ul: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <UnorderedList ml={0} listStyleType="none" spacing={2} mb={4}>
            {children}
        </UnorderedList>
    );
};

const Ol: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <OrderedList spacing={3} mb={6}>
            {children}
        </OrderedList>
    );
};

const Li: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <ListItem display="flex" alignItems="baseline">
            <ListIcon
                mr={5}
                verticalAlign="initial"
                color="grey.shadow"
                fontSize="xs"
                as={TriangleIcon}
            />
            <span>{children}</span>
        </ListItem>
    );
};

const Blockqoute: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Box
            as="blockquote"
            bg="blockquote"
            borderLeftWidth="5px"
            borderLeftStyle="solid"
            borderLeftColor="secondary.500"
            borderRadius="3xl"
            borderTopLeftRadius="0"
            color="#000"
            px={6}
            py={8}
            my={6}
        >
            {children}
        </Box>
    );
};

type PageBodyProps = {
    content: string;
};

const components = {
    h1: H1,
    h2: H2,
    h3: H3,

    p: P,
    img: ({ title, alt, src }: { title: string; alt: string; src: string }) => {
        return <Img title={title} alt={alt} src={src} />;
    },
    a: A,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockqoute,
};

const PageBody: FC<PageBodyProps> = ({ content }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [images, setImages] = useState<LightboxSlide[]>([]);

    // Context value for managing images and lightbox
    const contextValue = useMemo<ImageLightboxContextType>(
        () => ({
            openLightbox: (index: number) => {
                setLightboxIndex(index);
                setLightboxOpen(true);
            },
            registerImage: (src: string, alt: string, title: string) => {
                const existingIndex = images.findIndex(
                    (img) => img.src === src,
                );
                if (existingIndex !== -1) {
                    return existingIndex;
                }

                const newImage: LightboxSlide = {
                    src,
                    alt: alt || title,
                    title: title || alt,
                    download: src,
                };

                setImages((prev) => [...prev, newImage]);
                return images.length;
            },
        }),
        [images],
    );

    return (
        <ImageLightboxContext.Provider value={contextValue}>
            <Box
                as="article"
                maxW="4xl"
                px={[4, 4, 0]}
                color="grey.charcoal"
                fontSize="lg"
                margin="0 auto"
                lineHeight="2"
            >
                {/* @ts-ignore */}
                <ReactMarkdown components={components}>{content}</ReactMarkdown>
            </Box>

            <ImageLightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={images}
                index={lightboxIndex}
            />
        </ImageLightboxContext.Provider>
    );
};

export default PageBody;
