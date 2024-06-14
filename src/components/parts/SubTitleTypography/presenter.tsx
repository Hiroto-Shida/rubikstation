import { Box, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { SubTitleTypography } from "./container";

type Props = ComponentProps<typeof SubTitleTypography>;

export const SubTitleTypographyPresenter = ({ children, variant = "h6" }: Props) => {
  return (
    <>
      <Box
        component="div"
        sx={(theme) => ({
          padding: `${theme.spacing(1)} 0`,
        })}
      >
        <Typography variant={variant} align="left" sx={{ fontWeight: "bold" }}>
          {children}
        </Typography>
      </Box>
    </>
  );
};
