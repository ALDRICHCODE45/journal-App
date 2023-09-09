/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, login } from "../../store/auth/AuthSlice";
import { FirebaseAuth } from "../../firebase/config";
import { startLoadingNotes } from "../../store/journal/thunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logOut());

      dispatch(login(user));

      dispatch(startLoadingNotes());
    });
  }, []);

  return {
    status,
  };
};
