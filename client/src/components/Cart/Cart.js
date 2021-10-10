/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ user }) => {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post('http://localhost:5000/api/cart', {
          customerId: user._id,
        })
        .then((res) => setCartData(res.data.data));
      //   console.log(data);
    };
    fetchData();
  }, []);
  console.log(cartData);
  return (
    <div>
      {Object.keys(cartData).map((item, i) => (
        <div>{cartData[item].productName}</div>
      ))}
    </div>
  );
};

export default Cart;
