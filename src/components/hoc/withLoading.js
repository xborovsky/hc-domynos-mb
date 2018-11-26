import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/loader';

export const withLoading = WrappedComponent => (props) =>
        props.showLoading ?
            <Loader /> :
            <WrappedComponent {...props} />
;

withLoading.propTypes = {
    showLoading : PropTypes.bool.isRequired
};