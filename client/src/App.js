/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArtifactsCards from './components/LandingCards/ArtifactsCards';
import Header from './components/Header';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');
  const pageLoaded = useRef(false);
  // const [isloading, setIsloading] = useState(true);

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
      // get all names for textfield
      axios.get('http://localhost:5000/api/products/names').then((res) => {
        setName(res.data.data);
      });

      // serach data
    };
    fetchData();
    return pageLoaded;
  }, []);

  useEffect(() => {
    const fetchData = () => {
      if (search !== '') {
        axios
          .get(`http://localhost:5000/api/products/product/${search}`)
          .then((res) => {
            console.log(res.data.data);
          });
      }
    };
    fetchData();
  }, [search]);

  const childname = (returnedName) => {
    setSearch(returnedName);
  };

  return (
    pageLoaded.current && (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Header data={name} childname={childname} />
            <Route
              exact
              path="/products"
              component={(props) => <ArtifactsCards {...props} />}
            />
          </Container>
        </ThemeProvider>
      </Router>
    )
  );
}

export default App;
