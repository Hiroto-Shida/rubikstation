import { Typography, useTheme } from "@mui/material";
import { ComponentProps } from "react";
import { VCenterTypography } from "./container";

type Props = ComponentProps<typeof VCenterTypography>;

export const VCenterTypographyPresenter = ({
  children,
  sx,
  ...other
}: Props) => {
  const theme = useTheme(); // テーマを取得
  const resolvedSx = typeof sx === "function" ? sx(theme) : sx;

  return (
    <Typography
      variant="h6"
      {...other}
      sx={{
        ...resolvedSx,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Typography>
  );
};
