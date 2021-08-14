import React from 'react';
import { Skeleton, Rating } from '@material-ui/lab';
import { Container, Grid, Card, Typography } from '@material-ui/core';

const Loading = () => (
  <Container>
    {[...Array(10)].map((x, i) => (
      <Card style={{ marginBottom: '20px' }} key={i}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Skeleton variant="rect" height={200} width="80%" />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">
              <Skeleton />
            </Typography>
            <Rating name="size-medium" value={null} readOnly />
            <Typography variant="h6">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
            <Typography variant="body2">
              <Skeleton />
            </Typography>
          </Grid>
        </Grid>
      </Card>
    ))}
  </Container>
);

export default Loading;
