import { createContext, useContext } from "react";

export const ContactContext = createContext({
    onClose: null,
    onOpen: null,
    isOpen: null,
});

const useContact = () => {
    const { isOpen, onClose, onOpen } = useContext(ContactContext);
    return { isOpen, onClose, onOpen };
};

export default useContact;
