import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export const FormInput = ({ control, name, label, rules, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: props.defaultValue || '',
  });

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={!!error}
      helperText={error?.message}
      fullWidth
      margin="normal"
    />
  );
};