import { useBreakpointValue } from "@chakra-ui/react";

enum Breakpoints {
	mobile = 1,
	sm = 2,
	md = 3,
	lg = 4,
}

const useCurrentBreakpoint = () => {
	const currentBreakPoint: Breakpoints = useBreakpointValue({
		base: Breakpoints.mobile,
		sm: Breakpoints.sm,
		md: Breakpoints.md,
		lg: Breakpoints.lg,
	});

	return {
		currentBreakPoint,
		isMobile: currentBreakPoint === Breakpoints.mobile,
		isMobilePlus: currentBreakPoint > Breakpoints.mobile,
		isSm: currentBreakPoint === Breakpoints.sm,
		isSmPlus: currentBreakPoint > Breakpoints.sm,
		isMd: currentBreakPoint === Breakpoints.md,
		isMdPlus: currentBreakPoint > Breakpoints.md,
		isMdMinus: currentBreakPoint < Breakpoints.md,
		isLg: currentBreakPoint === Breakpoints.lg,
		isLgPlus: currentBreakPoint > Breakpoints.lg,
		isLgMinus: currentBreakPoint < Breakpoints.lg,
	};
};

export default useCurrentBreakpoint;
