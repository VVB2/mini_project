import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArtifactsCards from './components/LandingCards/ArtifactsCards';
import Header from './components/Header';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

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
    const fetchData = () => {
      setIsloading(true);

      // get all names for textfield
      axios.get('http://localhost:5000/api/products/names').then((res) => {
        setName(res.data.data);
      });

      // pagination data
      axios
        .get(
          `http://localhost:5000/api/products/?from=${page * 10 - 9}&to=${
            page * 10
          }`
        )
        .then((res) => {
          setData(res.data.data);
          setIsloading(false);
        });

      // serach data
    };
    fetchData();
  }, [page]);

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

  const childPaginate = (pageNo) => {
    setPage(pageNo);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header data={name} childname={childname} />
          <br />
          <ArtifactsCards
            data={data}
            isLoading={isloading}
            childPaginate={childPaginate}
          />
        </Container>
      </ThemeProvider>
      {/* Routes of front end */}
      <Switch>
        <Route path="/:page">
          <ArtifactsCards
            data={data}
            isLoading={isloading}
            childPaginate={childPaginate}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
