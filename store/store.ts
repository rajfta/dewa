import { useContext } from "react";
import { create } from "zustand";

import type { InitialState, StoreState } from "./types";
import { loadState, saveState } from "./util";
import { StoreContext } from "./zustandProvider";

const initialState: InitialState = {
    editableSite: !!loadState("editableSite"),
};

export function initStore(preloadedState: InitialState = initialState) {
    return create<StoreState>((set) => ({
        ...initialState,
        ...preloadedState,
        setEditableSite: (editableSite) => {
            set({ editableSite });
            if (editableSite) {
                localStorage.setItem("editableSite", "true");
                saveState("editableSite", "true");
            } else {
                saveState("editableSite", "");
            }
        },
    }));
}

export const useStore = <T>(
    selector: (state: StoreState) => T,
    eqFn?: (a: T, b: T) => boolean,
) => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useStore must be used within StoreProvider");
    }
    const values = store(selector, eqFn);

    return values;
};

export const editableSiteSelector = (state: StoreState) => state.editableSite;
export const setEditableSiteSelector = (state: StoreState) =>
    state.setEditableSite;
