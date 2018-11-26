import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './Button.css';

const Btn = ({className, children, onClick, ...other}) =>
    <Button variant="contained" className={className} onClick={() => onClick && onClick()} {...other}>
        { children }
    </Button>
;

Btn.propTypes = {
    className : PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onClick : PropTypes.func
};

export default Btn;