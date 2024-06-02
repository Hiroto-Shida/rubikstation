import { Box, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { TitleTypography } from "./container";

type Props = ComponentProps<typeof TitleTypography>;

export const TitleTypographyPresenter = ({ children, variant = "h4" }: Props) => {
  return (
    <>
      <Box component="div" sx={(theme) => ({ marginTop: theme.spacing(4) })} />
      <Typography variant={variant} align="left" sx={{ fontWeight: "bold" }}>
        {children}
      </Typography>
    </>
  );
};
