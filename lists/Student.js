const { Text, Password, File, Relationship, Checkbox } = require('@keystonejs/fields');
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
    phone: {
        type: Text,
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
    cart: {
        type: Relationship,
        ref: 'Course',
        many: true,
    },
    orders: {
        type: Relationship,
        ref: 'Order.student',
        many: true,
    },
    courses: {
        type: Relationship,
        ref: 'Course.students',
        many: true,
    },
    isActive: {
        type: Checkbox,
        defaultValue: true,
    },
  },
};