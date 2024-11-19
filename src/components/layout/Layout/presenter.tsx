import HomeIcon from "@mui/icons-material/Home";
// import Apps from "@mui/icons-material/Apps";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HelpIcon from "@mui/icons-material/Help";
import styles from "./index.module.scss";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { ComponentProps, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "./container";
import clsx from "clsx";

type Props = ComponentProps<typeof Layout> & {
  procedureOpen: boolean;
  setProcedureOpen: (TorF: boolean) => void;
  pathname: string;
};

const drawerWidth = 240;

export const LayoutPresenter = ({
  children,
  procedureOpen,
  setProcedureOpen,
  pathname,
}: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProcedureToggle = () => {
    setProcedureOpen(!procedureOpen);
  };

  const AppListItem = ({
    small = false,
    to,
    primaryText,
    icon,
  }: {
    small?: boolean;
    to: string;
    primaryText: string;
    icon?: ReactElement;
  }) => (
    <>
      <ListItem component={Link} to={to} disablePadding>
        <ListItemButton
          sx={(theme: Theme) => ({
            p: `${theme.spacing(small ? 1.5 : 2)} ${theme.spacing(1)}`,
            color: to === pathname ? "themeBase.primary" : "text.primary",
            position: "relative",
            "&::after": {
              content: `''`,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
              borderLeft:
                to === pathname
                  ? `10px ${theme.palette.themeBase.primary} solid`
                  : "none",
            },
          })}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography
            sx={{
              color: to === pathname ? "themeBase.primary" : "text.primary",
              fontWeight: to === pathname ? "bold" : "normal",
            }}
          >
            {primaryText}
          </Typography>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );

  const AppListItemProcedure = ({
    small = false,
    onClick,
    primaryText,
    icon,
  }: {
    small?: boolean;
    onClick: () => void;
    primaryText: string;
    icon?: ReactElement;
  }) => (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={(theme: Theme) => ({
            p: `${theme.spacing(small ? 1.5 : 2)} ${theme.spacing(1)}`,
          })}
          onClick={onClick}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography>{primaryText}</Typography>
          <ListItemIcon>
            {procedureOpen ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );

  const drawer = (
    <Box component="div">
      <Toolbar />
      <Divider />
      <List>
        <ListSubheader>メイン</ListSubheader>
        <Divider />
        <AppListItem to={"/"} primaryText="トップ" icon={<HomeIcon />} />
        {/* <AppListItem to={"/rubic-model"} primaryText="モデル" icon={<Apps />} /> */}
        <AppListItemProcedure
          primaryText="6面までの手順"
          onClick={handleProcedureToggle}
          icon={<AppRegistrationIcon />}
        />
        {procedureOpen && (
          <>
            <AppListItem
              small
              to={"/procedure/introduction"}
              primaryText="はじめに"
            />
            <AppListItem small to={"/procedure/1"} primaryText="ステップ1" />
            <AppListItem small to={"/procedure/2"} primaryText="ステップ2" />
            <AppListItem small to={"/procedure/3"} primaryText="ステップ3" />
            <AppListItem small to={"/procedure/4"} primaryText="ステップ4" />
            <AppListItem small to={"/procedure/5"} primaryText="ステップ5" />
            <AppListItem small to={"/procedure/6"} primaryText="ステップ6" />
            <AppListItem small to={"/procedure/7"} primaryText="ステップ7" />
          </>
        )}
        <ListSubheader>その他</ListSubheader>
        <Divider />
        <AppListItem
          to={"/release"}
          primaryText="リリース情報"
          icon={<NewReleasesIcon />}
        />
        <AppListItem to={"/help"} primaryText="ヘルプ" icon={<HelpIcon />} />
      </List>
    </Box>
  );

  return (
    <Box
      component="div"
      style={{ display: "flex" }}
      className={clsx({
        [styles.noSelect]: pathname === "/",
      })}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "themeBase.primary",
          zIndex: 16777273,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            RubikStation
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={window?.document?.body}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            zIndex: 16777272,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            zIndex: 16777272,
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          position: "relative",
        }}
      >
        <Toolbar />
        <Box
          component="div"
          sx={{
            minHeight: `calc(100vh - ${64 + 32}px)`, // ToolBarとmargint: 2の分を引く
            height: `calc(100% - ${64 + 32}px)`,
            position: "relative",
            // padding: 2,
            margin: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
