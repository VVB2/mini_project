import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import ArtifactsCards from './components/Cards/ArtifactsCards';
import Header from './components/Header';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [limitData, setLimitData] = useState({ from: 1, to: 10 });
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
          `http://localhost:5000/api/products/?from=${limitData.from}&to=${limitData.to}`
        )
        .then((res) => {
          setData(res.data.data);
          setIsloading(false);
        });

      // serach data
      if (search !== '') {
        axios
          .get(`http://localhost:5000/api/products/product/${search}`)
          .then((res) => {
            console.log(res.data.data);
          });
      }
    };
    fetchData();
  }, [search, limitData.from, limitData.to]);

  const childname = (returnedName) => {
    setSearch(returnedName);
  };

  const childPaginate = ({ gte, lte }) => {
    setLimitData({ from: gte, to: lte });
  };

  return (
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
  );
}

export default App;
