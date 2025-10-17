export const isServer = () => {
	// eslint-disable-next-line no-console
	console.log("onServer: ", typeof window === "undefined");

	return typeof window === "undefined";
};
