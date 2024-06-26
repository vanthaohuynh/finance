import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { handleAjaxError } from '../../helpers/helpers';
import { info, success, error } from '../../helpers/notifications';

const theme = createTheme();

// const Login = ({ handleSuccessfulAuth }) => {
const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const loginAPIEndpoint = '/login';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const url = loginAPIEndpoint;
    // const body = JSON.stringify({ user });
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json',
    //   Authorization: `Bearer ${JWT_TOKEN}`,
    // };
    // console.log('Login: ', url, user);
    try {
      const response = await axios.post(url, user);
      // console.log('Login: handleSubmit: response: ', response);
      // console.log('Login: handleSubmit: response: ', response.data.status);
      if (response.status === 200) {
        // console.log('Login: handleSubmit: response.data: ', response.data);
        // handleSuccessfulAuth(response.data);
        handleLogin(response.data);
      } else {
        setErrorLogin(true);
        error('Login failed. Please try again.');
      }
    } catch (err) {
      handleAjaxError(err);
      setErrorLogin(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
          <div>
            <img src="/logo.png" alt="logo" width="200" height="200" />
          </div>
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="text" variant="text">
            For Demo purpose, use email: demo, password: demo
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              // autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {errorLogin && (
              <Typography component="p" variant="body2" color="error">
                Email or password incorrect. Please try again.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

Login.propTypes = {
  // handleSuccessfulAuth: PropTypes.func,
  handleLogin: PropTypes.func.isRequired,
};

// Login.defaultProps = {
//   handleSuccessfulAuth: () => {},
// };

export default Login;
