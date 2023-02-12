import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "@material-ui/core";
import { signup } from "../auth/helper";
import Menu from "../core/Menu";
export default function Verification() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    error: "",
    success: "",
  });

  const { name, email, phone, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone })
      .then((data) => {
        console.log(data);
        if (data && data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup", error));
  };

  const signUpForm = () => {
    return (
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="n1" variant="h5">
              Sing Up
            </Typography>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                value={name}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                autoFocus
                onChange={handleChange("name")}
              />
              <TextField
                value={email}
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
              />
              <TextField
                value={password}
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                autoComplete="password"
                autoFocus
                onChange={handleChange("password")}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2"></Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link href="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu></Menu>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </div>
  );
}
