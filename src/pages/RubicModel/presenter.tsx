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
        <RubicModel canvasStyle={{ width: "400px", height: "400px" }} />
      </Box>
    </>
  );
};
