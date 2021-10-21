/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  AccountCircle,
  ExitToApp,
  ShoppingBasketOutlined,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const IndividualOrder = () => {
  const [getItems, setItems] = useState([]);
  const activeStep = 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post(
        'http://localhost:5000/api/order/getIndividualProduct',
        {
          orderId: window.location.pathname.substring(8),
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      setItems(data.data.orderItem);
    };
    fetchData();
  }, []);
  function getSteps() {
    if (getItems.length > 0)
      return [
        `Ordered 
        \n ${moment(getItems[0].placedOn).format('DD MMMM YYYY')}`,
        'Shipped',
        'Out For Delivery',
        `Delivered ${getItems[0].expectedDelivery} `,
      ];
    return 'Loading';
  }
  const steps = getSteps();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('checkoutInfo');
    sessionStorage.removeItem('userInfo');
    window.location.href = 'http://localhost:3000';
  };
  const classes = useStyles();
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            style={{ textDecoration: 'none' }}
          >
            Artifacts Shop
          </Typography>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/orders">
              <ListItemIcon>
                <ShoppingBasketOutlined />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      {getItems.length > 0 && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Delivery Address
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 700 }}
              gutterBottom
            >
              {getItems[0].customer.fullName}
            </Typography>
            <Typography variant="body2">
              {getItems[0].shipping.address1} {getItems[0].shipping.address2},
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{ marginBottom: '10px' }}
            >
              {getItems[0].shipping.landmark} {getItems[0].shipping.town} -{' '}
              {getItems[0].shipping.pincode},{' '}
              {getItems[0].shipping.selectedState}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 700 }}
              gutterBottom
            >
              Phone Number
            </Typography>
            <Typography variant="body2">
              {getItems[0].customer.mobileNumber}
            </Typography>
          </CardContent>
        </Card>
      )}
      {getItems.length > 0 && (
        <div>
          {Object.keys(getItems[0].items).map((items, i) => (
            <Card style={{ marginTop: '15px' }} elevation={3} key={i}>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={getItems[0].items[items].coverImage}
                  alt={getItems[0].items[items].productName}
                  style={{ width: '100px', height: '100px' }}
                />
                <div style={{ marginLeft: '20px' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {getItems[0].items[items].productName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Seller: Artifacts Shop
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    ₹
                    {new Intl.NumberFormat('en-IN').format(
                      getItems[0].items[items].price
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Order Id: {getItems[0].orderId}
                  </Typography>
                </div>
                <div>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    style={{ width: '43vw', top: 0, left: 0 }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndividualOrder;
