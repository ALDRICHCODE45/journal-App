/* eslint-disable no-extra-boolean-cast */
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link } from "react-router-dom";
import { Link as LinkReact } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startEmailPasswordSignIn } from "../../store/auth/thunks";
import { useMemo } from "react";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(startEmailPasswordSignIn(data));
  });
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  return (
    <AuthLayout titulo="Register">
      <form className=" animate__animated animate__fadeIn" onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="name"
              type="text"
              placeholder="Aldrich"
              fullWidth
              {...register("name", {
                required: {
                  value: true,
                  message: "el nombre es requerido",
                },
                minLength: {
                  value: 4,
                  message: "el nombre debe contener minimo 4 caracteres",
                },
              })}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              {...register("email", {
                required: {
                  value: true,
                  message: "el email es requerido",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "correo no valido",
                },
              })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="password"
              fullWidth
              {...register("password", {
                required: {
                  value: true,
                  message: "la contraseña es requerida",
                },
                minLength: {
                  value: 4,
                  message: "la contrasena debe contener minimo 4 caracteres",
                },
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid display={!!errorMessage ? "" : "none"} item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                <Typography sx={{ mt: 1 }}>Crear Cuenta</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={LinkReact} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
