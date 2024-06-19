import { create } from "zustand";

type StoreState = { modalOpen: boolean };

type StoreActions = {
  setModalOpen: (TorF: boolean) => void;
};

const initialState: StoreState = {
  modalOpen: false,
};

export const useModalOpenStore = create<StoreState & StoreActions>()((set) => ({
  ...initialState,

  setModalOpen: (TorF) => set({ modalOpen: TorF }),
}));
