import { Typography } from "@mui/material";

type Props = {
  isDisplay: boolean;
  scrambleList: string[];
};

export const ScrambleTextPresenter = ({ isDisplay, scrambleList }: Props) => {
  return (
    isDisplay &&
    scrambleList.length && <Typography variant="h4">{scrambleList.join(" ")}</Typography>
  );
};
