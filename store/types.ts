export type InitialState = {
    editableSite: boolean;
};

export type StoreState = InitialState & {
    setEditableSite: (editableSite: boolean) => void;
};
