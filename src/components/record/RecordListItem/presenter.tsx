import { Box, Divider, IconButton, ListItem, Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VCenterTypography } from "../../parts/VCenterTypography/container";
import { ComponentProps } from "react";
import { RecordListItem } from "./container";
import { convertToTimerText } from "../../timer/convertToTimerText";
import styles from "./index.module.scss";
import clsx from "clsx";

type Props = ComponentProps<typeof RecordListItem>;

export const RecordListItemPresenter = ({
  record,
  recordListLength,
  fastestTimeId,
  latestTimeId,
  dialogRef,
  handleDeleteRecord,
}: Props) => {
  console.log("RecordListItemPresenter");
  console.log(dialogRef.current ? dialogRef.current.clientWidth : "- null -");

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
        sx={{
          p: 0,
          backgroundColor:
            record.id % 2 === 0 ? "themeBase.bgGray" : "themeBase.white",
        }}
      >
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

          {/* タイム & ペナルティ */}
          <VCenterTypography
            variant="h5"
            className={clsx(styles.timeAndPenalty, {
              [styles.Fastest]: record.id === fastestTimeId,
              [styles.Penalty]: record.penalty === "(DNF)",
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
            <p>{convertToTimerText(record.time)}</p>
            <p className={styles.penalty}>{record.penalty ?? ""}</p>
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
