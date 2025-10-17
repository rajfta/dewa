import type { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button as ChakraButton } from "@chakra-ui/react";
import { Carousel as RCarousel } from "react-responsive-carousel";

import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type CarouselProps = {
    gallery: string[];
};

const Carousel: FC<CarouselProps> = ({ gallery }) => {
    return (
        <div className="wrapper select-none">
            {/* @ts-ignore - Type incompatibility with react-responsive-carousel and React 19 */}
            <RCarousel
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <ChakraButton
                            onClick={onClickHandler}
                            position="absolute"
                            top={0}
                            borderRadius="none"
                            left={0}
                            zIndex={2}
                            backgroundColor="curtain.1"
                            h="100%"
                            px={8}
                            _hover={{
                                backgroundColor: "curtain.2",
                            }}
                            _focus={{
                                backgroundColor: "curtain.4",
                            }}
                            _active={{
                                backgroundColor: "curtain.4",
                            }}
                            title={label}
                        >
                            <ChevronLeftIcon color="#fff" fontSize={20} />
                        </ChakraButton>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <ChakraButton
                            onClick={onClickHandler}
                            position="absolute"
                            top={0}
                            borderRadius="none"
                            right={0}
                            zIndex={2}
                            backgroundColor="curtain.1"
                            h="100%"
                            px={8}
                            _hover={{
                                backgroundColor: "curtain.2",
                            }}
                            _focus={{
                                backgroundColor: "curtain.4",
                            }}
                            _active={{
                                backgroundColor: "curtain.4",
                            }}
                            title={label}
                        >
                            <ChevronRightIcon color="#fff" fontSize={20} />
                        </ChakraButton>
                    )
                }
            >
                {gallery.map((image) => {
                    return <img key={image} src={image} alt={image} />;
                })}
            </RCarousel>
        </div>
    );
};

export default Carousel;
