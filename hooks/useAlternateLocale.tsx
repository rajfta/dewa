import { createContext, useContext } from "react";

type AlternateLocaleContextType = {
    /** The URL path for the alternate language version of this page */
    alternatePath: string | null;
    /** Set the alternate path for the current page */
    setAlternatePath: (path: string | null) => void;
};

export const AlternateLocaleContext = createContext<AlternateLocaleContextType>(
    {
        alternatePath: null,
        setAlternatePath: () => {},
    },
);

const useAlternateLocale = () => {
    return useContext(AlternateLocaleContext);
};

export default useAlternateLocale;
