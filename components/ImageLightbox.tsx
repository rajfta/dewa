import type { FC } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export type LightboxSlide = {
    src: string;
    alt?: string;
    title?: string;
    download?: string;
};

type ImageLightboxProps = {
    open: boolean;
    close: () => void;
    slides: LightboxSlide[];
    index?: number;
};

const ImageLightbox: FC<ImageLightboxProps> = ({
    open,
    close,
    slides,
    index = 0,
}) => {
    return (
        <Lightbox
            open={open}
            close={close}
            slides={slides}
            index={index}
            plugins={[Captions, Download, Thumbnails, Zoom]}
            captions={{
                descriptionTextAlign: "center",
            }}
            zoom={{
                maxZoomPixelRatio: 3,
                scrollToZoom: true,
            }}
            thumbnails={{
                position: "bottom",
                width: 120,
                height: 80,
                border: 1,
                borderRadius: 4,
                padding: 0,
                gap: 16,
            }}
            styles={{
                container: {
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                },
            }}
        />
    );
};

export default ImageLightbox;
