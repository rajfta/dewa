import {
    Button,
    Flex,
    Heading,
    Select,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { type FC, useCallback, useEffect, useState } from "react";

import { ChevronDownIcon } from "../../components/icons";
import Product from "../../components/Product";
import { useCurrentBreakpoint } from "../../hooks";
import { getMessages } from "../../lib/getMessages";
import type { ContentType, ProductType } from "../../types";
import { getAllContents } from "../../util";

type ProductProps = {
    products: ProductType[];
    slug: ContentType;
};

type SubCategoryProps = {
    currentSubcategory: string;
    value: string;
    onClick: (e: any) => void;
    children?: React.ReactNode;
};

const SubCategory: FC<SubCategoryProps> = ({
    currentSubcategory,
    value,
    children,
    onClick,
}) => {
    return (
        <Button
            color={currentSubcategory === value ? "secondary.500" : "black"}
            py={4}
            value={value}
            justifyContent="flex-start"
            outline="none"
            border="none"
            variant="link"
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const Products: FC<ProductProps> = ({ slug, products }) => {
    const { isLgMinus } = useCurrentBreakpoint();
    const t = useTranslations("products");

    const uniqueCategories: string[] = [];
    products.forEach(({ alkategoria }) => {
        if (!uniqueCategories.includes(alkategoria)) {
            uniqueCategories.push(alkategoria);
        }
    });

    const router = useRouter();
    const [openProductSlug, setOpenProductSlug] = useState<string | null>(null);

    // Read query parameter on mount and when it changes
    // biome-ignore lint/correctness/useExhaustiveDependencies: <only sync when query param changes>
    useEffect(() => {
        const productSlug = router.query.product as string | undefined;
        if (productSlug && productSlug !== openProductSlug) {
            setOpenProductSlug(productSlug);
        } else if (!productSlug && openProductSlug) {
            setOpenProductSlug(null);
        }
    }, [router.query.product]);

    // Handle opening modal - update URL with query param
    const handleOpenModal = useCallback((productSlug: string) => {
        setOpenProductSlug(productSlug);
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, product: productSlug },
            },
            undefined,
            { shallow: true }
        );
    }, [router]);

    // Handle closing modal - remove query param
    const handleCloseModal = useCallback(() => {
        setOpenProductSlug(null);
        const { product, ...restQuery } = router.query;
        router.push(
            {
                pathname: router.pathname,
                query: restQuery,
            },
            undefined,
            { shallow: true }
        );
    }, [router]);

    const getDivisionName = useCallback(
        (slugValue: ContentType) => {
            switch (slugValue) {
                case "feluletkezeles":
                    return t("surfaceTreatment");
                case "fenyezofulkek":
                    return t("sprayBooths");
                case "tuzelestechnika":
                    return t("heatingTechnology");
                case "szorastechnika":
                    return t("sprayTechnology");
                case "szerviz":
                    return t("service");
                default:
                    return null;
            }
        },
        [t],
    );

    const [currentSubcategory, setcurrentSubcategory] = useState("");
    const currentSubProducts = products.filter(
        (product) => product.alkategoria === currentSubcategory,
    );
    const selectedProducts =
        currentSubcategory === "" ? products : currentSubProducts;

    const onSubcategoryChange = useCallback((e: any) => {
        setcurrentSubcategory(e.target.value);
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <should only run on slug change>
    useEffect(() => {
        setcurrentSubcategory("");
    }, [slug]);

    if (router.isFallback || !products) {
        return <div>ERRORPAGE</div>;
    }

    return (
        <div className="flex flex-col wrapper">
            <Heading
                display="flex"
                alignItems="center"
                mt={[6, 8, 12, 16]}
                mb={[null, null, 12, 12]}
                fontSize={["xl", "xl", "2xl", "2xl"]}
                color="#000"
                fontWeight="semibold"
            >
                {getDivisionName(slug)}
                <Flex ml={1} color="secondary.500">
                    ({selectedProducts.length}){" "}
                </Flex>
            </Heading>
            {slug === "szerviz" && (
                <Text
                    fontSize={["md", "md", "lg"]}
                    color="grey.charcoal"
                    mb={8}
                    maxW="4xl"
                    lineHeight="1.8"
                >
                    {t("serviceDescription")}
                </Text>
            )}
            <Stack
                mt={[8, 8, null, null]}
                spacing={16}
                direction={["column", "column", "column", "row"]}
            >
                {isLgMinus ? (
                    <Select
                        h="48px"
                        mb={3.5}
                        bg="primary.100"
                        icon={<ChevronDownIcon fontSize={12} fill="none" />}
                        variant="filled"
                        placeholder={t("allSubcategories")}
                        onChange={onSubcategoryChange}
                        sx={{
                            option: {
                                background: "primary.100",
                            },
                        }}
                    >
                        {uniqueCategories.map((category) => {
                            return (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                    </Select>
                ) : (
                    <Stack>
                        <SubCategory
                            currentSubcategory={currentSubcategory}
                            value=""
                            onClick={onSubcategoryChange}
                        >
                            {t("allSubcategories")}
                        </SubCategory>
                        {uniqueCategories.map((category) => {
                            return (
                                <SubCategory
                                    key={category}
                                    currentSubcategory={currentSubcategory}
                                    value={category}
                                    onClick={onSubcategoryChange}
                                >
                                    {category}
                                </SubCategory>
                            );
                        })}
                    </Stack>
                )}
                <SimpleGrid columns={[1, 2, 2, 3, 3]} spacing={8}>
                    {selectedProducts.map((product) => {
                        return (
                            <Product
                                key={product.slug}
                                product={product}
                                open={openProductSlug === product.slug}
                                onOpenModal={() => handleOpenModal(product.slug)}
                                onCloseModal={handleCloseModal}
                            />
                        );
                    })}
                </SimpleGrid>
            </Stack>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({
    params: { slug },
    locale = "hu",
}: {
    params: { slug: ContentType };
    locale?: string;
}) => {
    const products = getAllContents(
        slug,
        ["divizio", "boritokep", "alkategoria", "leiras", "nev", "slug"],
        locale,
    );

    const messages = await getMessages(locale);

    return {
        props: {
            slug,
            products,
            messages,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = [
        "feluletkezeles",
        "fenyezofulkek",
        "tuzelestechnika",
        "szorastechnika",
        "szerviz",
    ];

    const paths = slugs.flatMap((slug) => [
        {
            params: {
                slug,
            },
            locale: "hu",
        },
        {
            params: {
                slug,
            },
            locale: "en",
        },
    ]);

    return {
        paths,
        fallback: false,
    };
};

export default Products;
