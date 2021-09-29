import React from 'react';
import { Link } from 'react-router-dom';
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

const Header = ({ data, isLoggedIn, user, sprites }) => {
  const classes = useStyles();
  const filterOptions = createFilterOptions({
    stringify: (option) => option,
    limit: 8,
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
                window.open(`http://localhost:3000/product/${value}`, '_blank');
                console.log(event);
              }
            }}
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
                src={`https://avatars.dicebear.com/api/${sprites}/${user.username}.svg`}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
