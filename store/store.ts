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

export const useStore = (selector: any, eqFn?: any) => {
    const store = useContext(StoreContext);
    const values = store(selector, eqFn);

    return values;
};

export const editableSiteSelector = (state: any) => state.editableSite;
export const setEditableSiteSelector = (state: any) => state.setEditableSite;
