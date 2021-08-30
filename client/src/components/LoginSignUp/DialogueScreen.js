import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const DialogueScreen = ({ open, handleClose }) => {
  const [loginScreen, setLoginScreen] = useState(true);
  const handleScreen = () => {
    setLoginScreen(!loginScreen);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="login-popup"
      maxWidth="md"
    >
      {loginScreen ? (
        <LoginScreen handleScreen={handleScreen} />
      ) : (
        <SignupScreen handleScreen={handleScreen} />
      )}
    </Dialog>
  );
};

export default DialogueScreen;
