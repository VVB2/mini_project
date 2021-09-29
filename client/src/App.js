/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArtifactsCards from './components/Cards/ArtifactsCards';
import Header from './components/Header';
import LandingPage from './components/LandingPage/LandingPage';
import DepartmentWise from './components/DepartmentWise/DepartmentWiseProducts';
import ProductPage from './components/ProductPage/ProductPage';
import SignupScreen from './components/LoginSignUp/SignupScreen';
import LoginScreen from './components/LoginSignUp/LoginScreen';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Profile/Profile';
import ProfileSettings from './components/Profile/ProfileSettings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sprites, setSprites] = useState('identicon');
  const [user, setUser] = useState([]);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [name, setName] = useState([]);
  const pageLoaded = useRef(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    pageLoaded.current = true;
    const fetchData = () => {
      // search all the names for autocoplete text field
      axios.get('http://localhost:5000/api/products/names').then((res) => {
        setName(res.data.data);
      });
    };
    fetchData();
    return pageLoaded;
  }, []);

  useEffect(() => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    if (localStorage.getItem('spriteType')) {
      setSprites(localStorage.getItem('spriteType'));
    }
    if (localStorage.getItem('authToken')) {
      axios
        .post(
          'http://localhost:5000/api/auth/userDetails',
          { jwtEncodedUser: localStorage.getItem('authToken') },
          config
        )
        .then((res) => setUser(res.data.user));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    pageLoaded.current && (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Header
              data={name}
              isLoggedIn={isLoggedIn}
              user={user}
              sprites={sprites}
            />
            <PrivateRoute
              exact
              path="/profile"
              component={() => <Profile user={user} sprites={sprites} />}
              user={user}
            />
            <PrivateRoute
              exact
              path="/profile/settings"
              component={() => <ProfileSettings user={user} />}
              user={user}
            />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={ArtifactsCards} />
            <Route exact path="/department" component={DepartmentWise} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/signup" component={SignupScreen} />
            <Route path="/product/:name" component={ProductPage} />
          </Container>
        </ThemeProvider>
      </Router>
    )
  );
}

export default App;
