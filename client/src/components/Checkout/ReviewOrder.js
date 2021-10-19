import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

const ReviewOrder = ({ cartInfo, total, expectedDelivery }) => (
  <div>
    <Typography variant="h6" gutterBottom style={{ fontWeight: 700 }}>
      Order Summary
    </Typography>
    <Typography variant="body1" gutterBottom>
      Expected delivery:{' '}
      <span style={{ fontWeight: 700 }}>{expectedDelivery}</span>
    </Typography>
    <List disablePadding>
      {' '}
      {Object.keys(cartInfo.cartInfo).map((item, i) => (
        <ListItem style={{ padding: '10px 0' }} key={i}>
          <ListItemAvatar>
            <img
              alt="Remy Sharp"
              width="200px"
              height="200px"
              src={cartInfo.cartInfo[item].coverImage}
              style={{ paddingRight: '20px' }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={cartInfo.cartInfo[item].productName}
            secondary="Qunatity: 1"
          />
          <Typography varinat="body2">
            ₹
            {new Intl.NumberFormat('en-IN').format(
              cartInfo.cartInfo[item].price
            )}
          </Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total Amount (in ₹)" />
        <Typography varinat="body2" style={{ fontWeight: 700 }}>
          ₹{new Intl.NumberFormat('en-IN').format(total)}
        </Typography>
      </ListItem>
    </List>
  </div>
);

export default ReviewOrder;
