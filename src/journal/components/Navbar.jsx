/* eslint-disable react/prop-types */
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { startLogOut } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(startLogOut());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>

          <IconButton onClick={onLogOut} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
