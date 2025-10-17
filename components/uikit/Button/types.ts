import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export type VariantTypes = "primary" | "secondary" | "tertiary";

export type ButtonProps = ChakraButtonProps & {
	variant?: VariantTypes;
	side?: "right" | "left";
	noIcon?: boolean;
};
