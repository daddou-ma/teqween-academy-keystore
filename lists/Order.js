const { Text, Integer, Select, File, Relationship } = require('@keystonejs/fields');
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { getItem } = require('@keystonejs/server-side-graphql-client');

const fileAdapter = new LocalFileAdapter({
    src: 'uploads',
    path: '/files',
});

module.exports = (keystone) => ({
  fields: {
    note: {
        type: Text,
    },
    proof: {
        type: File,
        adapter: fileAdapter,
    },
    total: {
        type: Integer,
        defaultValue: 0,
    },
    student: {
      type: AuthedRelationship,
      ref: 'Student.orders',
    },
    courses: {
      type: Relationship,
      ref: 'Course.orders',
      many: true,
    },
    status: {
      type: Select,
      options: [
        { value: 'PENDING', label: "Pending" },
        { value: 'CONFIRMED', label: "Confirmed" },
        { value: 'PAID', label: 'Paid' },
        { value: 'DELIVERED', label: 'Delivered' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELED', label: 'Canceled' },
      ],
      defaultValue: 'PENDING',
      hooks: {
        afterChange: async ({ operation, updatedItem, context }) => {
          if (operation === 'update') {
            const { id, status } = updatedItem;

            const { data: { order: { courses, student} } } = await keystone.executeGraphQL({
              query: `query ($orderId: ID!){
                order: Order(where: { id: $orderId }) {
                  id
                  student {
                    id
                  }
                  courses {
                    id
                  }
                }
              }`,
              variables: { orderId: id },
            });

            if (status === 'COMPLETED') {
              await keystone.executeGraphQL({
                query: `mutation($id: ID!, $courses: [CourseWhereUniqueInput]) {
                  updateStudent(id: $id, data: { courses: { connect: $courses } }) {
                    id
                  }
                }`,
                variables: { id: student.id, courses },
                context,
              });
            } else {
              await keystone.executeGraphQL({
                query: `mutation($id: ID!, $courses: [CourseWhereUniqueInput]) {
                  updateStudent(id: $id, data: { courses: { disconnect: $courses } }) {
                    id
                  }
                }`,
                variables: { id: student.id, courses },
                context,
              });
            }
          }
        }
      }
    }
  },
  access: true,
  hooks: {
    afterChange: async ({ operation, context }) => {
      if (operation === 'create') {
        const { data, errors } = await keystone.executeGraphQL({
          query: `mutation {
            updateAuthenticatedStudent(data: { cart: { disconnectAll: true } }) {
              id
            }
          }`,
          variables: {},
          context,
        });
      }
    },
  }
});