import { useMemo } from "react";
import { initStore } from "./store";
import type { InitialState } from "./types";

// biome-ignore lint/suspicious/noExplicitAny: Zustand store type is complex, using any for flexibility
let store: any;

export const initializeStore = (preloadedState?: InitialState) => {
    // eslint-disable-next-line no-underscore-dangle
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Zustand state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export function useHydrate(initialState: InitialState | string | undefined) {
    const state =
        typeof initialState === "string"
            ? JSON.parse(initialState)
            : initialState;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const store = useMemo(() => initializeStore(state), [state]);
    return store;
}
