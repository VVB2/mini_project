/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  CardContent,
  CardActionArea,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccountCircle,
  ExitToApp,
  ShoppingBasketOutlined,
} from '@material-ui/icons';
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

const Orders = ({ user }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const productDetails = [];
  const handleShopping = () => {
    window.location.href = 'http://localhost:3000/cart';
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('checkoutInfo');
    sessionStorage.removeItem('userInfo');
    window.location.href = 'http://localhost:3000';
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post('http://localhost:5000/api/order', {
          customerId: user._id,
        })
        .then((res) => setOrders(res.data.orderItem));
    };
    fetchData();
  }, []);
  for (const key in orders) {
    productDetails.push(orders[key].items);
  }
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
            <ListItem button>
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
      <Typography variant="h5">My Orders</Typography>
      {orders.length > 0 ? (
        <div>
          {Object.keys(productDetails).map((key, item) => (
            <Card key={item} style={{ margin: '20px 0' }}>
              <CardActionArea
                component={Link}
                to={`/orders/${orders[key].orderId}`}
              >
                {Object.keys(productDetails[key]).map((i, j) => (
                  <CardContent
                    key={j}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      src={productDetails[key][i].coverImage}
                      alt={productDetails[key][i].productName}
                      style={{ width: '100px', height: '100px' }}
                    />
                    <div style={{ marginLeft: '20px' }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {productDetails[key][i].productName}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        ₹
                        {new Intl.NumberFormat('en-IN').format(
                          productDetails[key][i].price
                        )}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        Seller: Artifacts Shop
                      </Typography>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'inline' }}>
                      <div
                        style={
                          orders[key].deliveryStatus === 'Ordered'
                            ? {
                                backgroundColor: '#EFB700',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                float: 'left',
                                margin: '5px 5px 0 0',
                              }
                            : {
                                backgroundColor: '#26a541',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                float: 'left',
                                margin: '5px 5px 0 0',
                              }
                        }
                      />
                      <Typography
                        variant="subtitle2"
                        component="div"
                        style={{ float: 'right' }}
                      >
                        Expected Delivery on : {orders[key].expectedDelivery}
                      </Typography>
                    </div>
                  </CardContent>
                ))}
              </CardActionArea>
            </Card>
          ))}
        </div>
      ) : (
        <Card style={{ padding: '20px 15px', marginTop: '10px' }}>
          <Typography
            align="center"
            variant="body1"
            style={{ margin: '24px 0 10px 0' }}
          >
            Your have no orders!
          </Typography>
          <Typography variant="subtitle2" align="center">
            It&apos;s a good day to buy the items you have on in your cart!
          </Typography>
          <Button
            style={{
              display: 'block',
              margin: 'auto',
              backgroundColor: '#2874f0',
              padding: '12px 72px',
              textTransform: 'capitalize',
              marginTop: '20px',
              borderRadius: '0px',
            }}
            onClick={handleShopping}
          >
            Buy Now!
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Orders;
