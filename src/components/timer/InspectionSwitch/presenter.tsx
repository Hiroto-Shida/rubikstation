import { Box, Switch, Typography } from "@mui/material";
import "./styles.css"; // スタイルシートをインポート
import React from "react";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  // checked: boolean;
  activeClass: string;
};

export const InspectionSwitchPresenter = ({
  handleChange,
  inspection,
  // checked,
  activeClass,
}: Props) => {
  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        right: 0,
        top: "60%",
        transform: "translate(120%, -50%)",
        width: "110px",
        height: "50px",
      }}
    >
      <Box component="div" sx={{ position: "relative" }}>
        <Box component="div" sx={{ position: "absolute", top: "-50%" }}>
          <Typography
            className={`message ${activeClass}`}
            sx={{
              fontWeight: inspection ? "bold" : "normal",
            }}
          >
            {inspection ? "Inspection On" : "Inspection Off"}
          </Typography>
        </Box>
        <Switch
          // checked={checked}
          onChange={handleChange}
          sx={{}}
        />
      </Box>
    </Box>
  );
};
