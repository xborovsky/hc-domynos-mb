import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon  from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import './Alert.css';

const Alert = ({type, message, onClose}) => {

    const getIcon = () => {
        switch(type) {
            case 'info': return <InfoIcon className="alert-icon" />;
            case 'warning': return <WarningIcon className="alert-icon" />;
            case 'success': return <CheckCircleIcon className="alert-icon" />;
            default: return <ErrorIcon className="alert-icon" />;
        }
    };

    return (
        <SnackbarContent
            aria-describedby="client-snackbar"
            className={`alert-wrapper ${type}`}
            message={
                <span id="client-snackbar" className="alert">
                    { getIcon() }
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
};

Alert.propTypes = {
    type : PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    message : PropTypes.string.isRequired,
    onClose : PropTypes.func.isRequired
};

export default Alert;