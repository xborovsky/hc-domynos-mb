import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Input, Select } from '../../../common/forms';

const EditMatchGeneral = ({formConfig, handleChange, allTeams}) =>
    <>
    <h3>General match info</h3>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Select onChange={(evt) => handleChange(evt)}
                    {...formConfig.home.htmlData}
                    required={formConfig.home.validations.required}
                    error={formConfig.home.validations.errors && formConfig.home.validations.errors.length}
                    fullWidth
                    options={allTeams} />

            </Grid>
            <Grid item xs={12} md={6}>
                <Select onChange={(evt) => handleChange(evt)}
                    {...formConfig.away.htmlData}
                    required={formConfig.away.validations.required}
                    error={formConfig.away.validations.errors && formConfig.away.validations.errors.length}
                    fullWidth
                    options={allTeams} />

            </Grid>

            <Grid item xs={12}>
                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.place.htmlData}
                    required={formConfig.place.validations.required}
                    error={formConfig.place.validations.errors && formConfig.place.validations.errors.length}
                    fullWidth />

                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.datetime.htmlData}
                    required={formConfig.datetime.validations.required}
                    error={formConfig.datetime.validations.errors && formConfig.datetime.validations.errors.length}
                    fullWidth
                    InputLabelProps={{ shrink: true }} />

            </Grid>
        </Grid>
    </>
;

export default EditMatchGeneral;