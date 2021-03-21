const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');

const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GoogleAuthStrategy } = require('@keystonejs/auth-passport');

const createAllLists = require('./lists');
const seedAll = require('./seeds');

const PROJECT_NAME = 'Teqween Academy';
const adapterConfig = { knexOptions: { connection: 'postgres://postgres:password@127.0.0.1/teqween_academy' }, dropDatabase: false };

const cookieSecret = 'Hahadifweurwheiru';

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret,
  onConnect: () => seedAll(keystone),
});

createAllLists(keystone);


const passwordStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'Student',
  config: {
    identityField: 'email',
    secretField: 'password',
  },
});


module.exports = {
  keystone,
  apps: [
    new GraphQLApp({
      authStrategy: passwordStrategy,
    }),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      // authStrategy: passwordStrategy,
    }),
    new StaticApp({
      path: '/files',
      src: 'uploads',
      fallback: 'index.html',
    }),
  ],
};
