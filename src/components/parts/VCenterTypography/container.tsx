import { TypographyProps } from "@mui/material";
import { VCenterTypographyPresenter } from "./presenter";

export const VCenterTypography = ({
  children,
  sx,
  ...other
}: TypographyProps) => {
  return (
    <VCenterTypographyPresenter sx={sx} {...other}>
      {children}
    </VCenterTypographyPresenter>
  );
};
