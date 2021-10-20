import React, { useEffect, useState } from 'react';
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
  const [getItems, setGetItems] = useState([]);
  const orderId = window.location.pathname.substring(8);
  console.log(orderId);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post('http://localhost:5000/api/order/getIndividualProduct', {
          orderId,
        })
        .then((res) => console.log(res.data));
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('checkoutInfo');
    sessionStorage.removeItem('userInfo');
    window.location.href = 'http://localhost:3000';
  };
  const classes = useStyles();
  console.log();
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
    </div>
  );
};

export default IndividualOrder;
