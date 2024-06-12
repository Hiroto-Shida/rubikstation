import { Typography } from "@mui/material";
import { ComponentProps } from "react";
import { BodyTypography } from "./container";

type Props = ComponentProps<typeof BodyTypography>;

export const BodyTypographyPresenter = ({ children }: Props) => {
  return (
    <>
      <Typography variant="body1" align="left">
        {children}
      </Typography>
    </>
  );
};
