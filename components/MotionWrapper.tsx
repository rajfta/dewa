import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

type MotionWrapperProps = {
    children: ReactNode;
    classNames?: HTMLAttributes<HTMLDivElement>;
};

const MotionWrapper = ({ children, classNames }: MotionWrapperProps) => {
    return (
        <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0.5, 1] }}
            transition={{ duration: 0.5 }}
            className={`${classNames}`}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
