import express from 'express'
import * as morgan from 'morgan'
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
