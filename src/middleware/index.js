import express from 'express'
import {auth as authService } from '../core/auth/auth.services'
const morgan = require('morgan')
import doCors from 'cors'

export const logging = (app) => {
  const nodeEnv = process.env.NODE_ENV;

  const logLevel = nodeEnv === 'development' ? 'dev' : 'combined';
  const options = { skip: () => nodeEnv === 'test' };

  const logger = morgan(logLevel, options);
  app.use(logger);
};

export const encoding = (app) => {
  app.use(express.json())
}

export const cors = (app) => {
  app.use(doCors());
}

export const authenticate = (req, _, next) => {
  return authService(req.db, req.header("authorization"))
    .then(user => req.user = user)
    .then(() => next())
    .catch(() => console.log('Something when wrong'))
}
