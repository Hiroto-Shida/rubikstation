import { ReactNode } from "react";
import { TitleTypographyPresenter } from "./presenter";

type Props = {
  children: ReactNode;
};

export const TitleTypography = ({ children }: Props) => {
  return <TitleTypographyPresenter>{children}</TitleTypographyPresenter>;
};
