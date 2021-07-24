import React from 'react';
import ArtifactsCard from './ArtifactsCard';
import * as artifacts from '../../assets/testData.json';

const Home = () => (
  <div>
    {Object.keys(artifacts).map((item, i) => (
      <div key={i}>
        <ArtifactsCard data={artifacts[item]} />
      </div>
    ))}
  </div>
);

export default Home;
