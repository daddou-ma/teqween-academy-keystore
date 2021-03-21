const { Text, Integer, Checkbox, Relationship, Url } = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
        type: Text,
        isRequired: true,
    },
    videoUrl: {
        type: Url,
        isRequired: true,
    },
    description: {
        type: Text,
        isMultiline: true,
    },
    order: {
        type: Integer,
        isRequired: true,
    },
    preview: {
        type: Checkbox,
        defaultValue: false,
        isRequired: true,
    },
    course: {
        type: Relationship,
        ref: 'Course.lectures',
    },
  },
};