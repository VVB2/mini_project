import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './Auth.styles';

const SignupScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState('');
  const toggleVisbility = () => setVisible((value) => !value);
  useEffect(() => {
    if (localStorage.getItem('authToken')) history.goBack();
  }, [history]);
  const handleSubmit = async () => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    if (username === '' || username.length < 3 || username.length > 15)
      setUsernameError(true);
    else setUsernameError(false);
    if (email === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      setEmailError(true);
    else if (password === '') {
      setPasswordError(true);
    } else if (password !== confirmPassword) setConfirmPasswordError(true);
    else {
      try {
        const { data } = await axios.post(
          'https://artifacts-shop.herokuapp.com/api/auth/register',
          { username, email, password },
          config
        );
        localStorage.setItem('authToken', data.token);
        window.location.href = 'https://dazzling-lamport-c2fd9c.netlify.app/';
      } catch (error) {
        setSignUpStatus(error.response.data.error);
      }
    }
  };

  return (
    <Container style={{ margin: 'auto auto auto 10%' }}>
      <Grid container style={{ maxWidth: 840 }}>
        <Grid item xs={4} className={classes.leftGrid}>
          <Typography variant="h5" color="textPrimary">
            Looks like you&apos;re new here!
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ paddingTop: '10px' }}
          >
            Sign up with your mobile number to get started
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          className={classes.rightGrid}
          style={{
            display: 'block',
            paddingTop: 0,
          }}
        >
          <FormControl autoFocus fullWidth margin="normal">
            <InputLabel htmlFor="username-field" className={classes.staticText}>
              Enter Username
            </InputLabel>
            <Input
              id="username-field"
              type="text"
              error={usernameError}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.input}
            />
            {usernameError && (
              <Typography variant="subtitle2" color="error" display="block">
                Please enter an Username
              </Typography>
            )}
          </FormControl>
          <FormControl autoFocus fullWidth margin="normal">
            <InputLabel htmlFor="email-field" className={classes.staticText}>
              Enter Email
            </InputLabel>
            <Input
              id="email-field"
              type="text"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
            />
            {emailError && (
              <Typography variant="subtitle2" color="error" display="block">
                Please enter a valid Email ID
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" className={classes.inputs}>
            <InputLabel htmlFor="password-field" className={classes.staticText}>
              Enter Password
            </InputLabel>
            <Input
              id="password-field"
              type={visible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleVisbility}
                  >
                    {visible ? (
                      <Visibility className={classes.staticText} />
                    ) : (
                      <VisibilityOff className={classes.staticText} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.input}
            />
            {passwordError && (
              <Typography variant="subtitle2" color="error" display="block">
                Please enter Password
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" className={classes.inputs}>
            <InputLabel
              htmlFor="confirm-password-field"
              className={classes.staticText}
            >
              Confirm Password
            </InputLabel>
            <Input
              id="confirm-password-field"
              type={visible ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={passwordError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleVisbility}
                  >
                    {visible ? (
                      <Visibility className={classes.staticText} />
                    ) : (
                      <VisibilityOff className={classes.staticText} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.input}
            />
            {confirmPasswordError && (
              <Typography variant="subtitle2" color="error" display="block">
                Passwords do not match
              </Typography>
            )}
          </FormControl>
          {signUpStatus.length > 0 && (
            <Typography
              variant="subtitle2"
              color="error"
              display="block"
              align="left"
            >
              {signUpStatus}
            </Typography>
          )}
          <Typography variant="caption" className={classes.staticText}>
            By continuing, you agree to Artifact Shop&apos;s Terms of Use and
            Privacy Policy.
          </Typography>
          <Button
            autoFocus
            onClick={handleSubmit}
            color="inherit"
            fullWidth
            className={classes.button}
          >
            Sign Up
          </Button>
          <Typography
            variant="subtitle2"
            align="center"
            className={classes.staticText}
            style={{ marginTop: '25px', marginBottom: '40px' }}
          >
            OR
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            className={classes.staticText}
            style={{
              marginTop: '20px',
              cursor: 'pointer',
              textDecoration: 'none',
              paddingLeft: '38%',
            }}
            component={Link}
            to="/login"
          >
            Existing User? Log in
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupScreen;
