/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, titulo = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { md: 500 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {titulo}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
