import { Box, Divider, IconButton, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VCenterTypography } from "../../parts/VCenterTypography/container";
import { convertToTimerText } from "../convertToTimerText";
import { ComponentProps } from "react";
import { RecordListItem } from "./container";

type Props = ComponentProps<typeof RecordListItem>;

export const RecordListItemPresenter = ({
  record,
  index,
  recordListLength,
  fastestTimeIndex,
  latestTimeIndex,
  handleDeleteRecord,
}: Props) => {
  return (
    <>
      {index === 0 && (
        <Box
          component="div"
          sx={(theme) => ({
            p: `${theme.spacing(0)} ${theme.spacing(2)}`,
          })}
        >
          previous time
        </Box>
      )}
      {index === 1 && <Divider component="li" />}
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteRecord(index)}
            sx={{ "&:hover": { color: "themeBase.red" } }}
          >
            <DeleteIcon />
          </IconButton>
        }
        key={index}
      >
        <Box component="div" sx={{ display: "flex" }}>
          <VCenterTypography
            variant="h6"
            color={
              index === fastestTimeIndex
                ? "themeBase.blue"
                : index === latestTimeIndex
                ? "themeBase.red"
                : "themeText.primary"
            }
            sx={{
              minWidth: "30px",
              textAlign: "right",
            }}
          >
            {recordListLength - index}
          </VCenterTypography>
          <VCenterTypography
            variant="h5"
            sx={(theme) => ({
              ml: theme.spacing(1),
              fontWeight: index === fastestTimeIndex ? "bold" : "normal",
              minWidth: "100px",
              textAlign: "right",
            })}
            color={
              index === fastestTimeIndex
                ? "themeBase.blue"
                : index === latestTimeIndex
                ? "themeBase.red"
                : "themeText.primary"
            }
          >
            {convertToTimerText(record.time)}
          </VCenterTypography>
          <VCenterTypography
            variant="h6"
            sx={(theme) => ({ ml: theme.spacing(3) })}
            color={
              index === fastestTimeIndex
                ? "themeBase.blue"
                : index === latestTimeIndex
                ? "themeBase.red"
                : "themeText.primary"
            }
          >
            {record.scramble}
          </VCenterTypography>
        </Box>
      </ListItem>
    </>
  );
};
