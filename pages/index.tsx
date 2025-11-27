import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { type FC, useCallback, useEffect } from "react";
import {
    FeluletIcon,
    FestofulkekIcon,
    PaintGunIcon,
    SzervizIcon,
    SzorasIcon,
    TuzelesIcon,
} from "../components/icons";
import { Button } from "../components/uikit";
import { useContact } from "../hooks";
import { getMessages } from "../lib/getMessages";
import type { HomePageType } from "../types";
import { getAllContents } from "../util";

type AboutUsProps = {
    title: string;
    description: string;
    imageSrc: string;
};

const AboutUs: FC<AboutUsProps> = ({ title, description, imageSrc }) => {
    const t = useTranslations("about");

    return (
        <div className="max-w-[100vw] overflow-hidden">
            <motion.div
                whileInView={{
                    x: [100, 50, 0],
                    opacity: [0, 0.5, 1],
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative bg-white">
                    <div className="h-56 bg-indigo-600 sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
                        {/* * biome-ignore lint/performance/noImgElement: <asd> */}
                        <img
                            className="w-full h-full object-cover"
                            src={imageSrc}
                            alt="Support team"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
                        <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
                            <div>
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                    <div className="h-6 w-6 relative">
                                        <PaintGunIcon className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {title}
                            </h2>
                            <p className="my-6 text-lg text-gray-500">
                                {description}
                            </p>
                            <div className="mt-8 overflow-hidden">
                                <dl className="-mx-8 -mt-8 flex flex-wrap">
                                    <div className="flex flex-col px-8 pt-8">
                                        <dt className="order-2 capitalize text-base font-medium text-gray-500">
                                            {t("yearsExperience")}
                                        </dt>
                                        <dd className="order-1 text-2xl font-extrabold text-primary-500 sm:text-3xl">
                                            30+
                                        </dd>
                                    </div>
                                    <div className="flex flex-col px-8 pt-8">
                                        <dt className="order-2 text-base font-medium text-gray-500">
                                            {t("division")}
                                        </dt>
                                        <dd className="order-1 text-2xl font-extrabold text-primary-500 sm:text-3xl">
                                            5
                                        </dd>
                                    </div>
                                    <div className="flex flex-col px-8 pt-8">
                                        <dt className="order-2 text-base font-medium text-gray-500">
                                            {t("successfulProjects")}
                                        </dt>
                                        <dd className="order-1 text-2xl font-extrabold text-primary-500 sm:text-3xl">
                                            2500+
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

type DivisionProps = {
    href: string;
    name: string;
    description: string;
    Logo: ComponentWithAs<"svg", IconProps>;
};

const Division = ({ href, name, Logo, description }: DivisionProps) => {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -10 }}
                className="sm:flex hover:shadow-md rounded-md p-4 lg:block"
            >
                <div className="sm:flex-shrink-0">
                    <Logo boxSize={32} />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-md font-medium text-gray-900">
                        {name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
            </motion.div>
        </Link>
    );
};

type ProductsProps = {
    title: string;
    description: string;
    feny: string;
    tuz: string;
    felulet: string;
    szoras: string;
    szerviz: string;
    imageSrc: string;
};

const Products = ({
    title,
    description,
    feny,
    tuz,
    felulet,
    szoras,
    szerviz,
    imageSrc,
}: ProductsProps) => {
    const t = useTranslations("products");

    return (
        <div className="max-w-[100vw] overflow-hidden">
            <motion.div
                whileInView={{ x: [-100, -50, 0], opacity: [0, 0.5, 1] }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-background">
                    <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
                        <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
                            <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
                                <div>
                                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                                        {title}
                                    </h2>
                                    <p className="mt-4 text-gray-500">
                                        {description}
                                    </p>
                                </div>
                                <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden">
                                    {/* * biome-ignore lint/performance/noImgElement: <asd> */}
                                    <img
                                        src={imageSrc}
                                        alt=""
                                        className="object-center object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-16 grid grid-cols-1 gap-y-10 lg:grid-cols-5">
                                <Division
                                    href="/termekek/fenyezofulkek"
                                    name={t("sprayBooths")}
                                    Logo={FestofulkekIcon}
                                    description={feny}
                                />

                                <Division
                                    href="/termekek/szorastechnika"
                                    name={t("sprayTechnology")}
                                    Logo={SzorasIcon}
                                    description={szoras}
                                />

                                <Division
                                    href="/termekek/tuzelestechnika"
                                    name={t("combustionTechnology")}
                                    Logo={TuzelesIcon}
                                    description={tuz}
                                />

                                <Division
                                    href="/termekek/feluletkezeles"
                                    name={t("surfaceTreatment")}
                                    Logo={FeluletIcon}
                                    description={felulet}
                                />

                                <Division
                                    href="/termekek/szerviz"
                                    name={t("service")}
                                    Logo={SzervizIcon}
                                    description={szerviz}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Divider = () => {
    return (
        <div className="relative my-16 lg:my-32">
            <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
            >
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className=" flex justify-center">
                <span className="bg-background -scale-x-100 relative h-24 w-24 lg:w-32 lg:h-32 px-2 text-gray-500">
                    <Image
                        layout="fill"
                        objectFit="cover"
                        src="/robot.png"
                        alt="Robot divider"
                    />
                </span>
            </div>
        </div>
    );
};

type HeroProps = {
    subtitle: string;
    imageSrc: string;
};

const Hero = ({ subtitle, imageSrc }: HeroProps) => {
    const { onOpen } = useContact();
    const t = useTranslations("hero");
    const commonT = useTranslations("common");

    const titleControls = useAnimationControls();
    const subTitleControls = useAnimationControls();
    const ctaControls = useAnimationControls();
    const bgImageControls = useAnimationControls();

    const sequence = useCallback(async () => {
        await titleControls.start({
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transition: { duration: 0.6 },
        });

        await titleControls.start({
            x: 0,
            transition: { duration: 0.4 },
        });

        await ctaControls.start({
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
            transition: { duration: 0.4 },
        });

        subTitleControls.start({
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            transition: { duration: 0.4 },
        });

        bgImageControls.start({
            clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)",
            transition: { duration: 0.4 },
        });
    }, [bgImageControls, ctaControls, subTitleControls, titleControls]);

    useEffect(() => {
        sequence();
    }, [sequence]);

    return (
        <div className="relative">
            <div>
                <div className="relative bg-transparent overflow-hidden">
                    <div className="wrapper mx-auto">
                        <div className="relative z-10 h-full bg-background lg:max-w-2xl lg:w-full">
                            <svg
                                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>

                            <div className="mx-auto h-full max-w-7xl py-4 sm:py-12 lg:py-16 xl:py-32">
                                <div className="sm:text-center h-full lg:text-left flex flex-col justify-center">
                                    <motion.h1
                                        initial={{
                                            x: "50%",
                                            clipPath:
                                                "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                        }}
                                        animate={titleControls}
                                        className="text-4xl tracking-tight pb-2 font-extrabold sm:text-5xl md:text-7xl"
                                    >
                                        <span className="xl:inline">
                                            {t("turnkey")}
                                        </span>{" "}
                                        <span className="text-primary-500 xl:inline">
                                            {t("paintingSolutions")}
                                        </span>
                                    </motion.h1>
                                    <motion.h3
                                        animate={subTitleControls}
                                        initial={{
                                            clipPath:
                                                "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                        }}
                                        className="my-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                                    >
                                        {subtitle}
                                    </motion.h3>
                                    <motion.div
                                        animate={ctaControls}
                                        className="mt-5 sm:mt-8 sm:flex gap-4 sm:justify-center lg:justify-start"
                                        initial={{
                                            clipPath:
                                                "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
                                        }}
                                    >
                                        <Button
                                            w={["full", "auto", "auto"]}
                                            side="right"
                                            onClick={onOpen}
                                            bg="primary.500"
                                            variant="primary"
                                            mb={4}
                                        >
                                            {t("writeToUs")}
                                        </Button>
                                        <Link href="/kapcsolat">
                                            <Button
                                                side="right"
                                                w="100%"
                                                borderWidth={1}
                                                borderColor="primary.500"
                                                backgroundColor="transparent"
                                                color="primary.500"
                                                _hover={{
                                                    backgroundColor: "gray.200",
                                                }}
                                            >
                                                {commonT("contact")}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        animate={bgImageControls}
                        className="lg:absolute z-2 lg:inset-y-0 lg:right-0 lg:w-1/2"
                        initial={{
                            clipPath:
                                "polygon(100% 100%, 100% 0%, 100% 0%, 100% 100%)",
                        }}
                    >
                        <div className="h-56 relative z-2 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full">
                            <Image
                                layout="fill"
                                objectFit="cover"
                                className="z-2"
                                src={imageSrc}
                                alt="hero image"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Index = ({ data }: { data: HomePageType }) => {
    return (
        <>
            <Hero
                imageSrc={data["hero-image"]}
                subtitle={data["hero-subtitle"]}
            />

            <Divider />

            <AboutUs
                description={data["about-subtitle"]}
                title={data["about-title"]}
                imageSrc={data["about-kep"]}
            />

            <Divider />

            <Products
                description={data["services-subtitle"]}
                title={data["services-title"]}
                felulet={data["felulet-desc"]}
                feny={data["fenyezo-description"]}
                tuz={data["tuzeles-desc"]}
                szoras={data["szoras-desc"]}
                szerviz={data["szerviz-desc"]}
                imageSrc={data["serv-image"]}
            />
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const homepageProps = getAllContents(
        "fooldal",
        [
            "hero-subtitle",
            "hero-image",
            "about-title",
            "about-subtitle",
            "about-kep",
            "services-title",
            "services-subtitle",
            "fenyezo-description",
            "szoras-desc",
            "tuzeles-desc",
            "felulet-desc",
            "szerviz-desc",
            "serv-image",
        ],
        locale,
    ) as HomePageType[];

    const data = homepageProps[0];
    const messages = await getMessages(locale);

    return {
        props: {
            data,
            messages,
        },
    };
};

export default Index;
