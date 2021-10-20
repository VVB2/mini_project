import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Card } from '@material-ui/core';
import jwt from 'jsonwebtoken';
import Address from './Address';
import Payment from './Payment';
import ReviewOrder from './ReviewOrder';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const steps = ['ADDRESS INFORMATION', 'PAYMENT'];
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
  const back = () => {
    handleBack();
  };
  const Form = () =>
    activeStep === 0 ? (
      <Address next={next} shippingData={shippingData} cartInfo={cartInfo} />
    ) : (
      <Payment back={back} cartInfo={cartInfo} shippingData={shippingData} />
    );
  useEffect(() => {
    if (sessionStorage.getItem('checkoutInfo')) {
      jwt.verify(
        sessionStorage.getItem('checkoutInfo'),
        process.env.REACT_APP_JWT_SECRET,
        (err) => {
          if (!err) {
            checkout = jwt.decode(sessionStorage.getItem('checkoutInfo'));
            setCartInfo(checkout);
          }
        }
      );
    } else {
      window.location.href = 'http://localhost:3000/cart';
    }
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
        <ReviewOrder cartInfo={cartInfo} />
      ) : (
        <Form />
      )}
    </Card>
  );
};

export default Checkout;
