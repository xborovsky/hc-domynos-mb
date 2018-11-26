import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Select = ({ onChange, options, ...rest }) =>
    <TextField
        onChange={(evt) => onChange(evt)}
        select
        {...rest}
        SelectProps={{native: true}}>
            {
                options.map(option =>
                    <option value={option.value}
                            key={option.value}>
                        {option.text}
                    </option>
                )
            }
    </TextField>
;

Select.propTypes = {
    onChange : PropTypes.func,
    options : PropTypes.arrayOf(
        PropTypes.shape({
            value : PropTypes.string,
            text : PropTypes.string
        })
    ).isRequired
};

export default Select;