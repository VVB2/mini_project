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
import Payment from './Payment';
import ReviewOrder from './ReviewOrder';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const steps = ['ADDRESS INFORMATION', 'PAYMENT'];
  console.log(cartInfo);
  for (const key in cartInfo.cartInfo) {
    console.log(
      cartInfo.cartInfo[key].productName,
      cartInfo.cartInfo[key].price
    );
  }
  let checkout = '';
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const next = (data) => {
    setShippingData(data);
    handleNext();
  };
  const Form = () => (activeStep === 0 ? <Address next={next} /> : <Payment />);
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
              setCartInfo(checkout);
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
      {activeStep === steps.length ? <ReviewOrder /> : <Form />}
      <Typography variant="subtitle1" color="textSecondary" id="timer" />
    </Card>
  );
};

export default Checkout;
