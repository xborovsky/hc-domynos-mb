import { formConfig } from './form-config';

export const editFormConfig = {
    ...formConfig,
    homeScore : {
        htmlData : {
            value : 0,
            id : 'home_score',
            name : 'homeScore',
            type : 'number'
        },
        invalid : false,
        validations : {
            positive : true
        }
    },
    awayScore : {
        htmlData : {
            value : 0,
            id : 'away_score',
            name : 'awayScore',
            type : 'number'
        },
        invalid : false,
        validations : {
            positive : true
        }
    },
    so : {
        htmlData : {
            checked : false,
            label : 'Shootout win/loss',
            id : 'so',
            name : 'so',
            type : 'checkbox'
        }
    },
    goals : []
};