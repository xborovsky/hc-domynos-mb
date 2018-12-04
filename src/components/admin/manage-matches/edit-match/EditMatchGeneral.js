import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Input } from '../../../common/forms';

const EditMatchGeneral = ({formConfig, handleChange, allTeams}) =>
    <>
        <h3>General match info</h3>
        <Grid container>
            <Grid item xs={12} md={6}>
                <h2>{formConfig.home.htmlData.value}</h2>
            </Grid>
            <Grid item xs={12} md={6}>
                <h2>{formConfig.away.htmlData.value}</h2>
            </Grid>

            <Grid item xs={12}>
                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.place.htmlData}
                    required={formConfig.place.validations.required}
                    error={formConfig.place.validations.errors && formConfig.place.validations.errors.length}
                    fullWidth
                    value={formConfig.place.htmlData.value} />

                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.datetime.htmlData}
                    required={formConfig.datetime.validations.required}
                    error={formConfig.datetime.validations.errors && formConfig.datetime.validations.errors.length}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formConfig.datetime.htmlData.value} />

            </Grid>
        </Grid>
    </>
;

export default EditMatchGeneral;