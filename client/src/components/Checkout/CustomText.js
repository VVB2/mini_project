import React from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomText = ({ name, label, error = false, helperText = '' }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={<TextField variant="outlined" error={error} />}
        name={name}
        control={control}
        label={label}
        fullWidth
        required
      />
      {error && (
        <Typography
          variant="subtitle2"
          color="error"
          display="block"
          align="left"
        >
          {helperText}
        </Typography>
      )}
    </Grid>
  );
};

export default CustomText;
