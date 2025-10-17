export const loadState = (key: string) => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState != null) {
			return JSON.parse(serializedState);
		}
		return undefined;
	} catch {
		return undefined;
	}
};

export const saveState = (key: string, value: any) => {
	try {
		const serializedState = JSON.stringify(value);
		localStorage.setItem(key, serializedState);
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
};
