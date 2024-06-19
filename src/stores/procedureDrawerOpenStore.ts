import { create } from "zustand";

type StoreState = { procedureOpen: boolean };

type StoreActions = {
  setProcedureOpen: (TorF: boolean) => void;
};

const initialState: StoreState = {
  procedureOpen: false,
};

export const useProcedureDrawerOpenStore = create<StoreState & StoreActions>()((set) => ({
  ...initialState,

  setProcedureOpen: (TorF) => set({ procedureOpen: TorF }),
}));
