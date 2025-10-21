import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import {
    FeluletIcon,
    FestofulkekIcon,
    SzervizIcon,
    SzorasIcon,
    TuzelesIcon,
} from "../../components/icons";
import { getMessages } from "../../lib/getMessages";

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

const TermekekPage: FC = () => {
    const t = useTranslations("products");

    return (
        <div className="bg-background">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            {t("title")}
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2">
                        <Division
                            href="/termekek/fenyezofulkek"
                            name={t("sprayBooths")}
                            Logo={FestofulkekIcon}
                            description={t("sprayBoothsDescription")}
                        />

                        <Division
                            href="/termekek/szorastechnika"
                            name={t("sprayTechnology")}
                            Logo={SzorasIcon}
                            description={t("sprayTechnologyDescription")}
                        />

                        <Division
                            href="/termekek/tuzelestechnika"
                            name={t("heatingTechnology")}
                            Logo={TuzelesIcon}
                            description={t("heatingTechnologyDescription")}
                        />

                        <Division
                            href="/termekek/feluletkezeles"
                            name={t("surfaceTreatment")}
                            Logo={FeluletIcon}
                            description={t("surfaceTreatmentDescription")}
                        />

                        <Division
                            href="/termekek/szerviz"
                            name={t("service")}
                            Logo={SzervizIcon}
                            description={t("serviceDescription")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale = "hu" }) => {
    const messages = await getMessages(locale);

    return {
        props: {
            messages,
        },
    };
};

export default TermekekPage;
