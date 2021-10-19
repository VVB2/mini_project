/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import PhoneNumber from 'awesome-phonenumber';
import axios from 'axios';
import CustomText from './CustomText';
import SavedAddress from './SavedAddress';

const Address = ({ next, cartInfo }) => {
  console.log(cartInfo.username);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [addressType, setAddressType] = useState('');
  const [checked, setChecked] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState({
    error: false,
    text: '',
  });
  const [isValidPincode, setIsValidPincode] = useState({
    error: false,
    text: '',
  });
  let userInfo = '';
  let preloadedValues = [];
  if (sessionStorage.getItem('userInfo')) {
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    preloadedValues = {
      fullName: userInfo.fullName,
      address1: userInfo.address1,
      address2: userInfo.address2,
      landmark: userInfo.landmark,
      mobileNumber: userInfo.mobileNumber,
      pincode: userInfo.pincode,
      town: userInfo.town,
      selectedState: userInfo.selectedState,
      addressType: userInfo.addressType,
    };
  }
  const methods = useForm({
    defaultValues: preloadedValues,
    reValidateMode: 'onChange',
  });
  const handleSubmitForm = async (data) => {
    setLoading(true);
    const validatePincode = await axios.get(
      `https://api.postalpincode.in/pincode/${data.pincode}`
    );
    if (!PhoneNumber(String(data.mobileNumber), 'IN').isValid()) {
      setIsValidPhoneNumber({
        error: true,
        text: 'Please enter a valid Mobile number',
      });
      setLoading(false);
    } else
      setIsValidPhoneNumber({
        error: false,
        text: '',
      });
    if (validatePincode.data[0].Status !== 'Success') {
      setIsValidPincode({
        error: true,
        text: 'Please enter a valid Pincode',
      });
      setLoading(false);
    } else
      setIsValidPincode({
        error: false,
        text: '',
      });
    if (!isValidPhoneNumber.error && !isValidPincode.error) {
      if (checked) {
        axios
          .post('http://localhost:5000/api/userPurchaseInfo/create', {
            shipping: {
              address1: data.address1,
              address2: data.address2,
              landmark: data.landmark,
              town: data.town,
              pincode: data.pincode,
            },
            customer: {
              fullName: data.fullName,
              mobileNumber: data.mobileNumber,
            },
            customerId: cartInfo.username,
          })
          .then((res) => console.log(res.data.userPurchaseInfo));
      }
      sessionStorage.setItem(
        'userInfo',
        JSON.stringify({
          address1: data.address1,
          address2: data.address2,
          fullName: data.fullName,
          landmark: data.landmark,
          mobileNumber: data.mobileNumber,
          pincode: data.pincode,
          town: data.town,
          selectedState,
          addressType,
        })
      );

      setLoading(false);
      next({ ...data, selectedState, addressType });
    }
  };
  const addToForm = (data) => {
    sessionStorage.setItem(
      'userInfo',
      JSON.stringify({
        fullName: data[0].customer.fullName,
        address1: data[0].shipping.address1,
        address2: data[0].shipping.address2,
        landmark: data[0].shipping.landmark,
        mobileNumber: data[0].customer.mobileNumber,
        pincode: data[0].shipping.pincode,
        town: data[0].shipping.town,
        selectedState,
        addressType,
      })
    );
    console.log(preloadedValues);
    window.history.go(0);
  };
  const state = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  return (
    <div style={{ padding: '20px' }}>
      <SavedAddress customerId={cartInfo.username} addToForm={addToForm} />
      <br />
      <Typography variant="h6" gutterBottom>
        Enter a new delivery address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
          <Grid container spacing={3}>
            <CustomText label="Full Name" name="fullName" />
            <CustomText
              label="Mobile Number"
              name="mobileNumber"
              error={isValidPhoneNumber.error}
              helperText={isValidPhoneNumber.text}
            />
            <CustomText
              label="Pincode"
              name="pincode"
              error={isValidPincode.error}
              helperText={isValidPincode.text}
            />
            <CustomText label="Flat, House no, Building" name="address1" />
            <CustomText label="Area, Street, Village" name="address2" />
            <CustomText label="Landmark" name="landmark" />
            <CustomText label="Town / City" name="town" />
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="choose_state">State</InputLabel>
                <Select
                  labelId="choose_state_select_label"
                  required
                  label="State"
                  inputProps={{
                    name: 'choose state',
                    id: 'choose_state',
                  }}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {state.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="gilad"
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="Save fields for further purchase!"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Add delivery instructions</Typography>
              <Typography variant="subtitle2">
                Preferences are used to plan your delivery. However, shipments
                can sometimes arrive early or later than planned.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="address_type">Address Type</InputLabel>
                <Select
                  required
                  label="Address Type"
                  inputProps={{
                    name: 'choose address type',
                    id: 'address_type',
                  }}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <MenuItem value="Home">Home (7 AM - 9 PM delivery)</MenuItem>
                  <MenuItem value="Office/Commercial">
                    Office / Commerical (10 AM - 6 PM delivery)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              component={Link}
              to="/cart"
              variant="contained"
              color="secondary"
            >
              Back To Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {loading && (
                <CircularProgress
                  size={24}
                  color="secondary"
                  style={{ margin: '0 5px 0 -5px' }}
                />
              )}
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Address;
