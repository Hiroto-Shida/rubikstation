import { ComponentProps, ReactNode } from "react";
import { TitleTypographyPresenter } from "./presenter";
import { Typography } from "@mui/material";

type Props = {
  children: ReactNode;
} & Pick<ComponentProps<typeof Typography>, "variant">;

export const TitleTypography = ({ children, variant }: Props) => {
  return <TitleTypographyPresenter variant={variant}>{children}</TitleTypographyPresenter>;
};
