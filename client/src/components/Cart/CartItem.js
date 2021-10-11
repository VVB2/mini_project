/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { Grid, Checkbox, Typography, Button } from '@material-ui/core';
import { RemoveShoppingCart } from '@material-ui/icons';

const CartItem = ({ data, checked, user }) => {
  const { _id } = user;
  const [checkedChild, setCheckedChild] = useState(checked);
  const handleRemove = async () => {
    await axios.delete('http://localhost:5000/api/cart/removeFromCart', {
      data: {
        customerId: _id,
        productName: data.title,
      },
    });
    window.history.go(0);
  };
  const handleChange = () => {
    if (checked) setCheckedChild(!checkedChild);
    else setCheckedChild(false);
  };
  return (
    <Grid container spacing={0} style={{ margin: '10px 0' }}>
      <Grid item xs={1}>
        <Checkbox
          checked={checkedChild}
          onChange={handleChange}
          style={{ marginTop: '100%' }}
        />
      </Grid>
      <Grid item xs={3}>
        <Link to={`product/${data.title}`}>
          <img
            src={data.coverImage}
            alt={data.title}
            style={{ width: '250px', height: '250px' }}
          />
        </Link>
      </Grid>
      <Grid item xs={7}>
        <Typography
          variant="subtitle1"
          component={Link}
          to={`product/${data.title}`}
          style={{ textDecoration: 'none', color: '#fff', fontSize: '18px' }}
          gutterBottom
        >
          {data.title}
        </Typography>
        <Typography variant="subtitle2" style={{ color: '#fff' }} gutterBottom>
          <span>
            <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
              Artifact Credit Line:{' '}
            </span>
            {data.creditLine}
          </span>
        </Typography>
        <Typography variant="subtitle2" style={{ color: '#fff' }} gutterBottom>
          <span>
            <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
              Artifact Dated at:{' '}
            </span>
            {data.objectDate}
          </span>
        </Typography>
        {Object.keys(data.measurements[0]).map((item, i) => (
          <Typography
            variant="subtitle2"
            style={{ color: '#fff' }}
            gutterBottom
            key={i}
          >
            <span>
              <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
                {item}:{' '}
              </span>
              {data.measurements[0][item]} units
            </span>
          </Typography>
        ))}
        <Typography variant="subtitle2" style={{ color: '#fff' }} gutterBottom>
          <span>
            <span style={{ fontWeight: 'bold', color: '#64b5f6' }}>
              Artifact Dated at:{' '}
            </span>
            {data.objectDate}
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
            {moment().add(data.rating, 'days').calendar().slice(0, -11)}{' '}
            {moment().add(data.rating, 'days').format('LL')}
          </span>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '20px' }}
          startIcon={<RemoveShoppingCart />}
          size="small"
          onClick={handleRemove}
        >
          Remove from cart
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          ₹{new Intl.NumberFormat('en-IN').format(data.price)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
