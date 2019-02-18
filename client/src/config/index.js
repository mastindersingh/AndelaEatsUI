
const allConfig = {

  development: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com',
    API_BASE_URL: 'https://private-b7e73-andelaeats.apiary-mock.com/api/v1/',
    BASE_URL: 'http://andelaeats-dev.andela.com:3000',
    SENTRY_URL: 'https://5a60f1efc4f8482eade3cbcfd0ab77dc@sentry.io/1234924',
    ANDELAEATS_API_BASE_URL: 'https://andelaeats.herokuapp.com/api/v1'
  },

  production: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com',
    API_BASE_URL: 'https://andelaeats-staging-test.andela.com/api/v1',
    BASE_URL: 'https://feed-staging.andela.com',
    SENTRY_URL: 'https://5a60f1efc4f8482eade3cbcfd0ab77dc@sentry.io/1234924',
    ANDELAEATS_API_BASE_URL: 'https://andelaeats.herokuapp.com/api/v1'
  },

  staging: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com',
    API_BASE_URL: 'https://private-b7e73-andelaeats.apiary-mock.com/api/v1/',
    BASE_URL: 'https://feed-staging.andela.com',
    SENTRY_URL: 'https://5a60f1efc4f8482eade3cbcfd0ab77dc@sentry.io/1234924',
    ANDELAEATS_API_BASE_URL: 'https://andelaeats.herokuapp.com/api/v1'
  },

  test: {
    ANDELA_API_BASE_URL: 'https://api.andela.com',
    API_BASE_URL: 'http://private-135e48-andelaeatsmockserver.apiary-mock.com',
    BASE_URL: 'http://andelaeats-dev.andela.com:3000',
    SENTRY_URL: 'https://5a60f1efc4f8482eade3cbcfd0ab77dc@sentry.io/1234924',
    ANDELAEATS_API_BASE_URL: 'https://andelaeats.herokuapp.com/api/v1'
  },

};

export const config = allConfig[process.env.NODE_ENV];
