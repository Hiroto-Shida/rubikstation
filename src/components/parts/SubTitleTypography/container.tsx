import { ComponentProps, ReactNode } from "react";
import { Typography } from "@mui/material";
import { SubTitleTypographyPresenter } from "./presenter";

type Props = {
  children: ReactNode;
} & Pick<ComponentProps<typeof Typography>, "variant">;

export const SubTitleTypography = ({ children, variant }: Props) => {
  return <SubTitleTypographyPresenter variant={variant}>{children}</SubTitleTypographyPresenter>;
};
