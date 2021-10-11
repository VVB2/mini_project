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
  let totalPrice = 0;
  const [parentCheckbox, setParentCheckbox] = useState(true);
  const [childrenCheckbox, setChildrenCheckbox] = useState(parentCheckbox);
  const handleChangeParent = () => {
    setParentCheckbox(!parentCheckbox);
    setChildrenCheckbox(!parentCheckbox);
  };
  for (const key in cartData) {
    totalPrice += cartData[key][0].price;
  }
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
          <Typography
            variant="subtitle2"
            align="right"
            display="block"
            style={{ fontWeight: 'bold', marginRight: '10px' }}
          >
            Price (in ₹)
          </Typography>
        </div>
        <Divider />
        {Object.keys(cartData).map((item, i) => (
          <div key={i}>
            <CartItem
              data={cartData[item][0]}
              checked={parentCheckbox}
              user={user}
            />
            <Divider />
          </div>
        ))}
        <Typography
          variant="body1"
          align="right"
          display="block"
          style={{ color: '#e57373', fontWeight: 'bold', marginTop: '10px' }}
        >
          <span>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>
              Subtotal ({cartData.length}{' '}
              {cartData.length > 1 ? 'items' : 'item'}
              ):
            </span>
            ₹ {new Intl.NumberFormat('en-IN').format(totalPrice)}
          </span>
        </Typography>
      </Card>
    </div>
  );
};

export default Cart;
