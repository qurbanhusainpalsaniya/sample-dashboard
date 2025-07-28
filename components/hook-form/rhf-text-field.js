import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    value={field.value}
                    onChange={(event) => {
                        if (type === "number" && event.target.value) {
                            field.onChange(parseFloat(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    onWheel={(event) => type === "number" && event.target.blur()}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}

RHFTextField.propTypes = {
    helperText: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
};
