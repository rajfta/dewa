import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    type Dispatch,
    type FC,
    Fragment,
    type SetStateAction,
    useState,
} from "react";
import ReactMarkdown from "react-markdown";
import type { ProductType } from "../types";

import { Button } from "./uikit";
import { useTranslations } from "next-intl";

type ProductProps = {
    product: ProductType;
    open?: boolean;
    onOpenModal?: () => void;
    onCloseModal?: () => void;
};

type ProductModalProps = {
    product: ProductType;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClose?: () => void;
};

type ProductLinkProps = {
    href: string;
    children?: React.ReactNode;
};

const ProductLink: FC<ProductLinkProps> = ({ children, href }) => {
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

const components = {
    a: ProductLink,
};

const ProductModal = ({
    open,
    setOpen,
    product,
    onClose,
}: ProductModalProps) => {
    const t = useTranslations("products");

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-15" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-[100] inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            layout="fill"
                                            alt={product.nev}
                                            src={product.boritokep}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl mb-8 leading-6 font-medium text-gray-900"
                                        >
                                            {product.nev}
                                        </Dialog.Title>
                                        <div className="mt-2 prose prose-sm text-gray-700 text-left max-w-none">
                                            <ReactMarkdown
                                                components={components}
                                            >
                                                {product.leiras}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 flex gap-3">
                                        <Button
                                            variant="secondary"
                                            side="left"
                                            className="inline-flex justify-center flex-1 rounded-md border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-transparent text-white sm:text-sm"
                                            onClick={handleClose}
                                        >
                                            {t("close")}
                                        </Button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const Product: FC<ProductProps> = ({
    product,
    open: externalOpen,
    onOpenModal,
    onCloseModal,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);

    // Use external open state if provided, otherwise use internal state
    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
    const setOpen =
        externalOpen !== undefined
            ? (value: boolean) => {
                  if (value && onOpenModal) {
                      onOpenModal();
                  } else if (!value && onCloseModal) {
                      onCloseModal();
                  }
              }
            : setInternalOpen;

    const { nev, leiras, boritokep } = product;

    const handleCardClick = () => {
        if (onOpenModal) {
            onOpenModal();
        } else {
            setInternalOpen(true);
        }
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="hover:cursor-pointer shadow-lg hover:shadow-xl"
                onClick={handleCardClick}
            >
                <Flex
                    direction="column"
                    as="article"
                    align="flex-start"
                    borderRadius="lg"
                >
                    <AspectRatio
                        ratio={1}
                        position="relative"
                        overflow="hidden"
                        display="flex"
                        w="100%"
                        mb={3}
                        borderRadius="lg"
                    >
                        <Image
                            src={boritokep}
                            alt={`image of ${nev}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </AspectRatio>
                    <Flex
                        direction="column"
                        justify="space-between"
                        maxH={[null, 64, 72, 80]}
                        p={4}
                    >
                        <Text fontWeight="semibold" mb={[3, null, null, null]}>
                            {nev}
                        </Text>
                        <Box
                            mb={[3, null, null, null]}
                            color="grey.iron"
                            gap={12}
                            overflowY="hidden"
                            height={140}
                        >
                            <div className="text-sm line-clamp-6 prose prose-sm max-w-none">
                                <ReactMarkdown components={components}>
                                    {leiras}
                                </ReactMarkdown>
                            </div>
                        </Box>
                    </Flex>
                </Flex>
            </motion.div>
            <ProductModal
                product={product}
                open={isOpen}
                setOpen={setOpen}
                onClose={onCloseModal}
            />
        </>
    );
};

export default Product;
