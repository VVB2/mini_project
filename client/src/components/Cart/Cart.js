/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import CartItem from './CartItem';

const Cart = ({ user }) => {
  const [cartData, setCartData] = useState([]);
  const [parentCheckbox, setParentCheckbox] = useState(true);
  const [childrenCheckbox, setChildrenCheckbox] = useState(parentCheckbox);
  const handleChangeParent = () => {
    setParentCheckbox(!parentCheckbox);
    setChildrenCheckbox(!parentCheckbox);
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post('http://localhost:5000/api/cart', {
          customerId: user._id,
        })
        .then((res) => setCartData(res.data.data));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Card style={{ padding: '20px 15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <Typography variant="h5">Shopping cart</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="deselect all"
                color="secondary"
                onChange={handleChangeParent}
                checked={parentCheckbox}
              />
            }
            label="Deselect All"
          />
        </div>
        <Divider />
        {Object.keys(cartData).map((item, i) => (
          <div key={i}>
            <CartItem data={cartData[item][0]} checked={parentCheckbox} />
            <Divider />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Cart;
