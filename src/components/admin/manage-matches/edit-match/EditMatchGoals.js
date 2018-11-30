import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Select } from '../../../common/forms';

import '../ManageMatches.css';

const EditMatchGoals = ({formConfig, allPlayers}) => {

    const template = cnt => (
        <Grid container key={cnt}>
            <h4>Goal {cnt}</h4>
            <Grid item xs={12}>
                <Select //onChange={(evt) => handleChange(evt)}
                        type="select"
                        name={`goal-${cnt}`}
                        id={`goal-${cnt}`}
                        label="Goal"
                        value=''
                        required={true}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
            <Grid item xs={12}>
                <Select //onChange={(evt) => handleChange(evt)}
                        type="select"
                        name={`assist1-${cnt}`}
                        id={`assist1-${cnt}`}
                        label="Assist1"
                        value=''
                        required={false}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
            <Grid item xs={12}>
                <Select //onChange={(evt) => handleChange(evt)}
                        type="select"
                        name={`assist2-${cnt}`}
                        id={`assist2-${cnt}`}
                        label="Assist2"
                        value=''
                        required={false}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
        </Grid>
    );

    const buildGoalFields = () => {
        let result = [];
        for (let i=0; i<formConfig.homeScore.htmlData.value; i++) {
            result.push(template(i + 1));
        }
        return result;
    };

    return (
        formConfig.homeScore.htmlData.value ?
        <>
            <h3>Goals</h3>
            { buildGoalFields() }
        </> : null
    );

};

export default EditMatchGoals;