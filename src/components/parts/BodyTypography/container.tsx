import { ReactNode } from "react";
import { BodyTypographyPresenter } from "./presenter";

type Props = {
  children: ReactNode;
};

export const BodyTypography = ({ children }: Props) => {
  return <BodyTypographyPresenter>{children}</BodyTypographyPresenter>;
};
