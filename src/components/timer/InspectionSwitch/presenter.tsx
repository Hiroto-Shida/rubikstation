import { Box, styled, Switch, Typography } from "@mui/material";

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  animation: "fancyBorder 1s ease",
  "@keyframes fancyBorder": {
    "0%": {
      opacity: "100%",
    },
    "100%": {
      opacity: "0",
    },
  },
});

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inspection: boolean;
  animate: boolean;
};

export const InspectionSwitchPresenter = ({ handleChange, inspection, animate }: Props) => {
  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        right: 0,
        top: "40%",
        transform: "translate(125%, -50%)",
        width: "110px",
        height: "50px",
      }}
    >
      {animate ? (
        <StyledTypography>{inspection ? "Inspection On" : "Inspection Off"}</StyledTypography>
      ) : (
        <Typography></Typography>
      )}
      <Switch onChange={handleChange} sx={{ bottom: 0 }} />
    </Box>
  );
};
