import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Container, Grid, Card, Typography } from '@material-ui/core';

const Loading = () => (
  <Container>
    <Grid container spacing={3}>
      {[...Array(12)].map((x, i) => (
        <Grid item xs={3} key={i}>
          <Card style={{ marginBottom: '20px', padding: '15px' }} key={i}>
            <Skeleton variant="rect" height={250} width={250} />
            <Typography variant="subtitle2">
              <Skeleton />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton width={200} style={{ margin: 'auto' }} />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton width={150} style={{ margin: 'auto' }} />
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Loading;
