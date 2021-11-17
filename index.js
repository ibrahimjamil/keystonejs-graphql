const dotenv = require('dotenv').config()
const { Keystone } = require('@keystonejs/keystone')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose')
const { StaticApp } = require('@keystonejs/app-static');

const PROJECT_NAME = 'Keystonejs'
const adapterConfig = {
  mongoUri: process.env.MONGO_URI,
}

const PostSchema = require('./lists/Post')
const UserSchema = require('./lists/User')

const isLoggedIn = ({ authentication: { item: user } }) => {
  return !!user
}

const isAdmin = ({ authentication: { item: user } }) => {
  return !!user && !!user.isAdmin
}

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
})

keystone.createList('Post', {
  fields: PostSchema.fields,
  access: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
})

keystone.createList('User', {
  fields: UserSchema.fields,
  access: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
})
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password',
  },
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      isAccessAllowed: true,
    }),
    new StaticApp({
      src: 'post/uploads',
      path: '/post/uploads',
      fallback: 'index.html',
    })
  ],
}
