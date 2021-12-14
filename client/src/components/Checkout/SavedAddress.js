import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  CardContent,
} from '@material-ui/core';
import axios from 'axios';

const SavedAddress = ({ customerId, addToForm }) => {
  const [savedAddress, setSavedAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        'http://localhost:5000/api/userPurchaseInfo',
        { customerId }
      );
      setSavedAddress(data.userPurchaseInfo);
    };
    fetchData();
  }, []);
  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Select a delivery address
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Is the address you&apos;d like to use displayed below? If so, click the
        corresponding &quot;Deliver to this address&quot; button. Or you can
        enter a new delivery address.{' '}
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(savedAddress).map((item, i) => (
          <Grid item xs={4} style={{ margin: '20px 0 20px 30px' }} key={i}>
            <Card style={{ margin: 'auto auto 0 auto' }} elevation={3}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {savedAddress[item].customer.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {savedAddress[item].shipping.address1}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {savedAddress[item].shipping.landmark}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {savedAddress[item].shipping.address2}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {savedAddress[item].shipping.town}
                  {', '}
                  {savedAddress[item].shipping.pincode}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  {savedAddress[item].customer.mobileNumber}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => addToForm(savedAddress)}
                >
                  Deliver to this address
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider />
    </div>
  );
};

export default SavedAddress;
