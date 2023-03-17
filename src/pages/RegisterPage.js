// ** React Imports
import { useState, Fragment } from "react";

import { useNavigate } from "react-router-dom";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// ** Demo Imports
import FooterIllustrationsV1 from "../components/FooterIllustration";
import { Link } from "react-router-dom";
import { baseURL } from "../constants/baseURL";
import axios from "axios";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const RegisterPage = () => {
  // ** States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ** Hook
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    console.log("email:", event.target.value);
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    console.log("email:", event.target.value);
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    console.log("password:", event.target.value);
    setPassword(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const register = () => {
    var data = JSON.stringify({
      password: password,
      username: username,
      email: email,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseURL}/api/TokenAuth/Register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success === true) {
          localStorage.setItem("user", response.data.result);
          navigate.push("/pages/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
        >
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              To-Do App
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Adventure starts here 🚀
            </Typography>
            <Typography variant="body2">
              Make your app management easy and fun!
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              fullWidth
              id="username"
              onChange={handleUsernameChange}
              label="Username"
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              type="email"
              onChange={handleEmailChange}
              label="Email"
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-register-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={password}
                id="auth-register-password"
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityIcon fontSize="small" />
                      ) : (
                        <VisibilityOffIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href="/" passHref>
                    <LinkStyled onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              onClick={register}
              variant="contained"
              sx={{ marginBottom: 7 }}
            >
              Sign up
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant="body2">
                <LinkStyled onClick={() => navigate("/")}>
                  Sign in instead
                </LinkStyled>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

export default RegisterPage;
