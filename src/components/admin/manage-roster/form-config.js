export const formConfig = {
    name : {
        htmlData : {
            label : 'Name',
            value : '',
            id : 'name',
            name : 'name'
        },
        invalid : false,
        validations : {
            required : true
        }
    },
    number : {
        htmlData : {
            label : 'Number',
            value : '',
            id : 'number',
            name : 'number',
            type : "number"
        },
        invalid : false,
        validations : {
            required : true,
            min : 1,
            max : 99
        }
    },
    position : {
        htmlData : {
            label : 'Position',
            value : '',
            id : 'position',
            name : 'position',
            type : "select"
        },
        invalid : false,
        validations : {
            required : true,
            oneOf : ['GK', "LD", "RD", "LW", "C", "RW"]
        },
        options : [
            {value : '', text : ''},
            {value :'GK', text : 'GK'},
            {value : "LD", text : 'LD'},
            {value : "RD", text : 'RD'},
            {value : "LW", text : 'LW'},
            {value : "C", text : "C"},
            {value : "RW", text : "RW"}
        ]
    }
};