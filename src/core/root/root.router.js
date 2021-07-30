import { Router } from 'express';
import { getRoot } from './root.controller';

export const root = app => {
  const router = Router();

  router.get('/', getRoot(app));

  return router;
}
