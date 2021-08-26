import React, { useState } from 'react';
import {
  Dialog,
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  inputs: {
    marginBottom: '15px',
    color: 'red',
  },
  leftGrid: {
    backgroundColor: '#2874f0',
    padding: '40px 33px',
    width: '204px',
    height: '448px',
    backgroundImage:
      "url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')",
    backgroundPositionX: 'center',
    backgroundPositionY: '85%',
    backgroundRepeat: 'no-repeat',
  },
  rightGrid: {
    backgroundColor: '#fff',
    padding: '56px 35px 16px',
  },
  button: {
    backgroundColor: '#fb641b',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)',
    color: '#fff',
    height: '48px',
    fontSize: '15px',
  },
}));

const LoginScreen = ({ open, handleClose }) => {
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
    }
    if (password === '') {
      setPasswordError(true);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="login-popup"
      maxWidth="xl"
    >
      <Grid container>
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
            <InputLabel htmlFor="email-field">Enter Email</InputLabel>
            <Input
              id="email-field"
              type="text"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <Typography variant="subtitle2" color="error" display="block">
                Please enter a valid Email ID
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" className={classes.inputs}>
            <InputLabel htmlFor="password-field">Enter Password</InputLabel>
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
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError && (
              <Typography variant="subtitle2" color="error" display="block">
                Please enter Password
              </Typography>
            )}
          </FormControl>
          <Button
            autoFocus
            onClick={handleSubmit}
            color="inherit"
            fullWidth
            className={classes.button}
          >
            Login
          </Button>
          <Typography variant="subtitle2" align="center">
            OR
          </Typography>
          <Typography variant="subtitle2" align="center">
            New To AncientNerd?
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default LoginScreen;
