/* eslint-disable react/prop-types */
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItemNotes = ({ id, title, body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newBody = useMemo(() => {
    return body.length > 17 ? body.substring(0, 17) + "..." : body;
  }, [body]);

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={onActiveNote}>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={newTitle} />
            <ListItemText secondary={newBody} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};
