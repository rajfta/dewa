import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    type Dispatch,
    type FC,
    Fragment,
    type SetStateAction,
    useState,
} from "react";
import type { ProductType } from "../types";

import { Button } from "./uikit";

type ProductProps = {
    product: ProductType;
};

type ProductModalProps = {
    product: ProductType;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const ProductModal = ({ open, setOpen, product }: ProductModalProps) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-15" onClose={setOpen}>
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
                                        <div className="mt-2">
                                            <p className="text-md text-left text-gray-700">
                                                {product.leiras}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <Button
                                            variant="secondary"
                                            side="left"
                                            className="inline-flex justify-center w-full rounded-md border-transparent shadow-sm px-4 py-2text-base font-medium focus:outline-none focus:ring-transparent text-white sm:text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Bezár
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

const ParsedText = ({ text }: { text: string }) => {
    const textArray = text.split("\n").filter((line) => line !== "");

    return (
        <>
            {textArray.map((line, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text
                    mb={index !== textArray.length ? 2 : 0}
                    fontSize="s"
                    key={index}
                >
                    {line}
                </Text>
            ))}
        </>
    );
};

const Product: FC<ProductProps> = ({ product }) => {
    const [open, setOpen] = useState(false);

    const { nev, leiras, boritokep } = product;

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="hover:cursor-pointer shadow-lg hover:shadow-xl"
                onClick={() => setOpen(true)}
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
                        <Flex
                            mb={[3, null, null, null]}
                            color="grey.iron"
                            gap={12}
                            flexDir="column"
                        >
                            <ParsedText text={leiras} />
                        </Flex>
                    </Flex>
                </Flex>
            </motion.div>
            <ProductModal product={product} open={open} setOpen={setOpen} />
        </>
    );
};

export default Product;
