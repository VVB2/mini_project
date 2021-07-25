import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@material-ui/core';

function ArtifactsCard({ data }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={data.coverImage}
          title={data.title}
          style={{ height: '100px', width: '100%' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.creditLine}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArtifactsCard;
