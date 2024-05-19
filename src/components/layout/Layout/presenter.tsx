import HomeIcon from "@mui/icons-material/Home";
import Apps from "@mui/icons-material/Apps";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import MenuIcon from "@mui/icons-material/Menu";

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
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const drawerWidth = 240;

export const LayoutPresenter = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const AppListItem = ({
    to,
    primaryText,
    icon,
  }: {
    to: string;
    primaryText: string;
    icon: ReactElement;
  }) => (
    <>
      <ListItem component={Link} to={to} disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primaryText} />
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
        <AppListItem to={"/rubic-model"} primaryText="モデル" icon={<Apps />} />
        <AppListItem
          to={"/procedure"}
          primaryText="6面までの手順"
          icon={<AppRegistrationIcon />}
        />
        <ListSubheader>その他</ListSubheader>
        <Divider />
        <AppListItem
          to={"/release"}
          primaryText="リリース情報"
          icon={<NewReleasesIcon />}
        />
      </List>
    </Box>
  );

  return (
    <Box component="div" style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="primary"
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
          <Typography variant="h6" noWrap component="div">
            ルービックキューブタイマー
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box component="div">{children}</Box>
      </Box>
    </Box>
  );
};
