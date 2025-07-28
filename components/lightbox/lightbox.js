import PropTypes from "prop-types";
import ReactLightbox, { useLightboxState } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Box from "@mui/material/Box";

import GoogleMaterialIcon from "components/google-icon";
import StyledLightbox from "./styles";

// ----------------------------------------------------------------------

export default function Lightbox({ slides, disabledZoom, disabledVideo, disabledTotal, disabledCaptions, disabledSlideshow, disabledThumbnails, disabledFullscreen, onGetCurrentIndex, ...other }) {
    const totalItems = slides ? slides.length : 0;

    return (
        <>
            <StyledLightbox />

            <ReactLightbox
                slides={slides}
                animation={{ swipe: 240 }}
                carousel={{ finite: totalItems < 5 }}
                controller={{ closeOnBackdropClick: true }}
                plugins={getPlugins({
                    disabledZoom,
                    disabledVideo,
                    disabledCaptions,
                    disabledSlideshow,
                    disabledThumbnails,
                    disabledFullscreen,
                })}
                on={{
                    view: ({ index }) => {
                        if (onGetCurrentIndex) {
                            onGetCurrentIndex(index);
                        }
                    },
                }}
                toolbar={{
                    buttons: [<DisplayTotal key={0} totalItems={totalItems} disabledTotal={disabledTotal} />, "close"],
                }}
                render={{
                    iconClose: () => <GoogleMaterialIcon icon={'close'} fontSize='medium' />,
                    iconZoomIn: () => <GoogleMaterialIcon icon={'zoom_in'} fontSize='medium' />,
                    iconZoomOut: () => <GoogleMaterialIcon icon={'zoom_out'} fontSize='medium' />,
                    iconSlideshowPlay: () =>  <GoogleMaterialIcon icon={'play_arrow'} fontSize='medium' />,
                    iconSlideshowPause: () => <GoogleMaterialIcon icon={'pause'} fontSize='medium' />,
                    iconPrev: () => <GoogleMaterialIcon icon={'chevron_left'} fontSize='medium' />,
                    iconNext: () => <GoogleMaterialIcon icon={'chevron_right'} fontSize='medium' />,
                    iconExitFullscreen: () => <GoogleMaterialIcon icon={'fullscreen_exit'} fontSize='medium' />,
                    iconEnterFullscreen: () => <GoogleMaterialIcon icon={'fullscreen'} fontSize='medium' />,
                }}
                {...other}
            />
        </>
    );
}

Lightbox.propTypes = {
    disabledCaptions: PropTypes.bool,
    disabledFullscreen: PropTypes.bool,
    disabledSlideshow: PropTypes.bool,
    disabledThumbnails: PropTypes.bool,
    disabledTotal: PropTypes.bool,
    disabledVideo: PropTypes.bool,
    disabledZoom: PropTypes.bool,
    onGetCurrentIndex: PropTypes.func,
    slides: PropTypes.array,
};

// ----------------------------------------------------------------------

export function getPlugins({ disabledZoom, disabledVideo, disabledCaptions, disabledSlideshow, disabledThumbnails, disabledFullscreen }) {
    let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

    if (disabledThumbnails) {
        plugins = plugins.filter((plugin) => plugin !== Thumbnails);
    }
    if (disabledCaptions) {
        plugins = plugins.filter((plugin) => plugin !== Captions);
    }
    if (disabledFullscreen) {
        plugins = plugins.filter((plugin) => plugin !== Fullscreen);
    }
    if (disabledSlideshow) {
        plugins = plugins.filter((plugin) => plugin !== Slideshow);
    }
    if (disabledZoom) {
        plugins = plugins.filter((plugin) => plugin !== Zoom);
    }
    if (disabledVideo) {
        plugins = plugins.filter((plugin) => plugin !== Video);
    }

    return plugins;
}

// ----------------------------------------------------------------------

export function DisplayTotal({ totalItems, disabledTotal }) {
    const { currentIndex } = useLightboxState();

    if (disabledTotal) {
        return null;
    }

    return (
        <Box
            component="span"
            className="yarl__button"
            sx={{
                typography: "body2",
                alignItems: "center",
                display: "inline-flex",
                justifyContent: "center",
            }}
        >
            <strong> {currentIndex + 1} </strong> / {totalItems}
        </Box>
    );
}

DisplayTotal.propTypes = {
    disabledTotal: PropTypes.bool,
    totalItems: PropTypes.number,
};
