
export default function validateFields(formData = {}, fieldDataConfig = {}, validateSingleField = false) {
    //this.validateString = validateString
    let errors = [];
    //console.log('validation-->', fieldDataConfig.validate);
    console.log('Validate single-->', formData);
    //console.log('Required fields-->', allRequiredFields);
        Object.keys(formData).map((fieldKey) => {
            fieldDataConfig[fieldKey].validate.map((methodName) => {
                if(methodName.type === 'Text') {
                        const errorStatus = validateString(formData[fieldKey]);
                        console.log('Validate string status--->', errorStatus, errors);
                        if (!errorStatus) {
                            console.log('Validate string if--->', errorStatus);
                            //const message = (fieldDataConfig[field].label !== undefined) ? fieldDataConfig[field].label + ' should be alpha numeric values' : 'No special char allowed';
                            errors = { ...errors, [fieldKey]: methodName.message };
                        }
                    }

                    if(methodName.type === 'Required') {
                        const validateRequiredStatus = validateRequired(fieldKey, formData[fieldKey], fieldDataConfig);
                        console.log('Validate Required--->', validateRequiredStatus);
                        if (!validateRequiredStatus) {
                            //const message = (fieldDataConfig[field].label !== undefined) ? fieldDataConfig[field].label + ' is required' : 'Required field';
                            errors = { ...errors, [fieldKey]: methodName.message };
                        }
                    }
                
            });
        })
        return errors;
}


function validateString(value) {
    
    var regex = /^[a-zA-Z0-9\-\s]+$/;
    
    return regex.test(value);
}
function validateRequired(fieldkey, value, fieldDataConfig) {
    
    const allRequiredFields = getRequiredFields(fieldDataConfig);
    
    if (allRequiredFields.includes(fieldkey) === false && value === '') {
        return false
    }

    return true;
}


/* Function use to return only required fields from config */
function getRequiredFields(config) {
    const requiredFields = Object.keys(config).filter((item) => {
        console.log('item-->',config[item].validate);
        let obj = config[item].validate.find(o => o.type === 'Required');
        console.log("Objec-->", obj);
        return obj;
    })

    console.log(requiredFields);

    return requiredFields;

}