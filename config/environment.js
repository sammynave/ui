/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ui',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    DS: {
      host: 'http://localhost:4000',
      namespace: 'api'
    },
    'ember-simple-auth': {
      authenticationRoute: 'auth.login',
      routeIfAlreadyAuthenticated: 'app.index',
      routeAfterAuthentication: 'app.index'
    },
    flashMessageDefaults: {
     timeout: 3000,
     extendedTimeout: 375
    },
    fastboot: {
      hostWhitelist: ['floating-peak-86565.herokuapp.com', /^localhost:\d+$/]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.DS.ws = 'ws://localhost:4000/socket';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.DS.host = 'https://rocky-beach-94063.herokuapp.com'
    ENV.DS.ws = 'wss://rocky-beach-94063.herokuapp.com/socket';
    console.log(ENV.DS);
  }

  return ENV;
};
