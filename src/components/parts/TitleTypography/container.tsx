import { ComponentProps, ReactNode } from "react";
import { TitleTypographyPresenter } from "./presenter";
import { Typography } from "@mui/material";

type Props = {
  pageTop?: boolean; // ページ先頭のタイトルか否か
  children: ReactNode;
} & Pick<ComponentProps<typeof Typography>, "variant">;

export const TitleTypography = ({ children, variant, pageTop }: Props) => {
  return (
    <TitleTypographyPresenter variant={variant} pageTop={pageTop}>
      {children}
    </TitleTypographyPresenter>
  );
};
