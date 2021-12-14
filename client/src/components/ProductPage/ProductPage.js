import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './ProductPage.loading';
import TopCard from './TopCard';
import BottomCards from './BottomCards';

const ProductPage = ({ user }) => {
  const [product, setProduct] = useState([]);
  const images = [];
  const [similarProducts, setSimilarProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const title = window.location.href.substring(30);
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
      if (images.length < 5) images.push(product[0].additionalImages[i]);
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
      <TopCard images={images} data={product} user={user} />
      <BottomCards title="Similar Products" data={filteredSimilar} />
      <BottomCards
        title="You might be interested in"
        data={filteredSuggested}
      />
    </div>
  );
};

export default ProductPage;
