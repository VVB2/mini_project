/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Grid, Typography, Card, Divider, Button } from '@material-ui/core';
import { ShoppingCart, FlashOn } from '@material-ui/icons';
import { GlassMagnifier } from 'react-image-magnifiers';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-slideshow-image/dist/styles.css';

const TopCard = ({ data, images, user }) => {
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  let isInCart = false;
  useEffect(() => {
    const fetchData = async () => {
      const cartData = await axios.post('http://localhost:5000/api/cart', {
        customerId: user._id,
      });
      setCartItems(cartData.data.cartItem);
    };
    if (user) fetchData();
  }, []);
  for (const key in cartItems) {
    if (cartItems[key].productName === data[0].title) {
      isInCart = true;
    }
  }
  const handleAddToCart = async () => {
    if (user.username) {
      try {
        await axios.post('http://localhost:5000/api/cart/addToCart', {
          customerId: user._id,
          productName: data[0].title,
        });
        history.go(0);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = 'http://localhost:3000/login';
    }
  };
  return (
    <Card style={{ marginBottom: 20 }}>
      <Grid container style={{ padding: 16 }} spacing={3}>
        <Grid item xs={5}>
          <Carousel
            slidesToSlide={1}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 1,
              },
            }}
            infinite
            autoPlay={false}
            showDots
          >
            {data.isSold && <h1>Hii</h1>}
            {[...images].map((src, i) => (
              <GlassMagnifier
                key={i}
                imageSrc={src}
                imageAlt="data Images"
                magnifierBorderColor="#dc5036e6"
                magnifierSize="50%"
                style={{
                  maxWidth: '500px',
                  maxHeight: '600px',
                  objectfit: 'cover',
                  display: 'block',
                  margin: 'auto auto',
                  position: 'relative',
                  top: 0,
                  left: 0,
                }}
              />
            ))}
          </Carousel>
          <Grid container item xs={12} style={{ margin: '15px 0 0 50px' }}>
            <Grid item xs={5}>
              {!isInCart ? (
                <Button
                  startIcon={<ShoppingCart />}
                  style={
                    !data[0].isSold
                      ? {
                          padding: '18px 8px',
                          width: 195,
                          height: 56,
                          backgroundColor: '#ff9f00',
                        }
                      : {
                          padding: '18px 8px',
                          width: 195,
                          height: 56,
                          backgroundColor: 'grey',
                          color: '#fff',
                        }
                  }
                  onClick={handleAddToCart}
                  disabled={data[0].isSold}
                >
                  add to cart
                </Button>
              ) : (
                <Button
                  startIcon={<ShoppingCart />}
                  variant="contained"
                  style={{
                    padding: '18px 8px',
                    width: 195,
                    height: 56,
                  }}
                  disabled
                >
                  already in cart
                </Button>
              )}
            </Grid>
            <Grid item xs={7}>
              {!isInCart ? (
                <Button
                  startIcon={<FlashOn />}
                  style={
                    !data[0].isSold
                      ? {
                          padding: '18px 8px',
                          width: 195,
                          height: 56,
                          backgroundColor: '#fb641b',
                        }
                      : {
                          padding: '18px 8px',
                          width: 195,
                          height: 56,
                          backgroundColor: 'grey',
                          color: '#fff',
                        }
                  }
                  disabled={data[0].isSold}
                >
                  buy now
                </Button>
              ) : (
                <Button
                  startIcon={<FlashOn />}
                  variant="contained"
                  style={{
                    padding: '18px 8px',
                    width: 195,
                    height: 56,
                  }}
                  disabled
                >
                  buy now
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        {Object.keys(data).map((item, i) => (
          <Grid item xs={7} key={i}>
            <Typography variant="button" gutterBottom color="textSecondary">
              {data[item].department}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data[item].title}
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              style={{ color: '#26a541' }}
            >
              Special Price
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                backgroundColor: '#26a541',
                padding: '2px 7px',
                borderRadius: 3,
                width: 55,
                fontWeight: 'bold',
              }}
            >
              {data[item].rating}.0{' '}
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                alt="star icon"
                effect="blur"
              />
            </Typography>
            <Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
              ₹{new Intl.NumberFormat('en-IN').format(data[item].price)}
            </Typography>
            <Divider />
            <Typography variant="h6" gutterBottom style={{ padding: 15 }}>
              About the product
            </Typography>
            <Divider />
            <Grid container item xs={12} spacing={3} style={{ marginTop: 10 }}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="textSecondary"
                  style={{ fontWeight: 'bold' }}
                >
                  Classification
                </Typography>
              </Grid>
              {data[item].classification ? (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {data[item].classification}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    No data Available
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="textSecondary"
                  style={{ fontWeight: 'bold' }}
                >
                  Country
                </Typography>
              </Grid>
              {data[item].country ? (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {data[item].country}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    No data Available
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="textSecondary"
                  style={{ fontWeight: 'bold' }}
                >
                  Accession Year
                </Typography>
              </Grid>
              {data[item].accessionYear ? (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {data[item].accessionYear}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    No data Available
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="textSecondary"
                  style={{ fontWeight: 'bold' }}
                >
                  Credit Line
                </Typography>
              </Grid>
              {data[item].creditLine ? (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {data[item].creditLine}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    No data Available
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="textSecondary"
                  style={{ fontWeight: 'bold' }}
                >
                  Description
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" gutterBottom>
                  {data[item].desc}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default TopCard;
