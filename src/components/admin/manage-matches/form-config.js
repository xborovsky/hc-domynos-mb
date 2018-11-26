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