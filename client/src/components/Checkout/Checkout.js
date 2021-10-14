import React, { useState, useEffect } from 'react';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
} from '@material-ui/core';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import Address from './Address';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['ADDRESS INFORMATION', 'REVIEW', 'PAYMENT'];
  let checkout = '';
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Address />;
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  }
  useEffect(() => {
    if (localStorage.getItem('checkoutInfo')) {
      jwt.verify(
        localStorage.getItem('checkoutInfo'),
        process.env.REACT_APP_JWT_SECRET,
        (err) => {
          if (!err) {
            checkout = jwt.decode(localStorage.getItem('checkoutInfo'));
            if (
              moment(moment.unix(checkout.exp).format()).isAfter(
                moment().format()
              )
            ) {
              console.log(checkout);
            }
          } else {
            localStorage.removeItem('checkoutInfo');
          }
        }
      );
    } else {
      localStorage.removeItem('checkoutInfo');
      window.location.href = 'http://localhost:3000/cart';
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (
        moment(moment.unix(checkout.exp).format()).isAfter(moment().format())
      ) {
        const expTime = moment.unix(checkout.exp);
        const now = moment();
        const mins = moment
          .utc(moment(expTime, 'HH:mm:ss').diff(moment(now, 'HH:mm:ss')))
          .format('mm:ss');
        if (mins !== '00:00')
          document.getElementById(
            'timer'
          ).innerHTML = `Note: Remaining time till session expires ${mins}`;
        else {
          localStorage.removeItem('checkoutInfo');
          window.location.href = 'http://localhost:3000/cart';
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Card>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography>All steps completed</Typography>
        </div>
      ) : (
        <div>
          {getStepContent(activeStep)}
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      )}
      <Typography variant="subtitle1" color="textSecondary" id="timer" />
    </Card>
  );
};

export default Checkout;
