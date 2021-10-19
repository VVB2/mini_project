/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import {
  Card,
  Typography,
  Divider,
  Button,
  Grid,
  Container,
} from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useStyles from '../LoginSignUp/Auth.styles';
import emptyCart from '../../assets/emptyCart.png';
import Soldout from '../../assets/sold_out.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Cart = ({ user }) => {
  let isAvailable = true;
  const handleSingleCheckout = (cartInfo, userDetails) => {
    const checkOutInfo = jwt.sign(
      {
        cartInfo: [
          {
            productName: cartInfo.title,
            price: cartInfo.price,
            expectedDeliveryDays: cartInfo.rating,
            coverImage: cartInfo.coverImage,
          },
        ],
        username: userDetails._id,
      },
      process.env.REACT_APP_JWT_SECRET
    );
    sessionStorage.setItem('checkoutInfo', checkOutInfo);
    window.location.href = 'http://localhost:3000/checkout';
  };
  const handleMultipleCheckout = (cartInfo, userDetails) => {
    const info = [];
    for (const key in cartInfo) {
      info.push({
        productName: cartInfo[key][0].title,
        price: cartInfo[key][0].price,
        expectedDeliveryDays: cartInfo[key][0].rating,
        coverImage: cartInfo[key][0].coverImage,
      });
    }
    const checkOutInfo = jwt.sign(
      {
        cartInfo: info,
        username: userDetails._id,
      },
      process.env.REACT_APP_JWT_SECRET
    );
    sessionStorage.setItem('checkoutInfo', checkOutInfo);
    window.location.href = 'http://localhost:3000/checkout';
  };
  const handleShopping = () => {
    window.location.href = 'http://localhost:3000/products?p=1';
  };
  const classes = useStyles();
  const [cartData, setCartData] = useState([]);
  let totalPrice = 0;
  const handleRemove = async (data) => {
    await axios.delete('http://localhost:5000/api/cart/removeFromCart', {
      data: {
        customerId: user._id,
        productName: data,
      },
    });
    window.history.go(0);
  };

  for (const key in cartData) {
    if (cartData[key][0].isSold) {
      isAvailable = false;
    }
    totalPrice += cartData[key][0].price;
  }
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post('http://localhost:5000/api/cart', {
          customerId: user._id,
        })
        .then((res) => {
          setCartData(res.data.artifactInfo);
        });
    };
    fetchData();
  }, []);

  return cartData.length > 0 ? (
    <Grid container style={{ overflow: 'hidden' }}>
      <Grid
        container
        item
        xs={12}
        style={{ overflow: 'hidden', margin: '0 10px' }}
      >
        <Grid item xs={9}>
          <Card style={{ padding: '20px 15px' }}>
            <div>
              <Typography variant="h5">Shopping cart</Typography>
              <Typography
                variant="subtitle2"
                align="right"
                display="block"
                style={{ fontWeight: 'bold', marginRight: '40px' }}
              >
                Price (in ₹)
              </Typography>
            </div>
            <Divider />
            {Object.keys(cartData).map((item, i) => (
              <div key={i}>
                <Grid container spacing={0} style={{ margin: '10px 0' }}>
                  <Grid item xs={3}>
                    <Link to={`product/${cartData[item][0].title}`}>
                      <img
                        src={cartData[item][0].coverImage}
                        alt={cartData[item][0].title}
                        style={{
                          position: 'relative',
                          top: 0,
                          left: 0,
                          width: '250px',
                          height: '250px',
                        }}
                      />
                      {cartData[item][0].isSold && (
                        <LazyLoadImage
                          src={Soldout}
                          style={{
                            position: 'absolute',
                            top: 180 + i * 266 + 20,
                            left: '30px',
                            height: '266px',
                          }}
                          alt="sold out logo"
                        />
                      )}
                    </Link>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`product/${cartData[item][0].title}`}
                      style={{
                        textDecoration: 'none',
                        color: '#fff',
                        fontSize: '18px',
                      }}
                      gutterBottom
                    >
                      {cartData[item][0].title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ color: '#fff' }}
                      gutterBottom
                    >
                      <span>
                        <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
                          Artifact Credit Line:{' '}
                        </span>
                        {cartData[item][0].creditLine}
                      </span>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ color: '#fff' }}
                      gutterBottom
                    >
                      <span>
                        <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
                          Artifact Dated at:{' '}
                        </span>
                        {cartData[item][0].objectDate}
                      </span>
                    </Typography>
                    {Object.keys(cartData[item][0].measurements[0]).map(
                      (measurement, j) => (
                        <Typography
                          variant="subtitle2"
                          style={{ color: '#fff' }}
                          gutterBottom
                          key={j}
                        >
                          <span>
                            <span
                              style={{ fontWeight: 'bold', color: '#64b5f6' }}
                            >
                              {measurement}:{' '}
                            </span>
                            {cartData[item][0].measurements[0][measurement]}{' '}
                            units
                          </span>
                        </Typography>
                      )
                    )}
                    <Typography
                      variant="subtitle2"
                      style={{ color: '#fff' }}
                      gutterBottom
                    >
                      <span>
                        <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
                          Artifact Dated at:{' '}
                        </span>
                        {cartData[item][0].objectDate}
                      </span>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ color: 'rgb(38, 165, 65)', fontWeight: 'bold' }}
                      gutterBottom
                    >
                      <span>
                        <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
                          Expected Arrival Date:{' '}
                        </span>
                        {moment()
                          .add(cartData[item][0].rating, 'days')
                          .calendar()
                          .slice(0, -11)}{' '}
                        {moment()
                          .add(cartData[item][0].rating, 'days')
                          .format('LL')}
                      </span>
                    </Typography>
                    <Button
                      className={classes.button}
                      variant="text"
                      style={{
                        margin: '10px 0 5px 0',
                        borderRadius: '0px',
                        padding: '5px 10px',
                        backgroundColor: '#f44336',
                      }}
                      size="small"
                      onClick={() => handleRemove(cartData[item][0].title)}
                    >
                      Remove from cart
                    </Button>
                    {!cartData[item][0].isSold ? (
                      <Button
                        onClick={() => {
                          handleSingleCheckout(cartData[item][0], user);
                        }}
                        className={classes.button}
                        style={{
                          padding: '0px 30px',
                          borderRadius: '0px',
                          float: 'right',
                          margin: '10px -100px -5px 0',
                        }}
                      >
                        place order
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className={classes.button}
                        style={{
                          padding: '0px 30px',
                          borderRadius: '0px',
                          float: 'right',
                          margin: '10px -100px -5px 0',
                          backgroundColor: 'grey',
                          color: 'white',
                        }}
                      >
                        Item not available
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      ₹
                      {new Intl.NumberFormat('en-IN').format(
                        cartData[item][0].price
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            ))}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ marginLeft: '10px', padding: '20px 15px' }}>
            <div style={{ marginBottom: '10px' }}>
              <Typography
                variant="button"
                color="textSecondary"
                style={{ marginBottom: '50px' }}
              >
                price details
              </Typography>
            </div>
            <Divider style={{ marginBottom: '20px' }} />
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                marginBottom: '10px',
              }}
            >
              <span>
                Price ({cartData.length}{' '}
                {cartData.length > 1 ? 'items' : 'item'})
              </span>
              <span style={{ float: 'right', fontWeight: 'bold' }}>
                ₹{new Intl.NumberFormat('en-IN').format(totalPrice)}
              </span>
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
              }}
            >
              <span>Delivery Charges</span>
              <span style={{ float: 'right', fontWeight: 'bold' }}>FREE</span>
            </div>
            <Divider style={{ marginTop: '20px' }} />
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                margin: '20px 0',
              }}
            >
              <span>Delivery Charges</span>
              <span style={{ float: 'right', fontWeight: 'bold' }}>
                ₹{new Intl.NumberFormat('en-IN').format(totalPrice)}
              </span>
            </div>
            <Divider />
            {isAvailable ? (
              <Button
                onClick={() => {
                  handleMultipleCheckout(cartData, user);
                }}
                className={classes.button}
                style={{
                  padding: '16px 30px',
                  borderRadius: '0px',
                  float: 'right',
                  margin: '10px 0 -5px 0',
                }}
              >
                place order
              </Button>
            ) : (
              <Button
                disabled
                className={classes.button}
                style={{
                  padding: '16px 30px',
                  borderRadius: '0px',
                  float: 'right',
                  margin: '10px 0 -5px 0',
                  backgroundColor: 'grey',
                  color: 'white',
                }}
              >
                Item not available
              </Button>
            )}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Container>
      <Card style={{ padding: '20px 15px' }}>
        <Typography variant="h5" style={{ height: '56px' }}>
          Shopping Cart
        </Typography>
        <img
          src={emptyCart}
          alt="empty cart logo"
          style={{
            display: 'block',
            margin: 'auto',
            width: '350px',
          }}
        />
        <Typography
          align="center"
          variant="body1"
          style={{ margin: '24px 0 10px 0' }}
        >
          Your cart is empty!
        </Typography>
        <Typography variant="subtitle2" align="center">
          It&apos;s a good day to buy the items you have on your mind!
        </Typography>
        <Button
          className={classes.button}
          style={{
            display: 'block',
            margin: 'auto',
            backgroundColor: '#2874f0',
            padding: '12px 72px',
            textTransform: 'capitalize',
            marginTop: '20px',
            borderRadius: '0px',
          }}
          onClick={handleShopping}
        >
          Shop Now
        </Button>
      </Card>
    </Container>
  );
};

export default Cart;
