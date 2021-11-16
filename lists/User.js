const { Text, Password, Checkbox } = require('@keystonejs/fields')

const userFields = {
    fields : {
        name:{
            type: Text,
            isRequired: true
        },
        email:{
            type: Text,
            isMultiline: true,
            isUnique: true
        },
        password:{
            type: Password,
            isRequired: false
        },
        isAdmin:{
            type: Checkbox,
            isRequired: false
        }
    }
}

module.exports = userFields