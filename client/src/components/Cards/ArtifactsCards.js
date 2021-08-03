import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import Loading from '../Loading/Loading';
import ArtifactsCard from './ArtifactsCard';

const Home = () => {
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [limitData, setLimitData] = useState({ from: 1, to: 10 });
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `http://localhost:5000/api/products/?from=${limitData.from}&to=${limitData.to}`
      )
      .then((res) => {
        setData(res.data.data);
        setIsloading(false);
      });
  }, [limitData.from, limitData.to]);

  function changeData(pageNo) {
    setLimitData({ from: pageNo * 10 - 9, to: pageNo * 10 });
  }

  return isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
      {Object.keys(data).map((item, i) => (
        <div key={i}>
          <ArtifactsCard data={data[item]} />
        </div>
      ))}
      <Pagination
        count={17}
        page={page}
        color="secondary"
        siblingCount={1}
        variant="outlined"
        onChange={(event, value) => {
          setPage(value);
          changeData(value);
        }}
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  );
};

export default Home;
