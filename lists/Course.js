const { Text, Integer, File, Checkbox, Relationship } = require('@keystonejs/fields');
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
    description: {
      type: Text,
      isRequired: true,
      isMultiline: true,
    },
    cover: {
      type: File,
      adapter: fileAdapter,
      isRequired: false,
    },
    price: {
      type: Integer,
      isRequired: true,
    },
    lectures: {
      type: Relationship,
      ref: 'Lecture.course',
      many: true,
    },
    teacher: {
      type: Relationship,
      ref: 'Teacher.courses',
      isRequired: true,
    },
    students: {
      type: Relationship,
      ref: 'Student.courses',
      many: true,
    },
    orders: {
      type: Relationship,
      ref: 'Order.courses',
      many: true,
    },
    isActive: {
      type: Checkbox,
      defaultValue: true,
    },
  },
};