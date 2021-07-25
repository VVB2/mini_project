import React from 'react';
import { Card, Grid } from '@material-ui/core';

function ArtifactsCard({ data }) {
  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img
            src={data.coverImage}
            alt={data.title}
            width="200px"
            height="200px"
          />
        </Grid>
        <Grid item xs={4}>
          {data.title} <br />
          {data.creditLine}
        </Grid>
      </Grid>
    </Card>
  );
}

export default ArtifactsCard;
