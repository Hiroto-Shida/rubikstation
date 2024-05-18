import { Typography } from "@mui/material";

type Props = {
  isDisplay: boolean;
  multiTextList: string[][];
};

export const ScrambleTextPresenter = ({ isDisplay, multiTextList }: Props) => {
  return (
    isDisplay &&
    multiTextList[0].length && (
      <>
        {multiTextList.map((childList, index) => (
          <Typography variant="h4" key={index}>
            {childList.join(" ")}
          </Typography>
        ))}
      </>
    )
  );
};
