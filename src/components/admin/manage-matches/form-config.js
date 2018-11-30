export const formConfig = {
    home : {
        htmlData : {
            label : 'Home team',
            value : '',
            id : 'home_team',
            name : 'home',
            type : 'select'
        },
        invalid : false,
        validations : {
            required : true
        },
        options : []
    },
    away : {
        htmlData : {
            label : 'Away team',
            value : '',
            id : 'away_team',
            name : 'away',
            type : 'select'
        },
        invalid : false,
        validations : {
            required : true
        },
        options : []
    },
    datetime : {
        htmlData : {
            label : 'Date & time',
            value : '',
            id : 'datetime',
            name : 'datetime',
            type : 'datetime-local'
        },
        invalid : false,
        validations : {
            required : true
        }
    },
    place : {
        htmlData : {
            label : 'Place',
            value : '',
            id : 'place',
            name : 'place'
        },
        invalid : false,
        validations : {
            required : true
        }
    }
}