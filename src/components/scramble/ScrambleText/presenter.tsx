import { Typography } from "@mui/material";

type Props = {
  scrambleList: string[];
};

export const ScrambleTextPresenter = ({ scrambleList }: Props) => {
  return scrambleList.length && <Typography variant="h4">{scrambleList.join(" ")}</Typography>;
};
