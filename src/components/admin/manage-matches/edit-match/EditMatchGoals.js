import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Select } from '../../../common/forms';

import '../ManageMatches.css';

const EditMatchGoals = ({goalsFormConfig, allPlayers, handleChange}) => {

    const template = (cnt, goalFormConfig) => (
        <Grid container key={cnt}>
            <h4>Goal {cnt + 1}</h4>
            <Grid item xs={12}>
                <Select onChange={(evt) => handleChange('g', cnt, evt)}
                        type="select"
                        name={`goal-${cnt}`}
                        id={`goal-${cnt}`}
                        label="Goal"
                        value={goalFormConfig.g || ''}
                        required={true}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
            <Grid item xs={12}>
                <Select onChange={(evt) => handleChange('a1', cnt, evt)}
                        type="select"
                        name={`assist1-${cnt}`}
                        id={`assist1-${cnt}`}
                        label="Assist1"
                        value={goalFormConfig.a1 || ''}
                        required={false}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
            <Grid item xs={12}>
                <Select onChange={(evt) => handleChange('a2', cnt, evt)}
                        type="select"
                        name={`assist2-${cnt}`}
                        id={`assist2-${cnt}`}
                        label="Assist2"
                        value={goalFormConfig.a2 || ''}
                        required={false}
                        /*error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}*/
                        fullWidth
                        options={allPlayers} />
            </Grid>
        </Grid>
    );

    const buildGoalFields = () => {
        let result = [];

        for (let i=0; i<goalsFormConfig.length; i++) {
            result.push(template(i, goalsFormConfig[i]));
        }

        return result;
    };

    return (
        goalsFormConfig && goalsFormConfig.length ?
        <>
            <h3>Goals</h3>
            { buildGoalFields() }
        </> : null
    );

};

export default EditMatchGoals;