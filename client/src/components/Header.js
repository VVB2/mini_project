import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Badge,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    flexGrow: 1,
    width: '120ch',
    marginLeft: '5rem',
  },
}));

const Header = () => {
  const [name, setName] = useState([]);
  const classes = useStyles();
  const filterOptions = createFilterOptions({
    stringify: (option) => option,
    limit: 10,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/').then((res) => {
      setName(res.data.data);
    });
  }, []);

  return (
    <div style={{ marginBottom: '60px' }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6">Artifacts Shop</Typography>
          <Autocomplete
            className={classes.grow}
            options={name.map((option) => option)}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Search..."
                variant="outlined"
                className={classes.search}
              />
            )}
            onChange={(event, value) => {
              console.log(value);
            }}
          />
          <IconButton
            aria-label="cart of current user"
            aria-controls="menu-appbar"
            color="inherit"
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart style={{ fontSize: 36 }} />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            color="inherit"
          >
            <AccountCircle style={{ fontSize: 36 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
