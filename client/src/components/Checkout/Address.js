import React from 'react';
import {
  Typography,
  Grid,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';

const Address = () => {
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
      <br />
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Full Name"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Mobile Number"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              console.log(isValidPhoneNumber(e.target.value, 'IN'));
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Pincode"
            variant="outlined"
            size="small"
            fullWidth
            onChange={async (e) => {
              await axios
                .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
                .then((res) => console.log(res.data[0].Status));
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Flat, House no., Building, Company, Apartment"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Area, Street, Sector, Village"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="fullname"
            label="Landmark"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="fullname"
            label="Town/City"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="choose_state">State</InputLabel>
            <Select
              native
              label="State"
              inputProps={{
                name: 'choose state',
                id: 'choose_state',
              }}
            >
              <option aria-label="Choose a state" value="" />
              {state.map((item, key) => (
                <option value={item} key={key}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="defaultAddress" color="primary" />}
            label="Make this my default address"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Add delivery instructions</Typography>
          <Typography variant="subtitle2">
            Preferences are used to plan your delivery. However, shipments can
            sometimes arrive early or later than planned.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="address_type">Address Type</InputLabel>
            <Select
              native
              label="Address Type"
              inputProps={{
                name: 'choose state',
                id: 'address_type',
              }}
            >
              <option aria-label="Select an address type" value="" />
              <option value="Home (7 AM - 9 PM delivery)">
                Home (7 AM - 9 PM delivery)
              </option>
              <option value="Office/Commerical (10 AM - 6 PM delivery)">
                Office/Commerical (10 AM - 6 PM delivery)
              </option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default Address;
