import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Input = ({ type = 'text', onChange, ...rest }) =>
    <TextField
        type={type}
        onChange={(evt) => onChange(evt)}
        {...rest} />
;

Input.propTypes = {
    type : PropTypes.string,
    onChange : PropTypes.func
};

export default Input;