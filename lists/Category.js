const { Text, File, Checkbox } = require('@keystonejs/fields');
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
    },
    cover: {
        type: File,
        adapter: fileAdapter,
        isRequired: false,
    },
    isActive: {
      type: Checkbox,
      defaultValue: true,
    },
  },
};