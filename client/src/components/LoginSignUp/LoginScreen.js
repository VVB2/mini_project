import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './Auth.styles';

const LoginScreen = ({ handleScreen }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const toggleVisbility = () => setVisible((value) => !value);
  function handleSubmit() {
    if (
      email === '' ||
      email.match(
        /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
      )
    ) {
      setEmailError(true);
    } else setEmailError(false);
    if (password === '') {
      setPasswordError(true);
    } else setPasswordError(false);
  }

  return (
    <div>
      <Grid container style={{ maxWidth: 675, maxHeight: 528 }}>
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
          <Typography variant="caption" className={classes.staticText}>
            By continuing, you agree to Flipkart&apos;s Terms of Use and Privacy
            Policy.
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
          >
            OR
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            className={classes.staticText}
            style={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={handleScreen}
          >
            New To AncientNerd?
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
