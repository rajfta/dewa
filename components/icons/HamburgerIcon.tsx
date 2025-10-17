import { createIcon } from "@chakra-ui/react";

export const HamburgerIcon = createIcon({
	displayName: "HamburgerIcon",
	viewBox: "0 0 36 21",
	path: (
		<>
			<rect x="13" width="23" height="3" rx="1.5" fill="currentColor" />
			<rect y="9" width="36" height="3" rx="1.5" fill="#D72020" />
			<rect y="18" width="36" height="3" rx="1.5" fill="currentColor" />
		</>
	),
});
