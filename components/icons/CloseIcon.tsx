import { createIcon } from "@chakra-ui/react";

export const CloseIcon = createIcon({
    displayName: "CloseIcon",
    viewBox: "0 0 20 20",
    path: (
        <>
            <rect
                x="1.50598"
                width="25.5566"
                height="2.12971"
                rx="1.06486"
                transform="rotate(45 1.50598 0)"
                fill="currentColor"
            />
            <rect
                width="25.5566"
                height="2.12971"
                rx="1.06486"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 1.50598 19.5771)"
                fill="currentColor"
            />
        </>
    ),
    defaultProps: {
        "aria-label": "Close",
    },
});
