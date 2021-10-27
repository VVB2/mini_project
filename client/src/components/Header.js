/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Badge,
  TextField,
  Button,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { ShoppingCart } from '@material-ui/icons';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
    padding: '10px',
  },
  search: {
    width: '76.5%',
    marginLeft: '11.5rem',
  },
}));

const Header = ({ data, isLoggedIn, user }) => {
  let title = '';
  if (window.location.href.substring(22, 30) !== 'products')
    title = window.location.href.substring(30);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const classes = useStyles();
  const filterOptions = createFilterOptions({
    stringify: (option) => option,
    limit: 8,
  });

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await axios.post(
        'https://artifacts-shop.herokuapp.com/api/cart',
        {
          customerId: user._id,
        }
      );
      setCartItemsNumber(cartData.data.artifactInfo.length);
    };
    fetchData();
  });
  return (
    <div style={{ marginBottom: '6.25rem' }}>
      <AppBar position="fixed" color="inherit">
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

          <Autocomplete
            className={classes.grow}
            options={data.map((option) => option.name)}
            getOptionLabel={(option) => option}
            filterOptions={filterOptions}
            {...(window.location.href.includes('product')
              ? {
                  value: decodeURIComponent(title),
                }
              : { value: '' })}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Search the Store..."
                variant="outlined"
                className={classes.search}
              />
            )}
            onChange={(event, value) => {
              if (value !== null) {
                window.location.href = `https://objective-shirley-a0624b.netlify.app/product/${value}`;
              }
            }}
          />
          <IconButton
            aria-label="cart of current user"
            aria-controls="menu-appbar"
            color="inherit"
            onClick={() => {
              if (isLoggedIn)
                window.location.href = `https://objective-shirley-a0624b.netlify.app/cart`;
              else
                window.location.href = `https://objective-shirley-a0624b.netlify.app/login`;
            }}
            style={{ margin: 'auto 20px' }}
          >
            <Badge badgeContent={cartItemsNumber} color="error" showZero>
              <ShoppingCart style={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
          {!isLoggedIn ? (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              Login
            </Button>
          ) : (
            <IconButton
              aria-label="cart of current user"
              aria-controls="menu-appbar"
              color="inherit"
              component={Link}
              to="/profile"
              style={{ textDecoration: 'none' }}
            >
              <Avatar
                alt={user.username}
                src={`https://avatars.dicebear.com/api/${user.profilePicture}/${user.username}.svg`}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
