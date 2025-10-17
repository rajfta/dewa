import { Box, Flex } from "@chakra-ui/react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type React from "react";
import { type FC, type PointerEvent, useCallback } from "react";

const PerspectiveHover = motion(Box);
const AnimationContainer = motion(Flex);

const isPointerMakesItCloser = true;
const ogAngle = 9 * (isPointerMakesItCloser ? -1 : 1);

type PerspectiveProps = {
    intensity?: number;
    children?: React.ReactNode;
};

const Perspective: FC<PerspectiveProps> = ({ children, intensity }) => {
    const angle = ogAngle * intensity;
    const y = useMotionValue(0.5);
    const x = useMotionValue(0.5);

    const rotateY = useTransform(x, [0, 1], [-angle, angle], {
        clamp: true,
    });
    const rotateX = useTransform(y, [0, 1], [angle, -angle], {
        clamp: true,
    });

    const onMove = (e: PointerEvent) => {
        // get position information for the card
        const bounds = e.currentTarget?.getBoundingClientRect();

        // set x,y local coordinates
        const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth;
        const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight;

        // update MotionValues
        x.set(xValue, true);
        y.set(yValue, true);
    };

    const handleReset = useCallback(() => {
        animate(rotateX, 0, {
            type: "tween",
            duration: 0.3,
        });
        animate(rotateY, 0, {
            type: "tween",
            duration: 0.3,
        });
    }, [rotateX, rotateY]);

    return (
        <Flex justify="center" align="center" position="relative">
            <AnimationContainer
                onPointerLeave={handleReset}
                justify="center"
                align="center"
                style={{ perspective: "2000px" }}
                animate
            >
                <PerspectiveHover
                    onPointerMove={onMove}
                    style={{
                        rotateX,
                        rotateY,
                    }}
                >
                    {children}
                </PerspectiveHover>
            </AnimationContainer>
        </Flex>
    );
};

export default Perspective;
