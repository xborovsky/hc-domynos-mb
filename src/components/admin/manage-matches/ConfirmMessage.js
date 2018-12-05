import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ConfirmMessage = ({formConfig, allPlayers}) => {
    const getPlayerName = id => {
        return allPlayers.find(player => player.value === id).text;
    };

    return (
        <>
            <span>Do you really want to save the match with the provided settings?</span><br />
            <br />
            <strong>{formConfig.home.htmlData.value} : {formConfig.away.htmlData.value}</strong><br />
            {formConfig.homeScore.htmlData.value} : {formConfig.awayScore.htmlData.value} {formConfig.so.htmlData.checked ? '(OT)' : ''}<br />
            <span>{formConfig.place.htmlData.value} at {formConfig.datetime.htmlData.value}</span><br />
            <br />
            { formConfig.goals && formConfig.goals.length &&
                formConfig.goals.map((entry, cnt) =>
                    <Fragment key={cnt}>
                        <span>{cnt+1}. {getPlayerName(entry.g)}{entry.a1 ? `, ${getPlayerName(entry.a1)}` : ''}{entry.a2 ? `, ${getPlayerName(entry.a2)}` : ''}</span><br />
                    </Fragment>
                )
            }
        </>
    );
}
;

ConfirmMessage.propTypes = {
    formConfig : PropTypes.object.isRequired // TODO
};

export default ConfirmMessage;