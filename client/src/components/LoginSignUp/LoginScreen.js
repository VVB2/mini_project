import React, { useEffect, useState } from 'react';
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

const LoginScreen = () => {
  const history = useHistory();
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
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
    if (email === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError(true);
    } else if (password === '') {
      setPasswordError(true);
    } else {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/auth/login',
          { email, password },
          config
        );
        localStorage.setItem('authToken', data.token);
        window.location.href = 'http://localhost:3000';
      } catch (error) {
        setLoginStatus(error.response.data.error);
      }
    }
  };

  return (
    <Container style={{ margin: 'auto auto auto 10%' }}>
      <Grid container style={{ maxWidth: 840, textAlign: 'center' }}>
        <Grid item xs={4} className={classes.leftGrid}>
          <Typography variant="h5" color="textPrimary">
            Login
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ paddingTop: '10px' }}
          >
            Get access to your Orders, Wishlist and Recommendations
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          className={classes.rightGrid}
          style={{
            display: 'block',
          }}
        >
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
              <Typography
                variant="subtitle2"
                color="error"
                display="block"
                align="left"
              >
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
              <Typography
                variant="subtitle2"
                color="error"
                display="block"
                align="left"
              >
                Please enter Password
              </Typography>
            )}
          </FormControl>
          {loginStatus.length > 0 && (
            <Typography
              variant="subtitle2"
              color="error"
              display="block"
              align="left"
            >
              {loginStatus}
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
            Login
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
              marginTop: '50px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            component={Link}
            to="/signup"
          >
            New To AncientNerd?
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginScreen;
