import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import moment from 'moment';

function ArtifactsCard({ data }) {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img
            src={data.coverImage}
            alt={data.title}
            style={{
              width: '80%',
              height: '300px',
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {data.title}
          </Typography>
          <Rating name="size-medium" value={data.rating} readOnly />
          <Typography color="error" variant="h6" gutterBottom>
            <b>{`₹ ${new Intl.NumberFormat('en-IN').format(data.price)}`}</b>
          </Typography>{' '}
          <Typography color="textSecondary" variant="body1" gutterBottom>
            {data.creditLine}
          </Typography>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            Get it by <b>Tomorrow, {moment().format('LL')}</b>
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Free Delivery By <b>Amazon</b>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ArtifactsCard;
