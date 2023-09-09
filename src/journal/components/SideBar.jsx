/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItemNotes } from "./SideBarItemNotes";

export const SideBar = ({ drawerWidth }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          {/* <Avatar sx={{ mr: 2 }}>{photoURL}</Avatar> */}
          <Avatar sx={{ mr: 2 }} src={!!photoURL ? photoURL : "N"} />

          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItemNotes {...note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
