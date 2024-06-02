import { Box, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { TitleTypography } from "./container";

type Props = ComponentProps<typeof TitleTypography>;

export const TitleTypographyPresenter = ({ children }: Props) => {
  return (
    <>
      <Box component="div" sx={(theme) => ({ marginTop: theme.spacing(4) })} />
      <Typography variant="h6" align="left">
        {children}
      </Typography>
    </>
  );
};
