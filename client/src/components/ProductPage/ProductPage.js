import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GlassMagnifier } from 'react-image-magnifiers';
import { Slide } from 'react-slideshow-image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css';

const useStyles = makeStyles(() => ({
  leftGrid: {},
  rightGrid: {},
}));

const ProductPage = ({ location }) => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const images = [];
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const title = location.pathname.substring(9);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/products/productByName/${title}`)
        .then((res) => {
          setProduct(res.data.productDetails);
          setSimilarProducts(res.data.similarProducts);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [title]);
  if (Object.keys(product).length !== 0) {
    for (const i in product[0].additionalImages) {
      images.push(product[0].additionalImages[i]);
    }
  }

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <Card>
        <Grid container style={{ padding: 16 }}>
          <Grid item xs={6} className={classes.leftGrid}>
            <Slide
              indicators
              transitionDuration={100}
              style={{
                width: 512,
                margin: '0 0 15px 15px',
                padding: '15px 15px',
              }}
            >
              {[...images].map((src, i) => (
                <GlassMagnifier
                  key={i}
                  imageSrc={src}
                  imageAlt="Product Images"
                  magnifierBorderColor="#dc5036e6"
                  magnifierSize="30%"
                />
              ))}
            </Slide>
          </Grid>
          {Object.keys(product).map((item, i) => (
            <Grid item xs={6} key={i}>
              <Typography variant="button" gutterBottom color="textSecondary">
                {product[item].department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product[item].title}
              </Typography>
              <Typography
                variant="caption"
                gutterBottom
                style={{ color: '#26a541' }}
              >
                Special Price
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  backgroundColor: '#26a541',
                  padding: '2px 7px',
                  borderRadius: 14,
                  width: 55,
                  fontWeight: 'bold',
                }}
              >
                {product[item].rating}.0{' '}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                  alt="star icon"
                />
              </Typography>
              <Typography variant="h6" gutterBottom>
                ₹{new Intl.NumberFormat('en-IN').format(product[item].price)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default ProductPage;
