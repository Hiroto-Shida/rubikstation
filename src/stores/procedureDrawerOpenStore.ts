import { create } from "zustand";

type StoreState = { procedureOpen: boolean };

type StoreActions = {
  setProcedureOpen: (TorF: boolean) => void;
};

const initialState: StoreState = {
  procedureOpen: false,
};

// stateの定義と更新ロジックを含むストアを作成。
export const useProcedureDrawerOpenStore = create<StoreState & StoreActions>()((set) => ({
  ...initialState,

  setProcedureOpen: (TorF) => set({ procedureOpen: TorF }),
}));
