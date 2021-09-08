import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, Divider, Button } from '@material-ui/core';
import { ShoppingCart, FlashOn } from '@material-ui/icons';
import { GlassMagnifier } from 'react-image-magnifiers';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './ProductPage.loading';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css';

const ProductPage = ({ location }) => {
  const [product, setProduct] = useState([]);
  const images = [];
  const [similarProducts, setSimilarProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const title = location.pathname.substring(9);
  const filteredSimilar = [];
  const filteredSuggested = [];

  useEffect(() => {
    const fetchData = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/products/productByName/${title}`)
        .then((res) => {
          setProduct(res.data.productDetails);
          setSimilarProducts(res.data.similarProducts);
          setSuggestedProducts(res.data.suggestedProducts);
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
  if (Object.keys(similarProducts).length !== 0) {
    for (const i in similarProducts) {
      if (similarProducts[i].title !== title)
        filteredSimilar.push(similarProducts[i]);
    }
  }
  if (Object.keys(suggestedProducts).length !== 0) {
    for (const i in suggestedProducts) {
      if (suggestedProducts[i].title !== title)
        filteredSuggested.push(suggestedProducts[i]);
    }
  }
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Grid container style={{ padding: 16 }} spacing={3}>
          <Grid item xs={5}>
            <Carousel
              slidesToSlide={1}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 1,
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
                  items: 1,
                },
              }}
              infinite
              autoPlay
              autoPlaySpeed={5000}
              showDots
            >
              {[...images].map((src, i) => (
                <GlassMagnifier
                  key={i}
                  imageSrc={src}
                  imageAlt="Product Images"
                  magnifierBorderColor="#dc5036e6"
                  magnifierSize="45%"
                  style={{
                    width: 416,
                    height: 416,
                    paddingLeft: 68,
                  }}
                />
              ))}
            </Carousel>
            <Grid container item xs={12} style={{ margin: '15px 0 0 50px' }}>
              <Grid item xs={5}>
                <Button
                  startIcon={<ShoppingCart />}
                  style={{
                    padding: '18px 8px',
                    width: 195,
                    height: 56,
                    backgroundColor: '#ff9f00',
                  }}
                >
                  add to cart
                </Button>
              </Grid>
              <Grid item xs={7}>
                <Button
                  startIcon={<FlashOn />}
                  style={{
                    padding: '18px 8px',
                    width: 195,
                    height: 56,
                    backgroundColor: '#fb641b',
                  }}
                >
                  buy now
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {Object.keys(product).map((item, i) => (
            <Grid item xs={7} key={i}>
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
                  borderRadius: 3,
                  width: 55,
                  fontWeight: 'bold',
                }}
              >
                {product[item].rating}.0{' '}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                  alt="star icon"
                  effect="blur"
                />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginBottom: 20 }}
              >
                ₹{new Intl.NumberFormat('en-IN').format(product[item].price)}
              </Typography>
              <Divider />
              <Typography variant="h6" gutterBottom style={{ padding: 15 }}>
                About the Product
              </Typography>
              <Divider />
              <Grid
                container
                item
                xs={12}
                spacing={3}
                style={{ marginTop: 10 }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="textSecondary"
                    style={{ fontWeight: 'bold' }}
                  >
                    Classification
                  </Typography>
                </Grid>
                {product[item].classification ? (
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      {product[item].classification}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      No data Available
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="textSecondary"
                    style={{ fontWeight: 'bold' }}
                  >
                    Country
                  </Typography>
                </Grid>
                {product[item].country ? (
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      {product[item].country}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      No data Available
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="textSecondary"
                    style={{ fontWeight: 'bold' }}
                  >
                    Accession Year
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {product[item].accessionYear}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="textSecondary"
                    style={{ fontWeight: 'bold' }}
                  >
                    Credit Line
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {product[item].creditLine}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="textSecondary"
                    style={{ fontWeight: 'bold' }}
                  >
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {product[item].desc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Card style={{ paddingTop: 24, marginBottom: 20 }}>
        <Typography variant="h5" style={{ paddingLeft: 20 }}>
          Similar products
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
          {Object.keys(filteredSimilar).map((item, i) => (
            <Link
              to={`/product/${filteredSimilar[item].title}`}
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
                  src={filteredSimilar[item].coverImage}
                  alt={filteredSimilar[item].title}
                  width="250px"
                  height="180px"
                  effect="blur"
                />
                <Typography variant="body1">
                  {filteredSimilar[item].title.replace(/(.{20})..+/, '$1…')}
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
                  {filteredSimilar[item].rating}.0{' '}
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
                  ₹
                  {new Intl.NumberFormat('en-IN').format(
                    filteredSimilar[item].price
                  )}
                </Typography>
              </Card>
            </Link>
          ))}
        </Carousel>
      </Card>
      <Card style={{ paddingTop: 24, marginBottom: 20 }}>
        <Typography variant="h5" style={{ paddingLeft: 20 }}>
          You might be interested in
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
          {Object.keys(filteredSuggested).map((item, i) => (
            <Link
              to={`/product/${filteredSuggested[item].title}`}
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
                  src={filteredSuggested[item].coverImage}
                  alt={filteredSuggested[item].title}
                  width="250px"
                  height="180px"
                  effect="blur"
                />
                <Typography variant="body1">
                  {filteredSuggested[item].title.replace(/(.{30})..+/, '$1…')}
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
                  {filteredSuggested[item].rating}.0{' '}
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
                  ₹
                  {new Intl.NumberFormat('en-IN').format(
                    filteredSuggested[item].price
                  )}
                </Typography>
              </Card>
            </Link>
          ))}
        </Carousel>
      </Card>
    </div>
  );
};

export default ProductPage;
