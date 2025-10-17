import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Breakpoints from "../../util/breakpoints";
import colors from "./colors";
import styles from "./globalStyle";
import shadows from "./shadows";
import space from "./space";
import { headingStyles, textStyles } from "./typoStyles";

const fonts = {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
    mono: "'Inter', sans-serif",
};

const { sm, md, lg, xl } = Breakpoints;

const breakpoints = createBreakpoints({
    sm,
    md,
    lg,
    xl,
});

const theme = extendTheme({
    fonts,
    colors,
    shadows,
    space,
    styles,
    components: {
        Heading: headingStyles,
        Text: textStyles,
    },
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
    },
    breakpoints,
});

export default theme;
