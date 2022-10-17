import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    required,
    prefix,
    type,
    name,
    label,
    value,
    error = null,
    onChange,
  } = props;
  return (
    <TextField
      prefix={prefix}
      type={type}
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      {...(error && { error: true, helperText: error })}
    />
  );
}
