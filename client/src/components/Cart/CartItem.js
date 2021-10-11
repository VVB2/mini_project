import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Checkbox, Typography } from '@material-ui/core';

const CartItem = ({ data, checked }) => {
  const [checkedChild, setCheckedChild] = useState(checked);
  console.log(checked, checkedChild);
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
          style={{ textDecoration: 'none', color: '#fff' }}
        >
          {data.title}
        </Typography>
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
