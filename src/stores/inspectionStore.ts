import { create } from "zustand";
import { getBooleanCookies } from "../tools/getBooleanCookies";

type StoreState = { inspection: boolean };

type StoreActions = {
  setInspection: (TorF: boolean) => void;
};

const initialState: StoreState = {
  // inspection: false,
  inspection: getBooleanCookies("inspection"),
};

export const useInspectionStore = create<StoreState & StoreActions>()((set) => ({
  ...initialState,

  setInspection: (TorF) => set({ inspection: TorF }),
}));
