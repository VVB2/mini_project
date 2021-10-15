import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomText = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={<TextField variant="outlined" />}
        name={name}
        control={control}
        label={label}
        fullWidth
        required
      />
    </Grid>
  );
};

export default CustomText;
