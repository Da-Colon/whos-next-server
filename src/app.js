import express from 'express';

import { storage } from './database';
import { encoding, logging, cors } from './middleware';
import { models } from './models';
import { errors } from './errors';
import { router } from './routers';

const app = async database => {
  const application = express();
  cors(application);
  encoding(application);
  logging(application);
  storage(application, database);
  await models(database);
  router(application);
  errors(application);
  return application;
}

export default app;
