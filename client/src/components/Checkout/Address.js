/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';
import CustomText from './CustomText';

const Address = ({ next }) => {
  const [selectedState, setSelectedState] = useState('');
  const [addressType, setAddressType] = useState('');
  const methods = useForm();
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
    <div>
      <Typography variant="h5">Select a delivery address</Typography>
      <Typography variant="subtitle2">
        Is the address you&apos;d like to use displayed below? If so, click the
        corresponding &quot;Deliver to this address&quot; button. Or you can
        enter a new delivery address.{' '}
      </Typography>
      <Divider /> <div>&quot;Deliver to this address&quot;</div>
      <Divider />
      <br />
      <Divider />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);
            next({ ...data, selectedState, addressType });
          })}
        >
          <Grid container spacing={3}>
            <CustomText label="Full Name" name="fullName" />
            <CustomText label="Mobile Number" name="mobileNumber" />
            <CustomText label="Pincode" name="pincode" />
            <CustomText label="Flat, House no, Building" name="address1" />
            <CustomText label="Area, Street, Village" name="address2" />
            <CustomText label="Landmark" name="landmark" />
            <CustomText label="Town / City" name="town" />
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="choose_state">State</InputLabel>
                <Select
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
              <Typography variant="h6">Add delivery instructions</Typography>
              <Typography variant="subtitle2">
                Preferences are used to plan your delivery. However, shipments
                can sometimes arrive early or later than planned.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="address_type">Address Type</InputLabel>
                <Select
                  label="Address Type"
                  inputProps={{
                    name: 'choose state',
                    id: 'address_type',
                  }}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <MenuItem value="Home">Home (7 AM - 9 PM delivery)</MenuItem>
                  <MenuItem value="Office/Commerical">
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
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Address;
