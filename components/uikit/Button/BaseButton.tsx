/* eslint-disable no-nested-ternary */
import { FC } from "react";
import { Box, chakra } from "@chakra-ui/react";

import { ButtonProps } from "./types";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

const iconSpanMargin = 2;
const desiredMargin = [12, 12, 16, 22];
const m = desiredMargin.map((element) => element - iconSpanMargin);

const BaseButton: FC<ButtonProps> = ({ variant, side, children, ...props }) => {
  return (
    // @ts-ignore
    <Box
      as="button"
      display="inline-flex"
      alignItems="center"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      textTransform="capitalize"
      textAlign="center"
      borderWidth="1px"
      borderStyle="solid"
      justifyContent="space-between"
      borderColor="transparent"
      p={["18px", "18px", "20px", "24px"]}
      borderRadius="lg"
      fontSize={["14px", "14px", "16px", "20px"]}
      fontWeight="semibold"
      bg={`${variant}.500`}
      color="#fff"
      _hover={{ bg: `${variant}.700` }}
      _active={{
        transform: "scale(0.98)",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
      {...props}
    >
      {!side ? (
        <chakra.span>{children}</chakra.span>
      ) : side === "left" ? (
        <>
          <ChevronLeftIcon fontSize={[10, 10, 12, 15]} mr={m} />
          {children}
        </>
      ) : (
        <>
          {children}
          <ChevronRightIcon fontSize={[10, 10, 12, 15]} ml={m} />
        </>
      )}
    </Box>
  );
};

export default BaseButton;
