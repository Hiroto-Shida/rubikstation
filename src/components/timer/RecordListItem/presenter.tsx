import { Box, Divider, IconButton, ListItem, Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VCenterTypography } from "../../parts/VCenterTypography/container";
import { convertToTimerText } from "../convertToTimerText";
import { ComponentProps } from "react";
import { RecordListItem } from "./container";

type Props = ComponentProps<typeof RecordListItem>;

export const RecordListItemPresenter = ({
  record,
  recordListLength,
  fastestTimeId,
  latestTimeId,
  handleDeleteRecord,
}: Props) => {
  return (
    <>
      {record.id === 0 && (
        <Box
          component="div"
          sx={(theme: Theme) => ({
            p: `${theme.spacing(0)} ${theme.spacing(2)}`,
          })}
        >
          previous time
        </Box>
      )}
      {record.id === 1 && <Divider component="li" />}
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteRecord(record.id)}
            sx={{ "&:hover": { color: "themeBase.red" } }}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <Box component="div" sx={{ display: "flex" }}>
          <VCenterTypography
            variant="h6"
            color={
              record.id === fastestTimeId
                ? "themeBase.blue"
                : record.id === latestTimeId
                ? "themeBase.red"
                : "themeText.primary"
            }
            sx={{
              minWidth: "30px",
              textAlign: "right",
            }}
          >
            {recordListLength - record.id}
          </VCenterTypography>
          <VCenterTypography
            variant="h5"
            sx={(theme: Theme) => ({
              ml: theme.spacing(1),
              fontWeight: record.id === fastestTimeId ? "bold" : "normal",
              minWidth: "100px",
              textAlign: "right",
              textDecoration: record.penalty === "(DNF)" ? "line-through" : "none",
            })}
            color={
              record.penalty === "(DNF)"
                ? "themeText.secondary"
                : record.id === fastestTimeId
                ? "themeBase.blue"
                : record.id === latestTimeId
                ? "themeBase.red"
                : "themeText.primary"
            }
          >
            {convertToTimerText(record.time)}
          </VCenterTypography>
          <VCenterTypography
            variant="h6"
            sx={(theme: Theme) => ({
              ml: theme.spacing(1),
              fontWeight: record.id === fastestTimeId ? "bold" : "normal",
            })}
            color={
              record.id === fastestTimeId
                ? "themeBase.blue"
                : record.id === latestTimeId
                ? "themeBase.red"
                : "themeText.primary"
            }
          >
            {record.penalty ?? ""}
          </VCenterTypography>
          <VCenterTypography
            variant="h6"
            sx={(theme: Theme) => ({ ml: theme.spacing(3) })}
            color={
              record.id === fastestTimeId
                ? "themeBase.blue"
                : record.id === latestTimeId
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
