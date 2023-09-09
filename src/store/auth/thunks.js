import {
  logOutFirebase,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { clearNoteLogOut } from "../journal/journalSlice";
import { checkingCredentials, logOut, login } from "./AuthSlice";

export const checkingAuthentication = () => async (dispatch) => {
  dispatch(checkingCredentials());
};

export const startGoogleSignIn = () => async (dispatch) => {
  dispatch(checkingCredentials());

  const result = await singInWithGoogle();
  if (!result.ok) return dispatch(logOut(result.errorMessage));

  dispatch(
    login({
      uid: result.uid,
      email: result.email,
      displayName: result.displayName,
      photoURL: result.photoURL,
    })
  );
};

export const startEmailPasswordSignIn =
  ({ email, password, name }) =>
  async (dispatch) => {
    dispatch(checkingCredentials());

    const resp = await registerUserWithEmailPassword({
      email,
      password,
      name,
    });

    if (!resp.ok) return dispatch(logOut({ errorMessage: resp.errorMessage }));
    dispatch(
      login({
        uid: resp.uid,
        email: resp.email,
        displayName: resp.name,
        photoURL: resp.photoURL,
      })
    );
  };

export const startLoginWithEmailPassword =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, errorMessage, uid, photoURL, displayName } =
      await loginWithEmailPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logOut({ errorMessage }));

    dispatch(
      login({
        uid,
        photoURL,
        displayName,
        email,
      })
    );
  };

export const startLogOut = () => async (dispatch) => {
  dispatch(checkingCredentials());
  await logOutFirebase();
  dispatch(clearNoteLogOut());
  dispatch(logOut());
};
