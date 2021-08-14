import React, { useState } from 'react';
import { Pagination } from '@material-ui/lab';
import Loading from '../Loading/Loading';
import ArtifactsCard from './ArtifactsCard';

const Home = ({ data, isLoading, childPaginate }) => {
  const [page, setPage] = useState(1);

  function changeData(pageNo) {
    childPaginate({ gte: pageNo * 10 - 9, lte: pageNo * 10 });
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
