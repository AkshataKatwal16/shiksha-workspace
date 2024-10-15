import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DatabaseIcon from "@mui/icons-material/Storage";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const menuItems = [
  { text: "Create", key: "create" },
  { text: "All My Contents", key: "allContents" },
  { text: "Draft", key: "draft" },
  { text: "Submitted for Review", key: "submitted" },
  { text: "Publish", key: "publish" },
];

interface SidebarProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, onSelect }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme<any>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (key: string) => {
    console.log(key);
    router.push(`/workspace/content/${key}`);
    onSelect(key);
    if (isMobile) {
      setDrawerOpen(false); // Close drawer after selecting in mobile view
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const goBack = () => {
    router.push("/");
  };

  const drawerContent = (
    <Box margin={"1rem"} width={"100%"} height={"100%"}>
      <Box
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <ListItemIcon>
            <IconButton onClick={goBack}>
              <ArrowBackIcon sx={{ color: theme.palette.warning["100"] }} />
            </IconButton>
            <IconButton>
              <MenuIcon sx={{ color: theme.palette.warning["100"] }} />
            </IconButton>
          </ListItemIcon>
          <Typography
            variant="h2"
            fontSize={"16px"}
            sx={{ color: theme.palette.warning["100"] }}
          >
            Workspace
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            sx={{
              gap: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "4rem",
              backgroundColor:
                selectedKey === item.key
                  ? "var(--mui-palette-primary-main)"
                  : "transparent",
              color:
                selectedKey === item.key
                  ? "#2E1500"
                  : theme.palette.warning.A200,

              "&:hover": {
                background:
                  selectedKey === item.key
                    ? "var(--mui-palette-primary-main)"
                    : "transparent",
              },
            }}
            key={item.key}
            onClick={() => handleNavigation(item.key)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ marginLeft: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true, // Improves performance on mobile
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: 250,
            height: "100vh",
            bgcolor: theme.palette.background.paper,
            borderRight: 1,
            borderColor: theme.palette.divider,
          }}
        >
          {drawerContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
