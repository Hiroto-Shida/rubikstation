import { Box, Stack } from "@mui/material";
import { Scramble } from "../../components/scramble/Scramble/container";
import { Timer } from "../../components/timer/Timer/container";

export const IndexPagePresenter = () => {
  return (
    <>
      <Box component="div">
        <Stack sx={{ alignItems: "center" }}>
          <Timer />
          <Scramble />
        </Stack>
      </Box>
    </>
  );
};
