import { createContext, type FC } from "react";
import type { StoreApi } from "zustand";
import type { StoreState } from "./types";

type StoreType = StoreApi<StoreState> & {
    (
        selector: (state: StoreState) => unknown,
        eqFn?: (a: unknown, b: unknown) => boolean,
    ): unknown;
    getState: () => StoreState;
    setState: (state: Partial<StoreState>) => void;
    subscribe: (listener: (state: StoreState) => void) => () => void;
};

export const StoreContext = createContext<StoreType | null>(null);

type StoreProviderProps = {
    store: StoreType;
    children?: React.ReactNode;
};

export const StoreProvider: FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
