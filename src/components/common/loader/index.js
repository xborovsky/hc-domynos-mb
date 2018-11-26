import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Loader.css';

const Loader = ({className, ...rest}) =>
    <CircularProgress className={classnames("loader", className)} {...rest} />
;

Loader.propTypes = {
    className : PropTypes.string
}

export default Loader;