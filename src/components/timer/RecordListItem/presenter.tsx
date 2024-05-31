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
          >
            <DeleteIcon />
          </IconButton>
        }
        key={index}
      >
        <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
          <VCenterTypography
            variant="h6"
            color={index === fastestTimeIndex ? "primary" : "textPrimary"}
          >
            {recordListLength - index}
          </VCenterTypography>
          <VCenterTypography
            variant="h5"
            sx={(theme) => ({
              ml: theme.spacing(3),
              fontWeight: index === fastestTimeIndex ? "bold" : "normal",
            })}
            color={index === fastestTimeIndex ? "primary" : "textPrimary"}
          >
            {convertToTimerText(record.time)}
          </VCenterTypography>
          <VCenterTypography
            variant="h6"
            sx={(theme) => ({ ml: theme.spacing(3) })}
            color={index === fastestTimeIndex ? "primary" : "textPrimary"}
          >
            {record.scramble}
          </VCenterTypography>
        </Box>
      </ListItem>
    </>
  );
};
