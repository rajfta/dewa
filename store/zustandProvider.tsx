import { createContext, type FC } from "react";

export const StoreContext = createContext(null);

type StoreProviderProps = {
    store: any;
    children?: React.ReactNode;
};

export const StoreProvider: FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
