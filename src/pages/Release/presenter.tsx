import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";

const StyledVersionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="h6" align="left">
      {children}
    </Typography>
  );
};

const StyledListItemText = ({ children }: { children: ReactNode }) => {
  return (
    <ListItem sx={{ m: 0, p: 0 }}>
      -
      <ListItemText primary={children} />
    </ListItem>
  );
};

export const ReleasePagePresenter = () => {
  return (
    <>
      <Typography variant="h4" align="left">
        リリース情報
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <StyledVersionTitle>[1.1.0] - 2024-05-18</StyledVersionTitle>
      <List>
        <StyledListItemText>
          タイマーがスタートするとき(スペースキーを押した時)の挙動を変更
        </StyledListItemText>
        <StyledListItemText>リリース情報ページを追加</StyledListItemText>
        <StyledListItemText>6面までの簡単手順ページを追加</StyledListItemText>
      </List>

      <StyledVersionTitle>[1.0.3] - 2024-05-16</StyledVersionTitle>
      <List>
        <StyledListItemText>
          タイマー機能を、スペース長押し後に開始するように変更
        </StyledListItemText>
        <StyledListItemText>
          ページのルーティングを正しく行なうように修正
        </StyledListItemText>
        <StyledListItemText>
          回転矢印が一部変になっていたのを修正
        </StyledListItemText>
      </List>

      <StyledVersionTitle>[1.0.0] - 2024-05-15</StyledVersionTitle>
      <List>
        <StyledListItemText>図解ありのスクランブル記号表示</StyledListItemText>
        <StyledListItemText>タイマー機能の追加</StyledListItemText>
      </List>

      <a target="_blank" href="https://github.com/Hiroto-Shida/rubic-timer">
        Git Hub
      </a>
    </>
  );
};
