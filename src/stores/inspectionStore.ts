import { create } from "zustand";

type StoreState = { inspection: boolean };

type StoreActions = {
  setInspection: (TorF: boolean) => void;
};

const initialState: StoreState = {
  inspection: false,
};

export const useInspectionStore = create<StoreState & StoreActions>()((set) => ({
  ...initialState,

  setInspection: (TorF) => set({ inspection: TorF }),
}));
