import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ConfirmBox = ({display, message, handleConfirm, handleCancel}) =>
    <Dialog open={display} onClose={handleCancel}>
        <DialogTitle>Plase confirm your action</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Disagree
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
;

ConfirmBox.propTypes = {
    display : PropTypes.bool.isRequired,
    message: PropTypes.string,
    handleConfirm : PropTypes.func.isRequired,
    handleCancel : PropTypes.func.isRequired
};

export default ConfirmBox;