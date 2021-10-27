/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  FormControl,
  Select,
  Grid,
  InputLabel,
  Button,
} from '@material-ui/core';
import {
  AccountCircle,
  ExitToApp,
  Save,
  ShoppingBasketOutlined,
} from '@material-ui/icons';

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

const Profile = ({ user }) => {
  const [sprite, setSprite] = useState(user.profilePicture);
  const spriteTypes = [
    'Male',
    'Female',
    'Human',
    'Identicon',
    'Initials',
    'Bottts',
    'Avataaars',
    'Jdenticon',
    'Gridy',
    'Micah',
  ];
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('checkoutInfo');
    sessionStorage.removeItem('userInfo');
    window.location.href = 'https://dazzling-lamport-c2fd9c.netlify.app/';
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
            <ListItem button>
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
      <Toolbar />
      <img
        alt="profile-image"
        src={`https://avatars.dicebear.com/api/${user.profilePicture}/${user.username}.svg`}
        width="20%"
        style={{
          display: 'block',
          margin: 'auto',
          borderRadius: '50%',
          background: '#fff',
          marginTop: '-50px',
          marginBottom: '20px',
        }}
      />
      <Typography variant="h5" align="center" gutterBottom>
        Username: {user.username}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Email: {user.email}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Created On: {moment(user.createdOn).format('MMMM Do YYYY')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant="h6" gutterBottom>
            Change Your Profile Image (Default: Identicon)
          </Typography>
          <FormControl variant="outlined">
            <InputLabel htmlFor="age-native-simple">Age</InputLabel>
            <Select
              defaultValue={user.profilePicture}
              autoWidth
              onChange={(event) => setSprite(event.target.value)}
              label="Age"
              native
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              {spriteTypes.map((value, key) => (
                <option value={value.toLowerCase()} key={key}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Preview of the selected option
          </Typography>
          <img
            width="50%"
            alt="profile-image"
            src={`https://avatars.dicebear.com/api/${sprite}/${user.username}.svg`}
            style={{
              display: 'block',
              margin: 'auto',
              borderRadius: '50%',
              background: '#fff',
              marginBottom: '20px',
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Save />}
        style={{ marginTop: '5%' }}
        onClick={async () => {
          await axios.put(
            'https://artifacts-shop.herokuapp.com/api/auth/updateUser',
            {
              username: user.username,
              profilePicture: sprite,
            }
          );
          window.location.href =
            'https://dazzling-lamport-c2fd9c.netlify.app/profile';
        }}
      >
        Save changes
      </Button>
    </div>
  );
};

export default Profile;
