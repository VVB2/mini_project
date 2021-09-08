import React from 'react';
import { Skeleton } from '@material-ui/lab';
import {
  Container,
  Grid,
  Card,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { ShoppingCart, FlashOn } from '@material-ui/icons';

const Loading = () => (
  <Container>
    <Card style={{ marginBottom: 20 }}>
      <Grid container spacing={3} style={{ padding: 16 }}>
        <Grid item xs={5} style={{ paddingLeft: 40 }}>
          <Skeleton variant="rect" width={416} height={416} />
          <Grid container item xs={12} style={{ margin: '15px 2px' }}>
            <Grid item xs={6}>
              <Button
                disabled
                startIcon={<ShoppingCart />}
                style={{
                  width: 195,
                  height: 56,
                  backgroundColor: '#925f0a',
                }}
              >
                add to cart
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled
                startIcon={<FlashOn />}
                style={{
                  width: 195,
                  height: 56,
                  backgroundColor: '#601f00',
                }}
              >
                buy now
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="button">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="body1">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="caption">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="body1">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="h6">
            <Skeleton variant="text" />
          </Typography>
          <Divider />
          <Typography variant="h6" gutterBottom style={{ padding: 15 }}>
            About the Product
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
            <Grid item xs={8}>
              <Typography variant="body1" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} style={{ marginTop: 10 }}>
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
            <Grid item xs={8}>
              <Typography variant="body1" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} style={{ marginTop: 10 }}>
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
            <Grid item xs={8}>
              <Typography variant="body1" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} style={{ marginTop: 10 }}>
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
            <Grid item xs={8}>
              <Typography variant="body1" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} style={{ marginTop: 10 }}>
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
                <Skeleton variant="rect" height={100} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
    <Card style={{ marginBottom: 20 }}>
      <Typography variant="h5" style={{ paddingLeft: 20, marginTop: 10 }}>
        Similar Products
      </Typography>
      <Grid container sapcing={3}>
        {[...Array(4)].map((x, i) => (
          <Grid item xs={3} key={i}>
            <Card
              style={{
                padding: '16px 16px 10px 16px',
                margin: '20px 15px ',
                height: 320,
              }}
              raised
            >
              <Skeleton width={230} height={200} variant="rect" />
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
    <Card style={{ marginBottom: 20 }}>
      <Typography variant="h5" style={{ paddingLeft: 20, marginTop: 10 }}>
        You might be interested in
      </Typography>
      <Grid container sapcing={3}>
        {[...Array(4)].map((x, i) => (
          <Grid item xs={3} key={i}>
            <Card
              style={{
                padding: '16px 16px 10px 16px',
                margin: '20px 15px ',
                height: 320,
              }}
              raised
            >
              <Skeleton width={230} height={200} variant="rect" />
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="body1">
                <Skeleton variant="text" />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  </Container>
);

export default Loading;
