// ** React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import FooterIllustrationsV1 from "../components/FooterIllustration";
import axios from "axios";
import { baseURL } from "../constants/baseURL";

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

const LoginScreen = () => {
  // ** State
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  // ** Hook
  const navigate = useNavigate();

  // ** Funtions
  const handleEmailChange = (event) => {
    console.log("email:", event.target.value);
    setEmail(event.target.value);
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
  const onLogin = () => {
    var data = JSON.stringify({
      password: password,
      email: email,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseURL}/api/TokenAuth/Authenticate`,
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
              sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: "center" }}
            >
              Welcome to To-Do App! 👋🏻
            </Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>
              Please sign-in to your account and start the adventure
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
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
              onChange={handleEmailChange}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={password}
                id="auth-login-password"
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
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              onClick={onLogin}
            >
              LogIn
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
                New on our platform?
              </Typography>
              <Typography variant="body2">
                <LinkStyled onClick={() => navigate("/register")}>
                  Create an account
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
// LoginScreen.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginScreen;
