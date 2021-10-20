/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Typography,
  Button,
  Divider,
  Card,
  CircularProgress,
} from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import moment from 'moment';
import generateUniqueId from 'generate-unique-id';
import ReviewOrder from './ReviewOrder';

const Payment = ({ back, cartInfo, shippingData }) => {
  const [loading, setLoading] = useState(false);
  let total = 0;
  let expectedDelivery = 0;
  for (const key in cartInfo.cartInfo) {
    total += cartInfo.cartInfo[key].price;
    if (cartInfo.cartInfo[key].expectedDeliveryDays > expectedDelivery) {
      expectedDelivery = cartInfo.cartInfo[key].expectedDeliveryDays;
    }
  }
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const handleSubmit = async (event, elements, stripe) => {
    setLoading(true);
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) setLoading(false);
    else {
      const id = generateUniqueId({
        length: 16,
        useLetters: false,
        useNumbers: true,
      });
      const orderData = {
        items: cartInfo.cartInfo,
        customer: {
          fullName: shippingData.fullName,
          mobileNumber: shippingData.mobileNumber,
        },
        shipping: {
          address1: shippingData.address1,
          address2: shippingData.address2,
          landmark: shippingData.landmark,
          pincode: shippingData.pincode,
          town: shippingData.town,
          selectedState: shippingData.selectedState,
          addressType: shippingData.addressType,
        },
        stripePaymentId: paymentMethod.id,
        orderId: id.match(/.{1,4}/g).join('-'),
        expectedDelivery: moment()
          .add(expectedDelivery, 'days')
          .format('DD MMMM YYYY'),
        username: cartInfo.username,
      };
      await axios
        .post('http://localhost:5000/api/order/createOrder', { orderData })
        .then(() => {
          setLoading(false);
          window.location.href = 'http://localhost:3000/orders';
        });
    }
  };
  return (
    <div style={{ margin: '0 20px 20px' }}>
      <ReviewOrder
        cartInfo={cartInfo}
        total={total}
        expectedDelivery={moment()
          .add(expectedDelivery, 'days')
          .format('DD MMMM YYYY')}
      />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <Card style={{ backgroundColor: '#fff', padding: '10px' }}>
                <CardElement />
              </Card>
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" onClick={back}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!stripe}
                >
                  {loading && (
                    <CircularProgress
                      size={24}
                      color="secondary"
                      style={{ margin: '0 5px 0 -5px' }}
                    />
                  )}
                  Pay ₹{new Intl.NumberFormat('en-IN').format(total)}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default Payment;
