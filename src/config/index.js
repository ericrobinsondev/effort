import { merge } from 'lodash';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 5000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
};

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    /* eslint-disable-next-line */
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    /* eslint-disable-next-line */
    envConfig = require('./testing').config;
    break;
  default:
    /* eslint-disable-next-line */
    envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
