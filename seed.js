const { createItems } = require('@keystonejs/server-side-graphql-client');

createItems({
  keystone,
  listKey: 'Admin',
  items: [
    { data: { name: 'John Duck', email: 'john@duck.com', password: 'dolphins' } },
    { data: { name: 'Barry', email: 'bartduisters@bartduisters.com', password: 'dolphins' } },
  ],
});