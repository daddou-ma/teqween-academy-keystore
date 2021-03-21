const { Text, Password, Relationship, File, Checkbox } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');


const fileAdapter = new LocalFileAdapter({
    src: 'uploads',
    path: '/files',
});

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
        photo: {
            type: File,
            adapter: fileAdapter,
        },
        courses: {
            type: Relationship,
            ref: 'Course.teacher',
            many: true,
        },
        isActive: {
            type: Checkbox,
            defaultValue: true,
        },
    },
};