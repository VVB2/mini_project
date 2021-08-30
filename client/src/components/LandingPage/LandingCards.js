import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  image: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
    width: '100%',
    height: '250px',
    transition: 'transform .2s',
  },
}));

const LandingCards = ({ data, price }) => {
  const classes = useStyles();
  return (
    <Link
      to={`/department?dept=${data.department}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        style={{
          marginBottom: '20px',
          padding: '15px',
        }}
      >
        <img src={data.coverImage} alt={data.title} className={classes.image} />
        <Typography
          color="textPrimary"
          variant="subtitle2"
          gutterBottom
          align="center"
        >
          {data.department}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          From ₹{`${new Intl.NumberFormat('en-IN').format(price)}`}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          Shop Now!
        </Typography>
      </Card>
    </Link>
  );
};

export default LandingCards;
