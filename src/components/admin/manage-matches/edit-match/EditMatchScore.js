import React from 'react';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Input } from '../../../common/forms';

const EditMatchScore = ({formConfig, handleChange}) =>
    <>
        <h3>Final score</h3>
        <Grid container alignItems='flex-end'>
            <Grid item xs={1}>
                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.homeScore.htmlData}
                    required={formConfig.homeScore.validations.required}
                    error={formConfig.homeScore.validations.errors && formConfig.homeScore.validations.errors.length}
                    InputLabelProps={{ shrink: true }}
                    className='score' />
            </Grid>
            <Grid item xs={1}>
                <Input onChange={(evt) => handleChange(evt)}
                    {...formConfig.awayScore.htmlData}
                    required={formConfig.awayScore.validations.required}
                    error={formConfig.awayScore.validations.errors && formConfig.awayScore.validations.errors.length}
                    InputLabelProps={{ shrink: true }}
                    className='score' />
            </Grid>

            <Grid item xs={10}>
                <FormControlLabel
                        control={
                            <Checkbox
                                onChange={e => handleChange(e)}
                                {...formConfig.so.htmlData}
                                color="primary"
                                value="so" />
                        }
                        label={formConfig.so.htmlData.label}
                        />
            </Grid>
        </Grid>
    </>
;

export default EditMatchScore;