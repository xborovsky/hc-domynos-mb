import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Loader.css';


const Loader = () =>
    <CircularProgress className="loader" style={{color: '#182547'}} />
;

export default Loader;