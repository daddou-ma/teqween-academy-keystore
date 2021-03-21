const { Text, Password } = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
        type: Text,
        isRequired: true,
    },
    email: {
        type: Text,
        isRequired: true,
        isUnique: true,
    },
    password: {
        type: Password,
        isRequired: true,
    },
    bio: {
        type: Text,
        isMultiline: true,
    },
  },
};