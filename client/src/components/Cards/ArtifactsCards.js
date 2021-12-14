import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ArtifactsCard from './ArtifactsCard';

const ArtifactsCards = ({ location }) => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(parseInt(location.search.substring(3), 10));
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  function changeData(pageNo) {
    setPage(pageNo);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchData = async () => {
      setIsloading(true);
      await axios
        .get(`http://localhost:5000/api/products/?page=${page}`)
        .then((res) => {
          setData(res.data.data);
          setIsloading(false);
        });
    };
    fetchData();
  }, [page, pathname]);

  return isloading ? (
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
        count={14}
        page={page}
        color="secondary"
        siblingCount={1}
        variant="outlined"
        onChange={(event, value) => {
          setPage(value);
          changeData(value);
        }}
        renderItem={(item) => (
          <PaginationItem
            type="start-ellipsis"
            component={Link}
            selected
            to={`/products?p=${item.page}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        )}
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

export default ArtifactsCards;
