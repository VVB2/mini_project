/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import jwt from 'jsonwebtoken';
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
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Profile/Orders';
import IndividualOrder from './components/Profile/IndividualOrder';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      axios
        .get('https://artifacts-shop.herokuapp.comapi/products/names')
        .then((res) => {
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
    if (localStorage.getItem('authToken')) {
      jwt.verify(
        localStorage.getItem('authToken'),
        process.env.REACT_APP_JWT_SECRET,
        (err) => {
          if (!err) {
            const { exp } = jwt.decode(localStorage.getItem('authToken'));
            if (moment(moment.unix(exp).format()).isAfter(moment().format())) {
              axios
                .post(
                  'https://artifacts-shop.herokuapp.comapi/auth/userDetails',
                  { jwtEncodedUser: localStorage.getItem('authToken') },
                  config
                )
                .then((res) => {
                  setUser(res.data.user);
                });
              setIsLoggedIn(true);
            } else {
              localStorage.removeItem('authToken');
              sessionStorage.removeItem('checkoutInfo');
              sessionStorage.removeItem('userInfo');
            }
          } else {
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('checkoutInfo');
            sessionStorage.removeItem('userInfo');
          }
        }
      );
    }
  }, []);

  return (
    pageLoaded.current && (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Header data={name} isLoggedIn={isLoggedIn} user={user} />
            <PrivateRoute
              exact
              path="/profile"
              component={() => <Profile user={user} />}
              user={user}
            />
            <PrivateRoute
              exact
              path="/checkout"
              component={Checkout}
              user={user}
            />
            <PrivateRoute
              exact
              path="/orders"
              component={() => <Orders user={user} />}
              user={user}
            />
            <PrivateRoute
              path="/orders/:id"
              component={() => <IndividualOrder user={user} />}
              user={user}
            />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={ArtifactsCards} />
            <Route exact path="/department" component={DepartmentWise} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/signup" component={SignupScreen} />
            <Route
              path="/product/:name"
              component={() => <ProductPage user={user} />}
            />
          </Container>
          <PrivateRoute
            exact
            path="/cart"
            component={() => <Cart user={user} />}
            user={user}
          />
        </ThemeProvider>
      </Router>
    )
  );
}

export default App;
