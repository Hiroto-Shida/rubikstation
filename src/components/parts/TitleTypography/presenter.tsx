import { Box, Theme, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { TitleTypography } from "./container";

type Props = ComponentProps<typeof TitleTypography>;

export const TitleTypographyPresenter = ({ children, variant = "h4", pageTop }: Props) => {
  return (
    <>
      <Box
        component="div"
        sx={(theme: Theme) => ({
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(1),
          padding: theme.spacing(1),
          backgroundColor: pageTop ? "themeBase.secondaryAlpha" : "themeBase.primaryAlpha",
        })}
      >
        <Typography variant={variant} align="left" sx={{ fontWeight: "bold" }}>
          {children}
        </Typography>
      </Box>
    </>
  );
};
