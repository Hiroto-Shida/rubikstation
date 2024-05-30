import { ReactNode } from "react";
import { LayoutPresenter } from "./presenter";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <LayoutPresenter>{children}</LayoutPresenter>;
};
