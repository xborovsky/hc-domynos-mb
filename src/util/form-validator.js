export const validateFormField = (field) => {
    let errors = [];

    if (field.validations) {
        Object.keys(field.validations).forEach(validation => {
            const err = validate(field, validation);
            if (err) {
                errors.push(err);
            }
        });
    }

    return errors;
};

const validate = (field, validation) => {
    switch (validation) {
        case 'required' :
            return validateRequired(field);
        case 'min' :
            return validateMin(field, field.validations.min);
        case 'max' :
            return validateMax(field, field.validations.max);
        case 'oneOf' :
            return validateOneOf(field, field.validations.oneOf);
        case 'positive' :
            return validatePositive(field);
        default : throw new Error('Invalid validation rule!');
    }
};

const validateRequired = field => {
    return required(field.htmlData.value) ?
        null :
        (field.htmlData.label ? field.htmlData.label : field.htmlData.placeholder) + ' is required.';
};

const validateMin = (field, minVal) => {
    return min(field.htmlData.value, minVal) ?
        null :
        `${(field.htmlData.label ? field.htmlData.label : field.htmlData.placeholder)} must be at least ${minVal}.`;
};

const validateMax = (field, maxVal) => {
    return max(field.htmlData.value, maxVal) ?
        null :
        `${(field.htmlData.label ? field.htmlData.label : field.htmlData.placeholder)} must be at most ${maxVal}.`;
};

const validateOneOf = (field, arr) => {
    return oneOf(field.htmlData.value, arr) ?
        null :
        `${(field.htmlData.label ? field.htmlData.label : field.htmlData.placeholder)} must be one of "${arr.join(',')}".`;
};

const required = fieldValue => fieldValue && fieldValue.length;

const min = (fieldValue, min) => fieldValue && fieldValue >= min;

const max = (fieldValue, max) => fieldValue && fieldValue <= max;

const oneOf = (fieldValue, arr) => fieldValue && arr.indexOf(fieldValue) > -1;

const validatePositive = (fieldValue) => fieldValue > 0;