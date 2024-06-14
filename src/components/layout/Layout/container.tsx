import { ReactNode, useEffect } from "react";
import { LayoutPresenter } from "./presenter";
import { useProcedureDrawerOpenStore } from "../../../stores/procedureDrawerOpenStore";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { procedureOpen, setProcedureOpen } = useProcedureDrawerOpenStore();

  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname.includes("procedure")) {
      setProcedureOpen(true);
    }
  }, []);

  return (
    <LayoutPresenter
      procedureOpen={procedureOpen}
      setProcedureOpen={setProcedureOpen}
      pathname={pathname}
    >
      {children}
    </LayoutPresenter>
  );
};
