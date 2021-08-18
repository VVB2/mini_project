import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import moment from 'moment';

function ArtifactsCard({ data }) {
  const days = Math.floor(Math.random() * 5) + 1;
  return (
    <Card style={{ marginBottom: '20px' }}>
      <Grid container>
        <Grid item xs={3}>
          <img
            src={data.coverImage}
            alt={data.title}
            style={{
              width: '80%',
              height: '250px',
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {data.title.replace(/(.{50})..+/, '$1…')}
          </Typography>
          <Rating name="size-medium" value={data.rating} readOnly />
          <Typography color="error" variant="h6" gutterBottom>
            ₹<b>{` ${new Intl.NumberFormat('en-IN').format(data.price)}`}</b>
          </Typography>{' '}
          <Typography color="textSecondary" variant="body1" gutterBottom>
            {data.creditLine}
          </Typography>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            Get it by{' '}
            <b>
              {moment().add(days, 'days').calendar().slice(0, -11)}{' '}
              {moment().add(days, 'days').format('LL')}
            </b>
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Free Delivery By <b>Artifacts Shop</b>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ArtifactsCard;
