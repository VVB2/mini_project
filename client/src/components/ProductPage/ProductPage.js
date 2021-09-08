import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, Divider, Button } from '@material-ui/core';
import { ShoppingCart, FlashOn } from '@material-ui/icons';
import { GlassMagnifier } from 'react-image-magnifiers';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css';

const ProductPage = ({ location }) => {
  const [product, setProduct] = useState([]);
  const images = [];
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const title = location.pathname.substring(9);
  let filteredSimilarProducts = [];

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/products/productByName/${title}`)
        .then((res) => {
          setProduct(res.data.productDetails);
          setSimilarProducts(res.data.similarProducts);
          setIsLoading(false);
          filteredSimilarProducts = similarProducts.filter(
            (el) => el.title !== title
          );
        });
    };
    fetchData();
  }, [title]);
  if (Object.keys(product).length !== 0) {
    for (const i in product[0].additionalImages) {
      images.push(product[0].additionalImages[i]);
    }
  }
  console.log(similarProducts);

  return isLoading ? (
    <div>Loading</div>
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
          {Object.keys(filteredSimilarProducts).map((item, i) => (
            <Link
              to={`/product/${filteredSimilarProducts[item].title}`}
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
                <img
                  src={filteredSimilarProducts[item].coverImage}
                  alt={filteredSimilarProducts[item].title}
                  width="250px"
                  height="180px"
                />
                <Typography variant="body1">
                  {filteredSimilarProducts[item].title.replace(
                    /(.{50})..+/,
                    '$1…'
                  )}
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
                  {filteredSimilarProducts[item].rating}.0{' '}
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
                    filteredSimilarProducts[item].price
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
