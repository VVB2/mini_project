import React from 'react';
import ArtifactsCard from './ArtifactsCard';
import * as artifacts from '../../assets/Data.json';

const Home = () => {
  console.log(artifacts.length);
  return (
    <div>
      {Object.keys(artifacts).map((item, i) => (
        <div key={i}>
          <ArtifactsCard data={artifacts[item]} />
        </div>
      ))}
    </div>
  );
};

export default Home;
