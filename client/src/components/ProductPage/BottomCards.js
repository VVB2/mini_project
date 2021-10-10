import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-multi-carousel/lib/styles.css';

const BottomCards = ({ title, data }) => (
  <div>
    <Card style={{ paddingTop: 24, marginBottom: 20 }}>
      <Typography variant="h5" style={{ paddingLeft: 20 }}>
        {title}
      </Typography>
      <Carousel
        slidesToSlide={2}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
          },
        }}
        draggable={false}
      >
        {Object.keys(data).map((item, i) => (
          <Link
            to={`/product/${data[item].title}`}
            style={{ textDecoration: 'none' }}
            key={i}
          >
            <Card
              style={{
                padding: '16px 16px 10px 16px',
                margin: '20px 15px',
                height: 320,
              }}
              raised
            >
              <LazyLoadImage
                src={data[item].coverImage}
                alt={data[item].title}
                width="250px"
                height="180px"
                effect="blur"
              />
              <Typography
                variant="body1"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {data[item].title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  backgroundColor: '#26a541',
                  padding: '2px',
                  borderRadius: 3,
                  width: 45,
                  fontWeight: 'bold',
                }}
              >
                {data[item].rating}.0{' '}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                  alt="star icon"
                />
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ marginBottom: 20 }}
              >
                ₹{new Intl.NumberFormat('en-IN').format(data[item].price)}
              </Typography>
            </Card>
          </Link>
        ))}
      </Carousel>
    </Card>
  </div>
);

export default BottomCards;
