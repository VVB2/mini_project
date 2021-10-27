/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Error } from '@material-ui/icons';
import Loading from './LandingPage.loading';
import LandingCards from './LandingCards';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('https://artifacts-shop.herokuapp.com/api/products/landingPage')
        .then((res) => {
          setData(res.data.data);
          setPrice(res.data.price);
          setLoading(false);
        });
    };
    fetchData();
  }, [pathname]);
  function compare(a, b) {
    const deptA = a._id.toUpperCase();
    const deptB = b._id.toUpperCase();

    let comparison = 0;
    if (deptA > deptB) {
      comparison = 1;
    } else if (deptA < deptB) {
      comparison = -1;
    }
    return comparison;
  }
  price.sort(compare);
  return loading ? (
    <Loading />
  ) : (
    <Grid container spacing={3}>
      {data.map((x, i) => (
        <Grid item xs={3} key={x[0].id}>
          <LandingCards data={x[0]} price={price[i].minPrice} />
        </Grid>
      ))}
      <Grid item xs={3}>
        <Link to="/products?p=1" style={{ textDecoration: 'none' }}>
          <Card style={{ padding: '5px 15px 15px 15px', height: '362px' }}>
            <CardContent>
              <Error
                style={{ display: 'block', margin: 'auto', fontSize: '50' }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ padding: '10px 0px ' }}
              >
                Didn&apos;t find what you were looking for?
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ padding: '20px 0px ' }}
              >
                Check out all the artifacts that are in our disposal and choose
                the one which catches your interest.
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
