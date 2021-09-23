import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ArtifactsCard({ data }) {
  const days = Math.floor(Math.random() * 5) + 1;
  return (
    <Link to={`/product/${data.title}`} style={{ textDecoration: 'none' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Grid container>
          <Grid item xs={3}>
            <LazyLoadImage
              src={data.coverImage}
              alt={data.title}
              effect="blur"
              width="90%"
              height="250px"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography
              color="textPrimary"
              variant="h5"
              gutterBottom
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.title}
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
    </Link>
  );
}

export default ArtifactsCard;
