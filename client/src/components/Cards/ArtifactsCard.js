import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Soldout from '../../assets/sold_out.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ArtifactsCard({ data }) {
  return (
    <Link
      to={`/product/${data.title}`}
      style={{ textDecoration: 'none' }}
      target="_blank"
    >
      <Card style={{ marginBottom: '20px' }}>
        <Grid container>
          <Grid item xs={3} style={{ position: 'relative' }}>
            <LazyLoadImage
              src={data.coverImage}
              alt={data.title}
              effect="blur"
              width="90%"
              height="250px"
              style={{ position: 'relative', top: 0, left: 0 }}
            />
            {data.isSold && (
              <LazyLoadImage
                src={Soldout}
                style={{
                  position: 'absolute',
                  top: '-0px',
                  left: '-3px',
                  width: '85%',
                }}
                alt="sold out logo"
              />
            )}
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
                {moment().add(data.rating, 'days').calendar().slice(0, -11)}{' '}
                {moment().add(data.rating, 'days').format('LL')}
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
