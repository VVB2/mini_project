import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Badge,
  TextField,
  Button,
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

const Header = ({ data }) => {
  const classes = useStyles();
  const name = window.location.pathname;
  const [productName, setProductName] = useState('');
  const filterOptions = createFilterOptions({
    stringify: (option) => option,
    limit: 8,
  });
  useEffect(() => {
    if (name.includes('/product/')) {
      setProductName(decodeURIComponent(name.substring(9)));
    } else {
      setProductName('');
    }
  }, [productName]);

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
              if (value !== null) window.location = `/product/${value}`;
            }}
            value={productName}
          />
          <IconButton
            aria-label="cart of current user"
            aria-controls="menu-appbar"
            color="inherit"
            onClick={() => {
              console.log('hii');
            }}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart style={{ fontSize: 36 }} />
            </Badge>
          </IconButton>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            style={{ textDecoration: 'none' }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
