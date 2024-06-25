import { Box, Divider, IconButton, ListItem, Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VCenterTypography } from "../../parts/VCenterTypography/container";
import { ComponentProps } from "react";
import { RecordListItem } from "./container";
import { convertToTimerText } from "../../timer/convertToTimerText";

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
      <ListItem sx={{ p: 0 }}>
        <Box component="div" sx={{ display: "flex", width: "100%" }}>
          {/* インデックス */}
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

          {/* タイム */}
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

          {/* ペナルティ */}
          <VCenterTypography
            variant="h6"
            sx={(theme: Theme) => ({
              minWidth: "60px",
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

          {/* スクランブル */}
          <VCenterTypography
            variant="h6"
            sx={(theme: Theme) => ({ ml: theme.spacing(1), flexGrow: 1 })}
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

          {/* 削除ボタン */}
          <IconButton
            // edge="end"
            aria-label="delete"
            onClick={() => handleDeleteRecord(record.id)}
            sx={{ "&:hover": { color: "themeBase.red" } }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
    </>
  );
};
