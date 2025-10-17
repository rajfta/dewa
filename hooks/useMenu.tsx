import { createContext, useContext } from "react";

export const MenuContext = createContext({
    onClose: null,
    onOpen: null,
    isOpen: null,
    onToggle: null,
});

const useMenu = () => {
    const { isOpen, onClose, onOpen, onToggle } = useContext(MenuContext);
    return { isOpen, onClose, onOpen, onToggle };
};

export default useMenu;
