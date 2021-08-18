import React, { useState } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ArtifactsCard from './ArtifactsCard';

const Home = ({ data, isLoading, childPaginate }) => {
  const [page, setPage] = useState(1);

  function changeData(pageNo) {
    childPaginate(pageNo);
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
            to={`/${item.page}`}
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

export default Home;
