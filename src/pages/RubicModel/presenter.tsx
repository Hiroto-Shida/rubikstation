import React from "react";
import { Box } from "@mui/material";
import { RubicModel } from "../../components/rubicModel/RubicModel/container";

export const RubicModelPagePresenter: React.FC = () => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <RubicModel moveChar={"D"} />
      </Box>
    </>
  );
};
