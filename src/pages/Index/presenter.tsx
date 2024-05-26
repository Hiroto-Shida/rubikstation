import { Box, Stack } from "@mui/material";
import { Scramble } from "../../components/scramble/Scramble/container";
import { Timer } from "../../components/timer/Timer/container";
import { useContext, useEffect } from "react";
import { ContentWidthContext } from "../../providers/ContentWidthProvider";

export const IndexPagePresenter = () => {
  // const contentWidth = useContext(ContentWidthContext);

  // useEffect(() => {
  //   console.log(`contentWidth = ${contentWidth}`);
  // }, [contentWidth]);

  return (
    <>
      <Box
        component="div"
        sx={
          {
            // backgroundColor: "red",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
        <Stack sx={{ alignItems: "center" }}>
          <Timer />
          <Scramble />
        </Stack>
      </Box>
    </>
  );
};
