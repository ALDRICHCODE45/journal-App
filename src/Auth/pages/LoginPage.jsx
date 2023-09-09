/* eslint-disable no-extra-boolean-cast */
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkReact } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import {
  // checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useMemo } from "react";

export const LoginPage = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = handleSubmit((data) => {
    dispatch(startLoginWithEmailPassword(data));
  });

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <>
      <AuthLayout titulo="Login">
        <form
          className=" animate__animated animate__fadeIn"
          onSubmit={onSubmit}
        >
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                {...register("email")}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="password"
                type="password"
                placeholder="password"
                fullWidth
                {...register("password")}
              />
            </Grid>

            <Grid
              container
              display={!!errorMessage ? "" : "none"}
              sx={{ mt: 1 }}
            >
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticating}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  <Typography sx={{ mt: 1 }}>Login</Typography>
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticating}
                  onClick={onGoogleSignIn}
                  variant="contained"
                  fullWidth
                >
                  <Google />
                  <Typography sx={{ ml: 1, mt: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Link component={LinkReact} color="inherit" to="/auth/register">
                Crear Cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
