import type { FC } from "react";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button as ChakraButton } from "@chakra-ui/react";
import { Carousel as RCarousel } from "react-responsive-carousel";
import ImageLightbox, { type LightboxSlide } from "./ImageLightbox";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type CarouselProps = {
    gallery: string[];
};

const Carousel: FC<CarouselProps> = ({ gallery }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Convert gallery images to lightbox slides format
    const lightboxSlides: LightboxSlide[] = gallery.map((image) => ({
        src: image,
        alt: image,
        title: image.split("/").pop()?.split(".")[0] || image,
        download: image,
    }));

    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
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
                    {gallery.map((image, index) => {
                        return (
                            // biome-ignore lint/a11y/useSemanticElements: div with role="button" is necessary for react-responsive-carousel wrapper
                            <div
                                key={image}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleImageClick(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleImageClick(index);
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {/* biome-ignore lint/performance/noImgElement: react-responsive-carousel requires native img elements */}
                                <img src={image} alt={image} />
                            </div>
                        );
                    })}
                </RCarousel>
            </div>

            <ImageLightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
            />
        </>
    );
};

export default Carousel;
