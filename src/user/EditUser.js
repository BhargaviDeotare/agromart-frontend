import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAuthenticated, signup } from "../auth/helper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUser, updateUser } from "./helper/userapicalls";
const theme = createTheme();

const EditUser = ({ match }) => {
  const userId = useParams();
  let navigate = useNavigate();
  const [values, setValues] = useState({
    getRedirect: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success, getRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const token = isAuthenticated() && isAuthenticated().token;
  const userid = isAuthenticated() && isAuthenticated().user._id;

  const preload = (userid) => {
    getUser(userid, token).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.eror });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }
    });
  };
  useEffect(() => {
    preload(userid);
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    updateUser(match.params.userId, token, { name, email, password })
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            getRedirect: true,
          });
        }
      })
      .catch(console.log("Error in Updating User"));
  };
  const EditForm = () => {
    return (
      <ThemeProvider theme={theme}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit User
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={handleChange("name")}
                value={name}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                onChange={handleChange("email")}
                value={email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                onChange={handleChange("password")}
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Details
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
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
            Your account was updated successfully.
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
  const getOut = () => {
    if (getRedirect) {
      navigate("/user/dashboard");
    }
  };
  return (
    <Base title="" description="">
      {successMessage()}
      {errorMessage()}
      {EditForm()}
      {getOut()}
    </Base>
  );
};

export default EditUser;
