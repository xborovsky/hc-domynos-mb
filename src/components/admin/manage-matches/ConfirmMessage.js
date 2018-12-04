import React from 'react';
import PropTypes from 'prop-types';

const ConfirmMessage = ({homeTeamName, awayTeamName, place, datetime}) =>
    <>
        <span>Do you really want to save the match?</span><br />
        <strong>{homeTeamName} - {awayTeamName}</strong><br />
        <span>{place} at {datetime}</span>
    </>
;

ConfirmMessage.propTypes = {
    homeTeamName : PropTypes.string.isRequired,
    awayTeamName : PropTypes.string.isRequired,
    place : PropTypes.string.isRequired,
    datetime : PropTypes.any.isRequired
};

export default ConfirmMessage;